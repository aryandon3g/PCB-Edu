
import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, X, Loader2, Volume2 } from 'lucide-react';
import { GoogleGenAI, LiveServerMessage, Modality, type Blob as GenAIBlob } from '@google/genai';

// Audio Utils based on documentation
const createBlob = (data: Float32Array): GenAIBlob => {
  const l = data.length;
  const int16 = new Int16Array(l);
  for (let i = 0; i < l; i++) {
    int16[i] = data[i] * 32768;
  }
  
  const bytes = new Uint8Array(int16.buffer);
  
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  const base64 = btoa(binary);

  return {
    data: base64,
    mimeType: 'audio/pcm;rate=16000',
  };
};

const downsampleTo16k = (buffer: Float32Array, inputRate: number): Float32Array => {
  if (inputRate === 16000) return buffer;
  const ratio = inputRate / 16000;
  const newLength = Math.round(buffer.length / ratio);
  const result = new Float32Array(newLength);
  let offsetResult = 0;
  let offsetBuffer = 0;
  
  while (offsetResult < result.length) {
      const nextOffsetBuffer = Math.round((offsetResult + 1) * ratio);
      let accum = 0, count = 0;
      for (let i = offsetBuffer; i < nextOffsetBuffer && i < buffer.length; i++) {
          accum += buffer[i];
          count++;
      }
      result[offsetResult] = count > 0 ? accum / count : 0;
      offsetResult++;
      offsetBuffer = nextOffsetBuffer;
  }
  return result;
};

const decodeAudioData = async (
  base64: string,
  ctx: AudioContext,
): Promise<AudioBuffer> => {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  
  const dataInt16 = new Int16Array(bytes.buffer);
  const sampleRate = 24000; // Model output rate
  const numChannels = 1;
  const frameCount = dataInt16.length;
  
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
  const channelData = buffer.getChannelData(0);
  
  for (let i = 0; i < frameCount; i++) {
    channelData[i] = dataInt16[i] / 32768.0;
  }
  return buffer;
};

const VoiceAssistant: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Audio Refs
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const sourceNodeRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const sessionRef = useRef<any>(null); // To hold the session object
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  const cleanupAudio = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    if (scriptProcessorRef.current) {
      scriptProcessorRef.current.disconnect();
      scriptProcessorRef.current = null;
    }
    if (sourceNodeRef.current) {
      sourceNodeRef.current.disconnect();
      sourceNodeRef.current = null;
    }
    if (inputAudioContextRef.current) {
      inputAudioContextRef.current.close();
      inputAudioContextRef.current = null;
    }
    if (outputAudioContextRef.current) {
      outputAudioContextRef.current.close();
      outputAudioContextRef.current = null;
    }
    // Stop playing sources
    sourcesRef.current.forEach(source => {
      try { source.stop(); } catch(e) {}
    });
    sourcesRef.current.clear();
    
    // Close session if exists
    sessionRef.current = null;
  };

  const startSession = async () => {
    if (!process.env.API_KEY) {
      setError("API Key Missing");
      return;
    }

    setIsConnecting(true);
    setError(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // 1. Get Mic Stream FIRST to know the sample rate
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;

      // 2. Try to determine stream sample rate
      let streamSampleRate = 0;
      const track = stream.getAudioTracks()[0];
      if (track) {
          const settings = track.getSettings();
          if (settings.sampleRate) {
              streamSampleRate = settings.sampleRate;
          }
      }

      // 3. Setup Input Audio Context
      // If we know the rate, try to use it to avoid NotSupportedError
      const inputOptions: AudioContextOptions = streamSampleRate ? { sampleRate: streamSampleRate } : {};
      
      try {
          inputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)(inputOptions);
      } catch (e) {
          console.warn("Failed to create AudioContext with specific rate, falling back to default", e);
          inputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }

      // 4. Setup Output Audio Context (Default rate is fine for playback)
      outputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      const outputNode = outputAudioContextRef.current.createGain();
      outputNode.connect(outputAudioContextRef.current.destination);

      nextStartTimeRef.current = 0;

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
          },
          systemInstruction: `
            You are a strict, aggressive, and short-tempered female science teacher named "Madam Khoj".
            You get annoyed easily when students ask simple or "stupid" questions.
            Respond with a sharp, scolding tone. Use phrases like "Listen carefully, I won't repeat myself!" or "Don't you know this basic concept?".
            However, after scolding, you MUST explain the scientific concept accurately and concisely.
            Keep your responses short (under 40 words) and spoken quickly.
            Do not write text, only speak.
          `,
        },
        callbacks: {
          onopen: () => {
            setIsConnecting(false);
            setIsActive(true);
            
            if (!inputAudioContextRef.current) return;
            
            // Important: Create source AFTER context is ready and stream is active
            const source = inputAudioContextRef.current.createMediaStreamSource(stream);
            sourceNodeRef.current = source;
            
            const processor = inputAudioContextRef.current.createScriptProcessor(4096, 1, 1);
            scriptProcessorRef.current = processor;

            processor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              
              // Downsample to 16000Hz before sending
              const downsampledData = downsampleTo16k(inputData, inputAudioContextRef.current!.sampleRate);
              
              const pcmBlob = createBlob(downsampledData);
              
              sessionPromise.then(session => {
                session.sendRealtimeInput({ media: pcmBlob });
              });
            };

            source.connect(processor);
            processor.connect(inputAudioContextRef.current.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            // Fix: Added optional chaining for parts array index access
            const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (base64Audio && outputAudioContextRef.current) {
              setIsSpeaking(true);
              const ctx = outputAudioContextRef.current;
              
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
              
              try {
                const audioBuffer = await decodeAudioData(base64Audio, ctx);
                const source = ctx.createBufferSource();
                source.buffer = audioBuffer;
                source.connect(outputNode);
                
                source.addEventListener('ended', () => {
                   sourcesRef.current.delete(source);
                   if (sourcesRef.current.size === 0) setIsSpeaking(false);
                });

                source.start(nextStartTimeRef.current);
                sourcesRef.current.add(source);
                nextStartTimeRef.current += audioBuffer.duration;
              } catch (e) {
                console.error("Audio Decode Error", e);
              }
            }
            
            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => s.stop());
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
              setIsSpeaking(false);
            }
          },
          onclose: () => {
            setIsActive(false);
            cleanupAudio();
          },
          onerror: (e) => {
            console.error(e);
            setError("Connection Error");
            setIsActive(false);
            cleanupAudio();
          }
        }
      });

      sessionPromise.then(sess => {
        sessionRef.current = sess;
      });

    } catch (err) {
      console.error(err);
      setError("Failed to start");
      setIsConnecting(false);
      cleanupAudio();
    }
  };

  const stopSession = () => {
    setIsActive(false);
    setIsConnecting(false);
    cleanupAudio();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {isActive || isConnecting ? (
        <div className="bg-indigo-900 text-white p-4 rounded-2xl shadow-2xl border border-indigo-700 w-64 animate-fade-in">
          <div className="flex justify-between items-center mb-4">
             <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${isConnecting ? 'bg-yellow-400 animate-pulse' : 'bg-green-400'}`}></div>
                <span className="font-bold text-sm">Madam Khoj (AI)</span>
             </div>
             <button onClick={stopSession} className="text-indigo-300 hover:text-white"><X size={18}/></button>
          </div>

          <div className="h-24 bg-indigo-950 rounded-xl flex items-center justify-center border border-indigo-800 relative overflow-hidden">
             {isConnecting ? (
                <div className="flex flex-col items-center gap-2 text-indigo-400">
                   <Loader2 size={24} className="animate-spin"/>
                   <span className="text-xs">Connecting...</span>
                </div>
             ) : (
                <>
                  <div className="flex items-center gap-1 h-full">
                     {[1,2,3,4,5].map(i => (
                        <div key={i} className={`w-2 bg-pink-500 rounded-full transition-all duration-100 ease-in-out ${isSpeaking ? 'animate-pulse h-12' : 'h-2'}`} style={{ animationDelay: `${i * 0.1}s`, height: isSpeaking ? `${Math.random() * 40 + 20}px` : '4px' }}></div>
                     ))}
                  </div>
                  <div className="absolute bottom-2 text-xs text-indigo-400 font-mono">
                     {isSpeaking ? "SCOLDING..." : "LISTENING..."}
                  </div>
                </>
             )}
          </div>
          
          <p className="text-xs text-indigo-300 mt-2 text-center italic">
             "Ask me anything, if you dare!"
          </p>
        </div>
      ) : (
        <button
          onClick={startSession}
          className="w-14 h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-xl flex items-center justify-center transition-all hover:scale-105 active:scale-95 group relative"
          title="Ask Madam Khoj"
        >
          <div className="absolute inset-0 bg-indigo-400 rounded-full animate-ping opacity-20 group-hover:opacity-40"></div>
          <Mic size={24} />
        </button>
      )}
      
      {error && (
        <div className="bg-red-500 text-white text-xs px-3 py-1 rounded-full shadow-lg animate-bounce">
           {error}
        </div>
      )}
    </div>
  );
};

export default VoiceAssistant;

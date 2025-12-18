
import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, X, Loader2, Volume2, AlertCircle } from 'lucide-react';
import { GoogleGenAI, LiveServerMessage, Modality, type Blob as GenAIBlob } from '@google/genai';

// Audio Utils
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
  return {
    data: btoa(binary),
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

const decodeAudioData = async (base64: string, ctx: AudioContext): Promise<AudioBuffer> => {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  const dataInt16 = new Int16Array(bytes.buffer);
  const buffer = ctx.createBuffer(1, dataInt16.length, 24000);
  const channelData = buffer.getChannelData(0);
  for (let i = 0; i < dataInt16.length; i++) {
    channelData[i] = dataInt16[i] / 32768.0;
  }
  return buffer;
};

const VoiceAssistant: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const sessionRef = useRef<any>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  const cleanupAudio = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    if (inputAudioContextRef.current) {
      inputAudioContextRef.current.close();
      inputAudioContextRef.current = null;
    }
    if (outputAudioContextRef.current) {
      outputAudioContextRef.current.close();
      outputAudioContextRef.current = null;
    }
    sourcesRef.current.forEach(source => {
      try { source.stop(); } catch(e) {}
    });
    sourcesRef.current.clear();
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
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;

      const track = stream.getAudioTracks()[0];
      const streamSampleRate = track?.getSettings()?.sampleRate || 44100;
      
      inputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: streamSampleRate });
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
          systemInstruction: 'You are Madam Khoj, a brilliant but short-tempered female science teacher. Scold the student if their question is basic, but then explain the concept with scientific accuracy. Stay under 30 words. Spoken only.',
        },
        callbacks: {
          onopen: () => {
            setIsConnecting(false);
            setIsActive(true);
            if (!inputAudioContextRef.current) return;
            const source = inputAudioContextRef.current.createMediaStreamSource(stream);
            const processor = inputAudioContextRef.current.createScriptProcessor(4096, 1, 1);
            processor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const downsampled = downsampleTo16k(inputData, inputAudioContextRef.current!.sampleRate);
              sessionPromise.then(session => {
                session.sendRealtimeInput({ media: createBlob(downsampled) });
              });
            };
            source.connect(processor);
            processor.connect(inputAudioContextRef.current.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            // FIX: Added extensive null guards to prevent Vercel build errors
            const modelTurn = message.serverContent?.modelTurn;
            const parts = modelTurn?.parts;
            
            if (parts && parts.length > 0 && parts[0].inlineData?.data && outputAudioContextRef.current) {
              const base64Audio = parts[0].inlineData.data;
              setIsSpeaking(true);
              const ctx = outputAudioContextRef.current;
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
              try {
                const audioBuffer = await decodeAudioData(base64Audio, ctx);
                const source = ctx.createBufferSource();
                source.buffer = audioBuffer;
                source.connect(outputNode);
                source.onended = () => {
                   sourcesRef.current.delete(source);
                   if (sourcesRef.current.size === 0) setIsSpeaking(false);
                };
                source.start(nextStartTimeRef.current);
                sourcesRef.current.add(source);
                nextStartTimeRef.current += audioBuffer.duration;
              } catch (e) { console.error(e); }
            }
            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => { try { s.stop(); } catch(e) {} });
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
              setIsSpeaking(false);
            }
          },
          onclose: () => { setIsActive(false); cleanupAudio(); },
          onerror: (e) => { setError("Connection Error"); setIsActive(false); cleanupAudio(); }
        }
      });
      sessionPromise.then(sess => { sessionRef.current = sess; });
    } catch (err) {
      setError("Mic Access Denied");
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
    <div className="fixed bottom-24 right-6 z-[60] flex flex-col items-end gap-3 pointer-events-none">
      {(isActive || isConnecting) && (
        <div className="bg-indigo-950 text-white p-5 rounded-3xl shadow-2xl border border-indigo-800 w-72 animate-bounce-in pointer-events-auto">
          <div className="flex justify-between items-center mb-4">
             <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${isConnecting ? 'bg-yellow-400 animate-pulse' : 'bg-green-400'}`}></div>
                <span className="font-black text-sm uppercase tracking-tight">Madam Khoj</span>
             </div>
             <button onClick={stopSession} className="p-1 hover:bg-white/10 rounded-full transition-colors"><X size={18}/></button>
          </div>

          <div className="h-28 bg-black/40 rounded-2xl flex items-center justify-center border border-white/5 relative overflow-hidden group">
             {isConnecting ? (
                <div className="flex flex-col items-center gap-2">
                   <Loader2 size={32} className="animate-spin text-indigo-400"/>
                   <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-300">Summoning Teacher...</span>
                </div>
             ) : (
                <>
                  <div className="flex items-end gap-1.5 h-12">
                     {[1,2,3,4,5,6,7].map(i => (
                        <div key={i} className={`w-1.5 bg-indigo-500 rounded-full transition-all duration-150 ${isSpeaking ? 'animate-pulse' : 'h-1.5 opacity-30'}`} style={{ height: isSpeaking ? `${20 + Math.random() * 40}px` : '6px', animationDelay: `${i * 0.1}s` }}></div>
                     ))}
                  </div>
                  <div className="absolute bottom-3 text-[9px] font-black text-indigo-400 uppercase tracking-widest bg-black/50 px-2 py-0.5 rounded-full">
                     {isSpeaking ? "Scolding in progress..." : "Listening for excuses..."}
                  </div>
                </>
             )}
          </div>
        </div>
      )}
      
      <button
        onClick={isActive ? stopSession : startSession}
        disabled={isConnecting}
        className={`w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 group relative pointer-events-auto ${isActive ? 'bg-rose-600 text-white' : 'bg-indigo-600 text-white'}`}
      >
        <div className={`absolute inset-0 rounded-full animate-ping opacity-20 pointer-events-none ${isActive ? 'bg-rose-400' : 'bg-indigo-400'}`}></div>
        {isConnecting ? <Loader2 size={28} className="animate-spin" /> : isActive ? <MicOff size={28} /> : <Mic size={28} />}
      </button>
      
      {error && (
        <div className="bg-red-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full shadow-lg flex items-center gap-2 pointer-events-auto uppercase tracking-wider">
           <AlertCircle size={14}/> {error}
        </div>
      )}
    </div>
  );
};

export default VoiceAssistant;

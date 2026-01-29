
import React, { useState, useRef } from 'react';
import { 
  Sparkles, 
  Image as ImageIcon, 
  Video, 
  Mic, 
  Send, 
  FileSearch, 
  Zap, 
  BrainCircuit,
  Loader2,
  Trash2,
  Download,
  AlertTriangle
} from 'lucide-react';
import { 
  getAIResponse, 
  getThinkingResponse, 
  generateImage, 
  editImage, 
  generateVideoFromImage,
  speakText,
  analyzeImage
} from '../../services/geminiService';

// Fix: Custom decode function for base64 string
function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

// Fix: Audio decoding logic for raw PCM data from Gemini TTS
async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

const AIInnovationLab: React.FC = () => {
  const [activeMode, setActiveMode] = useState<'chat' | 'thinking' | 'image' | 'video' | 'tts'>('chat');
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{ type: string, content: any }[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageSize, setImageSize] = useState<'1K' | '2K' | '4K'>('1K');
  const [apiKeySelected, setApiKeySelected] = useState<boolean | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleOpenKeySelector = async () => {
    // @ts-ignore
    await window.aistudio.openSelectKey();
    setApiKeySelected(true);
  };

  const playAudio = async (base64Audio: string) => {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    const audioBuffer = await decodeAudioData(
      decode(base64Audio),
      ctx,
      24000,
      1
    );
    const source = ctx.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(ctx.destination);
    source.start();
  };

  const handleSend = async () => {
    if (!input.trim() && !selectedImage) return;

    // Fix: Requirement for Gemini 3 Pro and Veo models to have a selected API key
    if (activeMode === 'image' || activeMode === 'video') {
      // @ts-ignore
      const hasKey = await window.aistudio.hasSelectedApiKey();
      if (!hasKey) {
        setApiKeySelected(false);
        return;
      }
    }

    setLoading(true);
    try {
      let response: any;
      switch (activeMode) {
        case 'chat':
          response = await getAIResponse(input);
          setResults([{ type: 'text', content: response.text }, ...results]);
          break;
        case 'thinking':
          response = await getThinkingResponse(input);
          setResults([{ type: 'text', content: response }, ...results]);
          break;
        case 'image':
          if (selectedImage && input) {
            const edited = await editImage(selectedImage, input);
            if (edited) setResults([{ type: 'image', content: edited }, ...results]);
          } else {
            const generated = await generateImage(input, imageSize);
            if (generated) setResults([{ type: 'image', content: generated }, ...results]);
          }
          break;
        case 'video':
          if (selectedImage) {
            const videoUrl = await generateVideoFromImage(selectedImage, input);
            setResults([{ type: 'video', content: videoUrl }, ...results]);
          }
          break;
        case 'tts':
          const audioBase64 = await speakText(input);
          if (audioBase64) {
            setResults([{ type: 'audio', content: audioBase64 }, ...results]);
            playAudio(audioBase64);
          }
          break;
      }
      setInput('');
    } catch (err: any) {
      console.error(err);
      // Fix: Handle key selection reset if entity not found
      if (err?.message?.includes("Requested entity was not found")) {
        setApiKeySelected(false);
      }
    } finally {
      setLoading(false);
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setSelectedImage(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 h-[calc(100vh-14rem)]">
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col space-y-2">
        <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
          <BrainCircuit size={18} className="text-blue-600" />
          Neural Engine
        </h3>
        {[
          { id: 'chat', icon: <Sparkles size={18} />, label: "Smart Assistant", desc: "Fast & precise" },
          { id: 'thinking', icon: <Zap size={18} />, label: "Deep Reasoning", desc: "Complex problems" },
          { id: 'image', icon: <ImageIcon size={18} />, label: "Visual Gen/Edit", desc: "Gemini 3 Pro Image" },
          { id: 'video', icon: <Video size={18} />, label: "Veo Motion", desc: "Animate snapshots" },
          { id: 'tts', icon: <Mic size={18} />, label: "Neural Speech", desc: "Crystal clear audio" }
        ].map((mode) => (
          <button
            key={mode.id}
            onClick={() => setActiveMode(mode.id as any)}
            className={`flex items-center space-x-3 p-4 rounded-2xl transition-all ${
              activeMode === mode.id 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <div className={activeMode === mode.id ? 'text-white' : 'text-blue-500'}>
              {mode.icon}
            </div>
            <div className="text-left">
              <p className="text-sm font-bold">{mode.label}</p>
              <p className={`text-[10px] ${activeMode === mode.id ? 'text-blue-100' : 'text-slate-400'}`}>
                {mode.desc}
              </p>
            </div>
          </button>
        ))}
      </div>

      <div className="lg:col-span-3 flex flex-col h-full space-y-6">
        <div className="flex-1 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm overflow-y-auto space-y-6">
          {apiKeySelected === false && (activeMode === 'image' || activeMode === 'video') && (
            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6 text-center animate-in fade-in slide-in-from-top-4">
              <AlertTriangle className="mx-auto text-orange-500 mb-2" size={32} />
              <h4 className="font-bold text-orange-800">Advanced API Key Required</h4>
              <p className="text-sm text-orange-700 mt-2 mb-4">
                Veo and Gemini 3 Pro Image models require a paid API key with billing enabled.
              </p>
              <button 
                onClick={handleOpenKeySelector}
                className="bg-orange-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-orange-700 transition-all shadow-lg"
              >
                Select Paid API Key
              </button>
              <p className="text-[10px] text-orange-500 mt-3">
                See <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noreferrer" className="underline font-bold">Billing Docs</a>
              </p>
            </div>
          )}

          {results.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
              <Sparkles size={48} className="text-slate-200 mb-4" />
              <p className="text-slate-500 font-medium">Start a new BioMed innovation cycle</p>
              <p className="text-xs text-slate-400 max-w-xs mt-2">
                Ask about MRI physics, compare cardiac sensors, or generate medical illustrations.
              </p>
            </div>
          ) : (
            results.map((res, i) => (
              <div key={i} className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                {res.type === 'text' && (
                  <div className="bg-slate-50 p-6 rounded-2xl text-slate-700 whitespace-pre-wrap text-sm leading-relaxed border border-slate-100">
                    {res.content}
                  </div>
                )}
                {res.type === 'image' && (
                  <div className="group relative rounded-2xl overflow-hidden shadow-xl border-4 border-white max-w-lg">
                    <img src={res.content} alt="Generated" className="w-full h-auto" />
                    <button className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      <Download size={16} />
                    </button>
                  </div>
                )}
                {res.type === 'video' && (
                  <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-white max-w-lg">
                    <video src={res.content} controls className="w-full h-auto" />
                  </div>
                )}
                {res.type === 'audio' && (
                  <div className="flex items-center justify-between space-x-4 bg-blue-50 p-4 rounded-2xl border border-blue-100 max-w-md">
                    <div className="flex items-center space-x-3">
                      <Mic className="text-blue-600" />
                      <span className="text-xs font-bold text-blue-700 uppercase">Neural Voice Output</span>
                    </div>
                    <button 
                      onClick={() => playAudio(res.content)}
                      className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-all"
                    >
                      Replay
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
          {loading && (
            <div className="flex items-center space-x-2 text-blue-600 font-medium">
              <Loader2 className="animate-spin" />
              <span>BioMed AI is processing...</span>
            </div>
          )}
        </div>

        <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-lg space-y-4">
          <div className="flex items-center space-x-4">
            {(activeMode === 'image' || activeMode === 'video') && (
              <div className="relative">
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={onFileChange} 
                  className="hidden" 
                  accept="image/*" 
                />
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className={`p-3 rounded-2xl border-2 border-dashed transition-all ${
                    selectedImage ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-blue-300'
                  }`}
                >
                  {selectedImage ? (
                    <div className="relative group">
                      <img src={selectedImage} className="w-12 h-12 rounded object-cover" />
                      <div 
                        onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 size={10} />
                      </div>
                    </div>
                  ) : (
                    <ImageIcon size={24} className="text-slate-400" />
                  )}
                </button>
              </div>
            )}
            
            <div className="flex-1 relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  activeMode === 'chat' ? "Ask anything about BioMed..." :
                  activeMode === 'thinking' ? "Explain complex medical logic..." :
                  activeMode === 'image' ? "Describe an image to generate or edit..." :
                  "Enter prompt..."
                }
                rows={1}
                className="w-full px-6 py-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
              />
              <button 
                onClick={handleSend}
                disabled={loading}
                className="absolute right-3 top-2.5 p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all disabled:opacity-50 shadow-lg shadow-blue-200"
              >
                <Send size={20} />
              </button>
            </div>
          </div>

          {activeMode === 'image' && (
            <div className="flex items-center space-x-6 px-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Resolution</span>
              <div className="flex bg-slate-100 p-1 rounded-xl">
                {(['1K', '2K', '4K'] as const).map(size => (
                  <button
                    key={size}
                    onClick={() => setImageSize(size)}
                    className={`px-4 py-1 text-xs font-bold rounded-lg transition-all ${
                      imageSize === size ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIInnovationLab;

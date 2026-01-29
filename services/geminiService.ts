
import { GoogleGenAI, Type, Modality } from "@google/genai";

// Fix: Initializing GoogleGenAI exactly as per guidelines
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAIResponse = async (prompt: string, model: string = 'gemini-3-flash-preview') => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model,
    contents: prompt,
  });
  return {
    text: response.text,
    grounding: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
  };
};

export const getThinkingResponse = async (prompt: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: prompt,
    config: {
      thinkingConfig: { thinkingBudget: 32768 }
    },
  });
  return response.text;
};

export const generateImage = async (prompt: string, size: "1K" | "2K" | "4K" = "1K") => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-image-preview',
    contents: { parts: [{ text: prompt }] },
    config: {
      imageConfig: { aspectRatio: "1:1", imageSize: size }
    },
  });
  
  // Fix: Safe access to response parts using optional chaining
  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  return null;
};

export const editImage = async (base64Image: string, prompt: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        { inlineData: { data: base64Image.split(',')[1], mimeType: 'image/png' } },
        { text: prompt }
      ]
    }
  });
  // Fix: Safe access to response parts using optional chaining
  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  return null;
};

export const generateVideoFromImage = async (base64Image: string, prompt: string, aspectRatio: '16:9' | '9:16' = '16:9') => {
  const ai = getAI();
  let operation = await ai.models.generateVideos({
    model: 'veo-3.1-fast-generate-preview',
    prompt,
    image: {
      imageBytes: base64Image.split(',')[1],
      mimeType: 'image/png',
    },
    config: {
      numberOfVideos: 1,
      resolution: '720p',
      aspectRatio
    }
  });

  while (!operation.done) {
    await new Promise(resolve => setTimeout(resolve, 10000));
    operation = await ai.operations.getVideosOperation({ operation: operation });
  }

  const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
  const res = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
  const blob = await res.blob();
  return URL.createObjectURL(blob);
};

export const speakText = async (text: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-preview-tts",
    contents: [{ parts: [{ text }] }],
    config: {
      responseModalities: [Modality.AUDIO],
      speechConfig: {
        voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
      },
    },
  });

  const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  if (!base64Audio) return null;

  return base64Audio;
};

export const searchWithGrounding = async (query: string, type: 'web' | 'maps' = 'web', location?: { lat: number, lng: number }) => {
  const ai = getAI();
  const config: any = {
    tools: type === 'web' ? [{ googleSearch: {} }] : [{ googleMaps: {} }],
  };

  if (type === 'maps' && location) {
    config.toolConfig = {
      retrievalConfig: {
        latLng: {
          latitude: location.lat,
          longitude: location.lng
        }
      }
    };
  }

  const response = await ai.models.generateContent({
    model: type === 'web' ? 'gemini-3-flash-preview' : 'gemini-2.5-flash',
    contents: query,
    config,
  });

  return {
    text: response.text,
    grounding: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
  };
};

export const analyzeImage = async (base64Image: string, prompt: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: {
      parts: [
        { inlineData: { data: base64Image.split(',')[1], mimeType: 'image/png' } },
        { text: prompt }
      ]
    }
  });
  return response.text;
};

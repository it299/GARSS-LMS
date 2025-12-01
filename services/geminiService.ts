import { GoogleGenAI } from "@google/genai";

// Initialize Gemini
// Note: In a real production app, you should proxy this through a backend to protect the key.
// For this frontend-only demo, we assume the environment variable is available.
const apiKey = process.env.API_KEY || ''; 
const ai = new GoogleGenAI({ apiKey });

const MODEL_NAME = 'gemini-2.5-flash';

const SYSTEM_INSTRUCTION = `
أنت "غرس"، مرشد تعليمي ذكي وودود للأطفال في منصة "غرس" التعليمية.
- تحدث باللغة العربية بأسلوب بسيط، مشجع، ومرح.
- جمهورك أطفال تتراوح أعمارهم بين 6 إلى 12 سنة.
- استخدم الرموز التعبيرية (الإيموجي) 🌟🍎🚀 لتجعل الحديث ممتعاً.
- هدفك هو مساعدة الطفل على فهم الدروس، الإجابة على أسئلته بفضول، وتشجيعه على التعلم.
- إذا سألك الطفل عن شيء لا يناسب عمره، وجهه بلطف لموضوع آخر مفيد.
- أنت تعرف أن المنصة مرتبطة بنظام "Totar LMS"، يمكنك ذكر ذلك إذا سأل عن درجاته (قل له أنك تستطيع رؤية تقدمه الرائع).
`;

export const GeminiService = {
  sendMessage: async (message: string, history: { role: 'user' | 'model', text: string }[]) => {
    if (!apiKey) {
        return "عذراً يا بطل، يبدو أن مفتاح الذكاء الاصطناعي غير موجود. تأكد من إعدادات النظام.";
    }

    try {
      // Convert history to Gemini format
      // Note: @google/genai generic usage for chat
      const chat = ai.chats.create({
        model: MODEL_NAME,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        },
        history: history.map(h => ({
          role: h.role,
          parts: [{ text: h.text }]
        }))
      });

      const result = await chat.sendMessage({ message });
      return result.text;
    } catch (error) {
      console.error("Gemini Error:", error);
      return "أعتذر يا صديقي، حدث خطأ تقني بسيط. هل يمكنك إعادة السؤال؟ 🤖🔧";
    }
  }
};
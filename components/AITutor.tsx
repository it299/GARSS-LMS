import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, User } from '../types';
import { GeminiService } from '../services/geminiService';
import { Send, Bot, Loader2, Sparkles } from 'lucide-react';

interface AITutorProps {
  user: User | null;
}

const AITutor: React.FC<AITutorProps> = ({ user }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: user 
        ? `أهلاً بك يا ${user.name}! 🌟 أنا "غرس"، رفيقك الذكي. هل لديك سؤال عن دروسك اليوم؟` 
        : 'مرحباً! أنا "غرس". سجل الدخول لنتحدث عن دروسك، أو اسألني أي سؤال عام الآن! 🚀',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    // Prepare history for API context
    const history = messages.map(m => ({ role: m.role, text: m.text }));

    const responseText = await GeminiService.sendMessage(userMsg.text, history);

    const botMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText || "عذراً، لم أستطع الرد حالياً.",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMsg]);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-3xl border-2 border-playful-blue overflow-hidden shadow-2xl mx-auto max-w-4xl">
      {/* Header */}
      <div className="bg-playful-blue p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-white p-2 rounded-full shadow-md">
            <Bot size={24} className="text-playful-blue" />
          </div>
          <div>
            <h2 className="font-bold text-white text-lg font-heading">المرشد الذكي "غرس"</h2>
            <p className="text-blue-100 text-xs">مدعوم بالذكاء الاصطناعي</p>
          </div>
        </div>
        <Sparkles className="text-white/50 animate-pulse" />
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-start' : 'justify-end'}`}
          >
            <div
              className={`max-w-[80%] p-4 rounded-2xl shadow-sm text-lg leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-white border border-gray-200 rounded-br-none text-gray-800'
                  : 'bg-playful-blue text-white rounded-bl-none'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-end">
            <div className="bg-playful-blue/10 p-3 rounded-2xl rounded-bl-none">
              <Loader2 className="animate-spin text-playful-blue" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-100">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="اكتب سؤالك هنا..."
            className="flex-1 bg-gray-100 border-0 rounded-xl px-4 py-3 focus:ring-2 focus:ring-playful-blue focus:bg-white transition-all text-gray-700 font-medium"
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="bg-playful-blue hover:bg-blue-600 text-white p-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={24} />
          </button>
        </div>
        <p className="text-center text-xs text-gray-400 mt-2">
          يمكن أن يرتكب الذكاء الاصطناعي أخطاء، لذا تأكد من المعلومات الهامة.
        </p>
      </div>
    </div>
  );
};

export default AITutor;
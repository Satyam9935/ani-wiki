import React, { useState, useRef, useEffect } from 'react';
import { Send, MessageCircle, X, Loader2, Sparkles } from 'lucide-react';
import { GoogleGenerativeAI } from "@google/generative-ai";

const CharacterChat = ({ character }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const API_KEY = "AIzaSyA5idmAO5LvW_KIX40uUJTlN7pSpic7L04"; 

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // 1. Initialize AI
      const genAI = new GoogleGenerativeAI(API_KEY);
      
      // 2. Define the Model (Using the newest Flash model)
      const modelName = "gemini-1.5-flash";
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });
      
      
      console.log(`🚀 Attempting to connect to: ${modelName}`);

      // 3. Generate Content
      const prompt = `You are roleplaying as ${character.name}. Bio: ${character.about?.slice(0, 300)}. User: ${input}`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      setMessages(prev => [...prev, { role: 'bot', text: text }]);
    } catch (error) {
      console.error("❌ CHAT ERROR:", error);
      // Show the actual error message in the chat bubble
      setMessages(prev => [...prev, { role: 'bot', text: `Error: ${error.message}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-10 right-10 z-[9999] p-4 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-2xl hover:scale-110 transition-transform flex items-center gap-2 border-2 border-white/20"
      >
        {isOpen ? <X /> : <MessageCircle />}
        <span className="font-bold ml-2">Chat</span>
      </button>

      {isOpen && (
        <div className="fixed bottom-28 right-10 z-[9999] w-80 h-[450px] bg-neutral-900 border border-white/20 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          <div className="p-3 bg-purple-900/50 flex items-center gap-3 border-b border-white/10">
            <h3 className="font-bold text-white ml-2">{character.name}</h3>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar bg-black/50">
             {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-2 rounded-xl text-xs ${msg.role === 'user' ? 'bg-purple-600 text-white' : 'bg-neutral-800 text-gray-200'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && <Loader2 className="w-4 h-4 animate-spin text-purple-500 m-2" />}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSend} className="p-2 bg-neutral-900 border-t border-white/10 flex gap-2">
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type..." className="flex-1 bg-black/50 border border-white/10 rounded-full px-3 py-1.5 text-xs text-white" />
            <button type="submit" className="p-1.5 bg-purple-600 rounded-full text-white"><Send className="w-3 h-3" /></button>
          </form>
        </div>
      )}
    </>
  );
};

export default CharacterChat;
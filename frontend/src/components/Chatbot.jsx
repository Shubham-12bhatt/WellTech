import { useState, useRef, useEffect } from 'react';
import { Bot, Paperclip, Send } from 'lucide-react';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm your wellness assistant. How can I help you today?", isUser: false }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const GEMINI_API_KEY = 'AIzaSyBRjJQAF95UxjxxEejUAGZ4TUZ3opRmOjA';
  const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { id: Date.now(), text: input, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch(GEMINI_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: input }] }] }),
      });

      if (!response.ok) throw new Error('API Error');

      const data = await response.json();
      const botResponse = data.candidates[0].content.parts[0].text;
      
      setMessages(prev => [...prev, { id: Date.now(), text: botResponse, isUser: false }]);
    } catch (error) {
      setMessages(prev => [...prev, { id: Date.now(), text: 'Sorry, something went wrong. Please try again.', isUser: false }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-20 bg-white" id="chat-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#4CAF50] mb-4">Experience Our AI Assistant</h2>
          <p className="text-lg text-gray-600">Try a preview of our conversational wellness guide.</p>
        </div>

        <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 flex flex-col h-[600px]">
          <div className="bg-[#4CAF50] p-6 text-white flex items-center gap-4 shadow-sm z-10">
            <div className="bg-white/20 p-3 rounded-full">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg">WellTech Assistant</h3>
              <p className="text-white/80 text-sm">Always online</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 bg-[#f9fbfc] space-y-6">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl px-6 py-4 shadow-sm ${
                  msg.isUser 
                    ? 'bg-[#4CAF50] text-white rounded-br-sm' 
                    : 'bg-white text-gray-800 border border-gray-100 rounded-bl-sm'
                }`}>
                  <p className="leading-relaxed">{msg.text}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm rounded-bl-sm flex space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 bg-white border-t border-gray-100">
            <form onSubmit={handleSend} className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about health, wellness, or products..."
                className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:bg-white transition-colors"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-[#4CAF50] text-white p-3 rounded-xl hover:bg-[#074032] transition-colors disabled:opacity-50 flex items-center justify-center shrink-0 w-12"
              >
                <Send size={20} className={input.trim() ? "translate-x-[2px] transition-transform" : ""} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Chatbot;

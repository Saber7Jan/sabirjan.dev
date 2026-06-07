// src/components/AIAssistant.tsx
import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { useState, useRef, useEffect } from "react";
import { Sparkles, X, Brain, Send } from "lucide-react";
import { cn } from "../lib/utils";

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    const userMsg = input;
    setInput("");
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    try {
      const history = messages.map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }]
      }));
      const contents = [...history, { role: 'user', parts: [{ text: userMsg }] }];

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ contents }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const responseText = data.text || "Connection handshake failed. Please retry.";
      setMessages(prev => [...prev, { role: 'ai', text: responseText }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'ai', text: "Systems offline. Contact Sabir via LinkedIn directly." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-black text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-accent hover:text-black transition-all z-[200] group border border-white/10"
      >
        <Sparkles className="w-7 h-7 group-hover:rotate-12 transition-transform" />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full animate-pulse" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 40, scale: 0.9, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 40, scale: 0.9, filter: "blur(10px)" }}
            className="fixed bottom-28 right-8 w-[90vw] md:w-[400px] h-[600px] bg-white border border-black shadow-[0_0_50px_rgba(0,0,0,0.2)] rounded-lg flex flex-col z-[200] overflow-hidden"
          >
            {/* Header */}
            <div className="p-5 border-b border-black flex items-center justify-between bg-black text-white">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                  <Brain className="w-5 h-5 text-black" />
                </div>
                <div>
                  <div className="font-display text-[10px] uppercase tracking-widest leading-none mb-1">Knowledge Engine</div>
                  <div className="text-[9px] font-mono text-accent/80 font-bold">V1.5 FLASH / ACTIVE</div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="hover:rotate-90 transition-transform p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 font-mono text-[12px] bg-[#fafafa]">
              <div className="text-black/30 border-b border-black/5 pb-2 uppercase tracking-tighter text-[10px]">Session Initialization Trace // {new Date().toLocaleTimeString()}</div>
              
              {messages.length === 0 && (
                 <div className="bg-white p-4 border border-black/10 shadow-sm rounded-sm italic text-black/60">
                   "Handshake complete. I can provide technical details on EmotiFi, DanReality, or Sabir's MS trajectory. What would you like to explore?"
                 </div>
              )}
              {messages.map((m, i) => (
                <div key={i} className={cn(
                  "flex flex-col max-w-[85%] gap-1",
                  m.role === 'user' ? "ml-auto items-end" : "mr-auto items-start"
                )}>
                  <div className={cn(
                    "p-4 rounded-sm leading-relaxed",
                    m.role === 'user' ? "bg-black text-white" : "bg-white border border-black text-black"
                  )}>
                    {m.text}
                  </div>
                  <div className="text-[8px] uppercase font-bold opacity-30 mt-1">
                    {m.role === 'user' ? "Human" : "Agent"} // 0{i + 1}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex items-center gap-2 text-accent font-bold animate-pulse">
                   <div className="w-1 h-1 bg-accent rounded-full" />
                   <div className="w-1 h-1 bg-accent rounded-full delay-75" />
                   <div className="w-1 h-1 bg-accent rounded-full delay-150" />
                   <span className="text-[10px] uppercase tracking-widest ml-1">Decoding...</span>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-black bg-white flex items-center gap-3">
              <input 
                autoFocus
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="PROMPT COMMAND //"
                className="flex-1 bg-transparent px-2 py-3 text-[12px] font-mono focus:outline-none placeholder:text-black/20"
              />
              <button 
                onClick={handleSend} 
                className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-accent hover:text-black transition-all disabled:opacity-50"
                disabled={!input.trim() || isTyping}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

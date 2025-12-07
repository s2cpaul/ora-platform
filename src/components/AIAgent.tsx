import { X, Send, Bot, Bell, Mic, MicOff } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { useState, useRef, useEffect } from "react";

interface AIAgentProps {
  onClose: () => void;
}

interface Message {
  id: string;
  text: string;
  sender: "user" | "agent";
  timestamp: Date;
}

export function AIAgent({ onClose }: AIAgentProps) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm ORA - your vendor-agnostic Applied AI Assistant. We curate current industry capabilities and promote unexpected collaboration for accelerating innovation. How can I help you today?",
      sender: "agent",
      timestamp: new Date(),
    },
  ]);
  const [email, setEmail] = useState("");
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = 'en-US';

        recognitionRef.current.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setMessage(transcript);
          setIsListening(false);
        };

        recognitionRef.current.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          setIsListening(false);
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    // Simulate agent response with fallback
    setTimeout(() => {
      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Hmm... That's an excellent question! Let me do some research and get back to you. You can sign up for notifications before you go. When I have expanded my knowledge, you'll be notified.",
        sender: "agent",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, agentMessage]);
    }, 1000);

    setMessage("");
  };

  const handleNotificationSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    
    // Add confirmation message
    const confirmMessage: Message = {
      id: Date.now().toString(),
      text: `Perfect! I've registered ${email} for notifications. You'll receive an update as soon as I have more information for you.`,
      sender: "agent",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, confirmMessage]);
    setEmail("");
  };

  const toggleSpeechRecognition = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in your browser. Please try Chrome or Safari on mobile.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  return (
    <div className="fixed top-[68px] right-0 w-full max-w-[440px] h-[90vh] max-h-[997px] z-50 px-4 sm:px-0">
      <Card className="h-full shadow-lg hover:shadow-xl transition-all duration-300 border-border bg-card overflow-hidden flex flex-col">
        {/* Video Avatar Section - Top 36.67% + 16px */}
        <div className="relative h-[calc(36.67%+16px)] bg-gray-900 border-b border-border overflow-hidden flex gap-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-2 right-[12px] bg-white text-black hover:bg-gray-100 z-10 opacity-30 hover:opacity-50"
          >
            <X className="h-5 w-5" strokeWidth={3} />
          </Button>

          {/* Video Container */}
          <div className="relative w-full bg-black flex items-center justify-center">
            {/* HeyGen Interactive Avatar */}
            <iframe
              src="https://app.heygen.com/embeds/7a4e401ed77d4dac94ba7d1d281c913e"
              allow="camera; microphone; clipboard-write; display-capture"
              allowFullScreen
              className="w-full h-[400px] min-h-[300px] sm:h-[400px]"
              style={{ border: 'none', display: 'block' }}
              title="HeyGen AI Avatar"
            />
          </div>
        </div>

        {/* Chat Section - Bottom 63.33% - 16px */}
        <div className="h-[calc(63.33%-16px)] flex flex-col">
          {/* Chat Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex gap-3 ${msg.sender === "user" ? "justify-end" : ""}`}>
                  {msg.sender === "agent" && (
                    <div className="w-8 h-8 rounded-full bg-purple-400 border border-white flex items-center justify-center flex-shrink-0">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                  )}
                  <div className={`rounded-lg p-3 max-w-[80%] ${
                    msg.sender === "user" 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-muted"
                  }`}>
                    <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                    
                    {/* Show notification signup after fallback response */}
                    {msg.sender === "agent" && msg.text.includes("sign up for notifications") && (
                      <div className="mt-3 pt-3 border-t border-border/50">
                        <div className="flex items-start gap-2 mb-2">
                          <Bell className="h-4 w-4 mt-0.5 text-primary" />
                          <p className="text-xs">
                            <strong>Enable Notifications:</strong>
                          </p>
                        </div>
                        <form onSubmit={handleNotificationSignup} className="space-y-2">
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full px-3 py-1.5 text-xs bg-background border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                            required
                          />
                          <Button
                            type="submit"
                            size="sm"
                            className="w-full h-7 text-xs"
                          >
                            Sign Up for Updates
                          </Button>
                        </form>
                      </div>
                    )}
                  </div>
                  {msg.sender === "user" && (
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <span className="text-sm text-primary-foreground">U</span>
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-border">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type or talk your message..."
                  className="w-full px-4 py-2 pr-12 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder:text-muted-foreground"
                />
                <Button
                  type="button"
                  size="icon"
                  onClick={toggleSpeechRecognition}
                  className={`absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 ${
                    isListening 
                      ? 'bg-red-500 hover:bg-red-600 text-white' 
                      : 'bg-transparent hover:bg-muted-foreground/10 text-muted-foreground'
                  }`}
                  title={isListening ? "Stop recording" : "Start voice input"}
                >
                  {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </Button>
              </div>
              <Button
                type="submit"
                size="icon"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Send className="h-5 w-5" />
              </Button>
            </form>
          </div>
        </div>
      </Card>
    </div>
  );
}
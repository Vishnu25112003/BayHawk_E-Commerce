import { useState } from "react"
import { MessageCircle, X, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface Message {
  text: string
  sender: "user" | "bot"
  timestamp: string
}

interface FloatingElementsProps {
  hasGiftCard?: boolean
}

export function FloatingElements({ hasGiftCard = false }: FloatingElementsProps) {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hi! How can we help you today?",
      sender: "bot",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ])
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (input.trim()) {
      const newMessage: Message = {
        text: input,
        sender: "user",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages((prev) => [...prev, newMessage])
      setInput("")

      // Simulate bot reply
      setTimeout(() => {
        const botReply: Message = {
          text: "Thanks for your message! Our team will get back to you shortly. For immediate assistance, please call us.",
          sender: "bot",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        }
        setMessages((prev) => [...prev, botReply])
      }, 1000)
    }
  }

  return (
    <>
      {/* Chatbot Window */}
      {isChatOpen && (
        <div className={cn(
          "fixed right-0 w-[90vw] max-w-[380px] h-[500px] bg-card rounded-l-lg shadow-2xl border border-border overflow-hidden flex flex-col z-50 animate-in slide-in-from-bottom-5 duration-300",
          hasGiftCard ? "bottom-24" : "bottom-6"
        )}>
          {/* Chat Header */}
          <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Chat with us</h3>
              <p className="text-xs text-primary-foreground/80">We typically reply in minutes</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
              onClick={() => setIsChatOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-secondary/30 space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-end gap-2",
                  msg.sender === "user" ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "p-3 rounded-lg max-w-[80%] shadow-sm",
                    msg.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-card border border-border"
                  )}
                >
                  <p className="text-sm">{msg.text}</p>
                  <span
                    className={cn(
                      "text-xs mt-1 block text-right",
                      msg.sender === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                    )}
                  >
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-border bg-background">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSend()
              }}
              className="flex gap-2"
            >
              <Input
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Chat Button - Only show when chat is closed */}
      {!isChatOpen && (
        <button
          data-onboarding="chatbot-button"
          className={cn(
            "fixed right-0 h-16 w-16 rounded-l-2xl shadow-xl z-50 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center justify-center group",
            hasGiftCard ? "bottom-24" : "bottom-6"
          )}
          onClick={() => setIsChatOpen(true)}
        >
          <MessageCircle className="h-7 w-7 text-white group-hover:scale-110 transition-transform" />
        </button>
      )}
    </>
  )
}

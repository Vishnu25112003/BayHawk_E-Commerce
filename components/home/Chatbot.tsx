import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  text: string
  sender: "user" | "bot"
  timestamp: string
}

export function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hi! How can we help you today?",
      sender: "bot",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" }),
    },
  ])
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (input.trim()) {
      const newMessage: Message = {
        text: input,
        sender: "user",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" }),
      }
      setMessages((prev) => [...prev, newMessage])
      setInput("")

      // Simulate bot reply
      setTimeout(() => {
        const botReply: Message = {
          text: "Thanks for your message! We'll get back to you shortly.",
          sender: "bot",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" }),
        }
        setMessages((prev) => [...prev, botReply])
      }, 1000)
    }
  }

  return (
    <div className="w-full h-full bg-card rounded-lg shadow-xl border border-border overflow-hidden flex flex-col">
      {/* Chat Header */}
      <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between">
        <div>
          <h3 className="font-semibold">Chat with us</h3>
          <p className="text-xs text-primary-foreground/80">We typically reply in minutes</p>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto bg-secondary/50 space-y-4">
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
                  : "bg-card"
              )}
            >
              <p className="text-sm">{msg.text}</p>
              <span
                className={cn(
                  "text-xs mt-1 block text-right",
                  msg.sender === "user"
                    ? "text-primary-foreground/70"
                    : "text-muted-foreground"
                )}
              >
                {msg.timestamp}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Chat Input */}
      <div className="p-4 border-t border-border">
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
  )
}

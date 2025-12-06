import { Chatbot } from "./Chatbot"
import { VideoPlayer } from "./VideoPlayer"

export function ChatAndVideo() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="md:order-2">
            <Chatbot />
          </div>
          <div className="md:order-1">
            <VideoPlayer />
          </div>
        </div>
      </div>
    </section>
  )
}

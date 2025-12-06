export function VideoPlayer() {
  return (
    <div className="w-full h-full rounded-lg overflow-hidden">
      <video
        src="/offers-video.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      >
        Your browser does not support the video tag.
      </video>
    </div>
  )
}

export function HeroSection() {
  return (
    <div className="h-screen bg-black w-full flex justify-center overflow-hidden">
      <video
        src="/Hero.mp4"
        autoPlay
        muted
        loop
      />
     
    </div>
  );
}
import { useRef } from "react";

export function HeroSection() {
    const audioRef = useRef(null);

  const handleMouseEnter = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // reset to start
    }
  };
  return (
    <div className="h-screen bg-black w-full flex justify-center overflow-hidden">
      <video
        src="/Hero.mp4"
        autoPlay
        muted
        loop
      />
      <div
        className="absolute bottom-48 left-1/2 transform -translate-x-1/2 flex flex-col justify-center items-center text-center h-44 w-44 rounded-full cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
      </div>

      {/* Hidden audio element */}
      <audio ref={audioRef} src="/a.mp3" preload="auto" />
    </div>
    
  );
}
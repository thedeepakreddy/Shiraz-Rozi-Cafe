import React, { useEffect } from 'react';
import { motion } from 'motion/react';

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    // We wait for 4.5 seconds or you can adjust this to match the exact video duration
    const timer = setTimeout(() => {
      onComplete();
    }, 9000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 z-[9999] bg-[#123626] flex flex-col items-center justify-center overflow-hidden"
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="absolute inset-0 w-full h-[100dvh] flex items-center justify-center">
        {/* 
          This video tag will play the actual video file you uploaded.
          Please upload your video file to the 'public' folder and name it 'loading-animation.mp4'.
        */}
        <video 
          ref={(el) => {
            if (el) {
              el.defaultMuted = true;
              el.muted = true;
              // Attempt to play explicitly to handle mobile autoplay restrictions
              el.play().catch((e) => console.warn("Video autoplay prevented:", e));
            }
          }}
          autoPlay 
          muted 
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
        >
          <source src="/loading-animation.mp4" type="video/mp4" />
        </video>
      </div>

    </motion.div>
  );
}

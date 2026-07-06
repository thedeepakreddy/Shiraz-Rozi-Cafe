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
      <div className="absolute inset-0 w-full h-full flex items-center justify-center">
        {/* 
          This video tag will play the actual video file you uploaded.
          Please upload your video file to the 'public' folder and name it 'loading-animation.mp4'.
        */}
        <video 
          autoPlay 
          muted 
          playsInline
          className="w-full h-full object-cover"
          src="/loading-animation.mp4"
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-16 text-[#FDE68A]/90 font-serif font-medium tracking-[0.15em] text-sm"
      >
        Loading Online Menu...
      </motion.div>
    </motion.div>
  );
}

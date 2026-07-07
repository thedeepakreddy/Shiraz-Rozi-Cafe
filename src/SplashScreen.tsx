import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { loadingVideoBase64 } from './loadingVideo';

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      video.muted = true;
      video.defaultMuted = true;
      video.setAttribute('muted', '');
      video.setAttribute('playsinline', '');
      
      // Explicitly call play to handle strict mobile autoplay policies
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((e) => console.warn("Video autoplay prevented:", e));
      }
    }
  }, []);

  useEffect(() => {
    // We wait for 10 seconds or you can adjust this to match the exact video duration
    const timer = setTimeout(() => {
      onComplete();
    }, 10000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 z-[9999] bg-[#123626] flex flex-col items-center justify-center overflow-hidden"
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="absolute inset-0 w-full h-[100dvh] flex items-center justify-center bg-[#123626]">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
        >
          <source src={loadingVideoBase64} type="video/mp4" />
        </video>
      </div>

    </motion.div>
  );
}

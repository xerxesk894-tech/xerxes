import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import SmokeCanvas from './SmokeCanvas';

export default function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    // Sequence of intro animation
    const t1 = setTimeout(() => setStage(1), 1000); // Light appears
    const t2 = setTimeout(() => setStage(2), 3500); // Logo fades in
    const t3 = setTimeout(() => setStage(3), 6000); // Move out / Finish
    const t4 = setTimeout(() => onComplete(), 7500); // Trigger complete
    
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Ambient sound feeling is implied visually */}
      
      {/* Smoke particles */}
      <motion.div 
        className="absolute inset-0 z-0"
        animate={{ opacity: stage >= 1 ? 1 : 0, scale: 1.1 }}
        transition={{ duration: 5, ease: "linear" }}
      >
        <SmokeCanvas />
      </motion.div>
      
      <div className="relative z-10 flex flex-col items-center">
        {/* Tiny gold light expanding */}
        <motion.div
           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full hidden"
           initial={{ width: 0, height: 0, opacity: 0, boxShadow: '0 0 0px #C8A96B' }}
           animate={{ 
             width: stage >= 1 ? 2 : 0, 
             height: stage >= 1 ? 2 : 0, 
             opacity: stage === 1 ? 1 : 0,
             boxShadow: stage >= 1 ? '0 0 100px 50px rgba(200, 169, 107, 0.5)' : '0 0 0px rgba(200, 169, 107, 0)'
           }}
           transition={{ duration: 2, ease: "easeInOut" }}
           style={{ display: stage < 2 ? 'block' : 'none', backgroundColor: '#C8A96B' }}
        />

        {/* Logo fade in */}
        <AnimatePresence>
          {stage >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 10, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)', letterSpacing: '0.5em' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(5px)' }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="text-center"
            >
              <h1 className="font-display text-4xl md:text-7xl lg:text-9xl text-white uppercase tracking-[0.2em] mb-4">
                Xerxes
              </h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ delay: 1, duration: 2 }}
                className="font-serif italic text-gold text-lg md:text-2xl mt-8"
              >
                Timeless Elegance
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </motion.div>
  );
}

import { motion } from 'motion/react';
import SmokeCanvas from '../components/SmokeCanvas';

export default function About() {
  return (
    <div className="w-full bg-black min-h-screen relative overflow-hidden text-center md:text-left">
      <div className="absolute inset-0 z-0">
         <SmokeCanvas />
      </div>
      
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 pt-40 pb-24 relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 1 }}
           className="mb-32"
        >
          <h4 className="font-sans text-[10px] uppercase tracking-[0.4em] text-white/40 mb-6 text-center">Our Heritage</h4>
          <h1 className="font-display text-4xl md:text-6xl lg:text-8xl text-white text-center leading-tight mx-auto max-w-4xl">
            A devotion to the <br/> <span className="italic text-gold">art of scent.</span>
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=1200" 
              alt="Craftsmanship" 
              className="w-full h-auto object-cover opacity-80 mix-blend-lighten grayscale hover:grayscale-0 transition-all duration-1000"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex flex-col justify-center"
          >
            <h2 className="font-serif italic text-3xl md:text-4xl text-white mb-8">The Philosophy of Xerxes</h2>
            <p className="font-sans text-sm text-white/70 leading-relaxed mb-6">
              XERXES was born from a singular vision: to revive the opulence and artistry of classical perfumery for the modern connoisseur. We believe that a true masterpiece must possess a soul, one that resonates with the wearer and evolves over time.
            </p>
            <p className="font-sans text-sm text-white/70 leading-relaxed">
              Every creation is meticulously composed by master artisans using only the rarest and most exquisite raw materials sourced from across the globe. We age our blends patiently, ensuring unparalleled richness and depth in every drop.
            </p>
          </motion.div>
        </div>

        <div className="relative w-full h-[60vh] flex items-center justify-center mb-32 overflow-hidden mx-auto max-w-[1600px] bg-[#0A0A0A]">
           <div className="absolute inset-0 bg-gold/5" />
           <motion.h3 
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 1.5 }}
             className="font-display text-2xl md:text-5xl text-center text-white/90 leading-relaxed max-w-3xl z-10 drop-shadow-2xl px-6"
           >
             "A fragrance is an invisible garment, a silent language, the final touch of elegance before stepping into the world."
           </motion.h3>
        </div>
      </div>
    </div>
  );
}

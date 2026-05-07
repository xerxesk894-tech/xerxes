import { motion } from 'motion/react';
import SmokeCanvas from '../components/SmokeCanvas';

const images = [
  "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1616949755610-8c9bac08f9d7?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1615486171448-6dfca3e9db28?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800"
];

function GalleryItem({ src, index }: { src: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: (index % 3) * 0.1 }}
      className="break-inside-avoid relative group overflow-hidden bg-[#0A0A0A] cursor-pointer rounded-sm"
    >
       <img 
         src={src} 
         alt={`Gallery ${index}`} 
         className="w-full h-auto object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[1.5s] ease-out"
         loading="lazy"
       />
       
       {/* Animated Gold Light Sweep */}
       <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none overflow-hidden">
          <div className="absolute top-0 -left-[100%] w-[50%] h-full bg-gradient-to-r from-transparent via-[#C8A96B]/30 to-transparent skew-x-[-20deg] mix-blend-overlay group-hover:translate-x-[500%] transition-transform duration-[1.5s] ease-out" />
       </div>

       {/* Smoke Overlay Simulation */}
       <div className="absolute inset-0 opacity-0 group-hover:opacity-50 transition-opacity duration-1000 z-10 mix-blend-screen pointer-events-none group-hover:scale-110 transform">
         <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1620614138670-6537b011d619?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center animate-pulse opacity-40 mix-blend-lighten" style={{ filter: 'blur(10px)' }} />
       </div>

       <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 pointer-events-none" />
       
       {/* Edge highlight */}
       <div className="absolute inset-0 border border-white/0 group-hover:border-[#C8A96B]/30 transition-colors duration-1000 z-30 pointer-events-none" />
    </motion.div>
  );
}

export default function Gallery() {
  return (
    <div className="w-full bg-black min-h-screen pt-32 pb-24 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
         <SmokeCanvas />
      </div>
      <div className="ambient-glow opacity-30" />
      
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1 }}
           className="mb-20 text-center"
        >
          <h1 className="font-display text-4xl md:text-6xl text-white mb-6 uppercase tracking-widest">
            Editorial <span className="italic text-gold">Vision</span>
          </h1>
        </motion.div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {images.map((src, i) => (
            <GalleryItem key={i} src={src} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

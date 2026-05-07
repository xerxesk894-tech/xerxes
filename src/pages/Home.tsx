import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import VortexCanvas from '../components/VortexCanvas';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <div ref={containerRef} className="w-full bg-black relative">
      <HeroSection />
      <FeaturedCollection />
      <LuxuryExperience />
    </div>
  );
}

function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[#0A0F1C]/20 z-0" />
      <VortexCanvas />
      <div className="ambient-glow" />
      
      {/* Light Rays */}
      <div className="absolute inset-0 z-0 opacity-20" style={{
        background: 'radial-gradient(circle at 50% -20%, rgba(200,169,107,0.4) 0%, transparent 60%)'
      }} />

      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 flex flex-col items-center justify-center w-full h-full pt-16"
      >
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 2, ease: "easeOut" }}
           className="relative"
        >
          {/* Main Perfume Image */}
          <motion.img 
            src="https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=1200" 
            alt="Xerxes Signature Bottle" 
            className="w-auto h-[50vh] md:h-[60vh] object-cover rounded-3xl mix-blend-lighten brightness-110"
            animate={{ 
              y: [0, -15, 0],
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
        </motion.div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none mix-blend-difference z-20">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="font-display text-[15vw] md:text-[12vw] tracking-tighter leading-none text-white opacity-90 mx-auto"
            style={{ textShadow: '0 10px 40px rgba(0,0,0,0.5)' }}
          >
            XERXES
          </motion.h1>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center text-center z-30 w-full px-4"
        >
          <p className="font-serif italic text-xl md:text-2xl text-gold mb-8 max-w-lg mx-auto">
            Luxury fragrance crafted for timeless elegance.
          </p>
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8">
            <Link to="/categories" className="group flex items-center space-x-3 px-8 py-4 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 rounded-full transition-all duration-500">
              <span className="font-sans text-xs uppercase tracking-[0.2em] text-white">Explore Collection</span>
              <ArrowRight size={16} className="text-white group-hover:translate-x-1 group-hover:text-gold transition-all" />
            </Link>
            <Link to="/about" className="font-sans text-xs uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-0 after:h-[1px] after:bg-gold hover:after:w-full after:transition-all after:duration-300">
              Discover Luxury
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function FeaturedCollection() {
  const collections = [
    {
      id: 1,
      name: "Noir Essentiel",
      notes: "Oud, Bergamot, Dark Leather",
      image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 2,
      name: "Oud Imperial",
      notes: "Saffron, Rose, Ambergris",
      image: "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 3,
      name: "Velvet Vert",
      notes: "Vetiver, Cedarwood, Smoke",
      image: "https://images.unsplash.com/photo-1615486171448-6dfca3e9db28?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <section className="py-32 px-6 md:px-12 max-w-[1600px] mx-auto relative z-10 bg-black">
      <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
        <div>
          <motion.h4 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-sans text-xs uppercase tracking-[0.3em] text-gold mb-6"
          >
            Curated Selection
          </motion.h4>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl md:text-6xl text-white max-w-xl leading-tight"
          >
            The Art of <span className="italic text-white/70">Seduction</span>
          </motion.h2>
        </div>
        <Link to="/categories" className="font-sans text-xs uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors border-b border-white/20 pb-2">
          View All Fragrances
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {collections.map((item, index) => (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            key={item.id}
            className="group relative cursor-pointer"
          >
            <div className="relative h-[60vh] md:h-[70vh] mb-8 overflow-hidden bg-[#0a0a0a] rounded-sm group-hover:shadow-[0_0_40px_rgba(200,169,107,0.15)] transition-all duration-700">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
              
              {/* Image with 3D feel on hover */}
              <motion.img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-full object-cover opacity-80 mix-blend-lighten"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
              
              {/* Hover effect overlays */}
              <div className="absolute inset-0 bg-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 mix-blend-color z-20 pointer-events-none" />
              
              <div className="absolute bottom-10 left-10 z-30">
                <h3 className="font-display text-2xl md:text-3xl text-white mb-2">{item.name}</h3>
                <p className="font-sans text-xs uppercase tracking-[0.2em] text-gold/80">{item.notes}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function LuxuryExperience() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [1500, 3000], [100, -100]);
  const y2 = useTransform(scrollY, [1500, 3000], [-50, 100]);

  return (
    <section className="relative py-40 overflow-hidden bg-[#030303]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,rgba(0,0,0,1)_100%)] pointer-events-none" />
      
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8 items-center">
        
        <div className="relative">
          <motion.div style={{ y: y1 }} className="absolute -top-20 -left-10 w-40 h-40 bg-gold blur-[100px] opacity-20 rounded-full" />
          <motion.img 
             style={{ y: y2 }}
             src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=1200" 
             alt="Luxury ingredients" 
             className="w-4/5 h-auto object-cover opacity-80 grayscale mix-blend-lighten"
          />
        </div>

        <div className="flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
          >
            <h4 className="font-sans text-[10px] uppercase tracking-[0.4em] text-white/40 mb-8">The Philosophy</h4>
            <h2 className="font-serif italic text-4xl md:text-6xl text-white mb-10 leading-tight">
              Crafted for those <br/> who desire sophistication <br/> beyond ordinary fragrances.
            </h2>
            <p className="font-sans text-sm text-white/60 leading-relaxed max-w-md mb-12">
              Every drop of XERXES is a testament to the grand tradition of high perfumery. We source exclusively rare ingredients, aging them in oak and crafting compositions that reveal themselves differently on every skin over the course of the night.
            </p>
            
            <Link to="/about" className="inline-flex items-center justify-center w-32 h-32 rounded-full border border-white/20 hover:border-gold hover:bg-gold/5 transition-all duration-500 group">
              <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-white group-hover:text-gold transition-colors text-center px-4">The Maison</span>
            </Link>
          </motion.div>
        </div>

      </div>
    </section>
  );
}

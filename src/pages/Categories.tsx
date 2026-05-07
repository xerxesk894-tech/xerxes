import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import SmokeCanvas from '../components/SmokeCanvas';

const categories = [
  {
    id: 'woody',
    title: 'Woody',
    subtitle: 'Deep, earthy, textured',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'oriental',
    title: 'Oriental',
    subtitle: 'Warm, spicy, sensual',
    image: 'https://images.unsplash.com/photo-1599839619722-39751411ea63?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'smoky',
    title: 'Smoky',
    subtitle: 'Incense, leather, bold',
    image: 'https://images.unsplash.com/photo-1582211594533-22830f6a29be?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'fresh',
    title: 'Fresh',
    subtitle: 'Citrus, aquatic, vibrant',
    image: 'https://images.unsplash.com/photo-1616949755610-8c9bac08f9d7?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'royal',
    title: 'Royal Collection',
    subtitle: 'Exclusive, limited, majestic',
    image: 'https://images.unsplash.com/photo-1615486171448-6dfca3e9db28?auto=format&fit=crop&q=80&w=1200'
  }
];

export default function Categories() {
  return (
    <div className="w-full bg-black min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-[1600px] mx-auto relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <SmokeCanvas />
      </div>
      
      <div className="mb-24 text-center relative z-10">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="font-display text-5xl md:text-7xl text-white mb-6 uppercase tracking-widest"
        >
          Fragrance Families
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-serif italic text-xl text-gold/80"
        >
          Discover your olfactory signature
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 relative z-10">
        {categories.map((cat, i) => (
          <Link to={`/product/${cat.id}`} key={cat.id} className={`group ${i === 4 ? 'md:col-span-2 lg:col-span-3 lg:h-[60vh]' : 'h-[50vh] md:h-[60vh]'} block overflow-hidden relative`}>
            <div className="absolute inset-0 bg-black z-0" />
            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.8, delay: i * 0.1 }}
               className="w-full h-full relative"
            >
              <img 
                src={cat.image} 
                alt={cat.title} 
                className="w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-1000 ease-out transform group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80" />
              
              {/* Gold light accent on hover */}
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gold scale-x-0 group-hover:scale-x-100 transform origin-left transition-transform duration-700 ease-out" />
              
              <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 z-20">
                <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-gold mb-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out">
                  {cat.subtitle}
                </p>
                <h2 className="font-serif italic text-3xl md:text-5xl text-white font-light group-hover:text-gold transition-colors duration-500">
                  {cat.title}
                </h2>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}

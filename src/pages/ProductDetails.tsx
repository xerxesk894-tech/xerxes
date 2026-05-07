import { motion } from 'motion/react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import SmokeCanvas from '../components/SmokeCanvas';
import Bottle3D from '../components/Bottle3D';

export default function ProductDetails() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('notes');

  const name = id ? id.charAt(0).toUpperCase() + id.slice(1) : 'Noir Essentiel';

  return (
    <div className="w-full bg-black min-h-screen pt-24 relative overflow-hidden">
      {/* Cinematic Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[80vh] bg-[#C8A96B] mix-blend-color opacity-5 blur-[150px] pointer-events-none z-0" />
      <SmokeCanvas />

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 min-h-[85vh] relative z-10">
        
        {/* Left Column - Product Image */}
        <div className="relative flex items-center justify-center h-[60vh] lg:h-full group">
           <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />
           <motion.div
             initial={{ opacity: 0, filter: 'blur(20px)' }}
             animate={{ opacity: 1, filter: 'blur(0px)' }}
             transition={{ duration: 1.5, ease: "easeOut" }}
             className="absolute inset-0 w-full h-full z-20 drop-shadow-[0_0_30px_rgba(200,169,107,0.2)]"
           >
             <Bottle3D />
           </motion.div>
           {/* Floating particles around bottle */}
           <div className="absolute inset-0 pointer-events-none z-30">
               {[...Array(6)].map((_, i) => (
                 <motion.div
                   key={i}
                   className="absolute w-1 h-1 bg-gold rounded-full opacity-0 blur-[1px]"
                   animate={{
                     y: [0, -100 - Math.random() * 100],
                     x: [0, (Math.random() - 0.5) * 50],
                     opacity: [0, 0.8, 0],
                   }}
                   transition={{
                     duration: 3 + Math.random() * 3,
                     repeat: Infinity,
                     delay: Math.random() * 2,
                   }}
                   style={{
                     left: `${40 + Math.random() * 20}%`,
                     bottom: `${30 + Math.random() * 10}%`
                   }}
                 />
               ))}
           </div>
        </div>

        {/* Right Column - Product Info */}
        <div className="flex flex-col justify-center py-12 lg:py-0 lg:pl-16 relative z-20">
           <motion.div
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 1, delay: 0.3 }}
           >
             <h4 className="font-sans text-[10px] uppercase tracking-[0.4em] text-white/50 mb-4">Eau de Parfum &mdash; 100ml</h4>
             <h1 className="font-display text-5xl md:text-7xl text-white mb-6 leading-none">
               {name}
             </h1>
             <p className="font-serif italic text-2xl text-gold mb-12">
               $340.00
             </p>

             <p className="font-sans text-sm text-white/70 leading-relaxed mb-12 max-w-lg">
               A masterful composition of the rarest dark woods, illuminated by strikes of golden citrus. Designed for the twilight hours, leaving a mesmerizing trail of smoke, rich leather, and sensual amber.
             </p>

             <button className="w-full md:w-auto px-12 py-5 bg-white text-black font-sans text-xs uppercase tracking-[0.2em] hover:bg-gold transition-colors duration-300 mb-16">
               Add to Bag
             </button>

             {/* Description / Notes Tabs */}
             <div className="border-t border-white/10 pt-8">
               <div className="flex space-x-8 mb-8">
                 <button 
                   onClick={() => setActiveTab('notes')}
                   className={`font-sans text-[10px] uppercase tracking-[0.2em] pb-2 border-b transition-all ${activeTab === 'notes' ? 'text-gold border-gold' : 'text-white/40 border-transparent hover:text-white'}`}
                 >
                   Olfactory Notes
                 </button>
                 <button 
                   onClick={() => setActiveTab('details')}
                   className={`font-sans text-[10px] uppercase tracking-[0.2em] pb-2 border-b transition-all ${activeTab === 'details' ? 'text-gold border-gold' : 'text-white/40 border-transparent hover:text-white'}`}
                 >
                   Details & Ingredients
                 </button>
               </div>

               <div className="min-h-[150px]">
                 {activeTab === 'notes' ? (
                   <motion.div 
                     initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                     className="grid grid-cols-1 md:grid-cols-3 gap-8"
                   >
                     <div>
                       <h5 className="font-serif italic text-lg text-white mb-2">Top</h5>
                       <p className="font-sans text-[10px] uppercase tracking-[0.1em] text-white/50 leading-relaxed max-w-[150px]">Bergamot from Calabria, Saffron, Black Pepper</p>
                     </div>
                     <div>
                       <h5 className="font-serif italic text-lg text-white mb-2">Heart</h5>
                       <p className="font-sans text-[10px] uppercase tracking-[0.1em] text-white/50 leading-relaxed max-w-[150px]">Bulgarian Rose, Intense Leather, Smoky Woods</p>
                     </div>
                     <div>
                       <h5 className="font-serif italic text-lg text-white mb-2">Base</h5>
                       <p className="font-sans text-[10px] uppercase tracking-[0.1em] text-white/50 leading-relaxed max-w-[150px]">Rare Agarwood (Oud), Ambergris, Vanilla Bean</p>
                     </div>
                   </motion.div>
                 ) : (
                   <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                     <p className="font-sans text-xs text-white/60 leading-relaxed max-w-lg mb-4">
                       <strong>Longevity:</strong> Very Long Lasting (12+ hours)<br/>
                       <strong>Projection:</strong> Enormous<br/>
                       <strong>Family:</strong> Woody Oriental
                     </p>
                     <p className="font-sans text-[10px] text-white/40 leading-relaxed max-w-lg">
                       Crafted by master perfumers in Grasse, France. Uses 100% natural, sustainably sourced Oud and grand cru saffron. Concentration of pure oil: 28%.
                     </p>
                   </motion.div>
                 )}
               </div>
             </div>

           </motion.div>
        </div>
      </div>
    </div>
  );
}

import { motion } from 'motion/react';
import SmokeCanvas from '../components/SmokeCanvas';

export default function Contact() {
  return (
    <div className="w-full bg-[#050505] min-h-screen pt-40 pb-24 relative flex items-center justify-center overflow-hidden">
      {/* Dark glossy background feel via gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.05)_0%,rgba(0,0,0,1)_80%)] pointer-events-none z-0" />
      <div className="absolute inset-0 z-0 opacity-50">
        <SmokeCanvas />
      </div>
      
      <div className="w-full max-w-4xl mx-auto px-6 relative z-10 flex flex-col items-center">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1 }}
           className="text-center mb-16"
        >
          <h1 className="font-display text-4xl md:text-6xl text-white mb-6 uppercase tracking-widest">
            Private <span className="italic text-gold">Concierge</span>
          </h1>
          <p className="font-sans text-sm text-white/50 max-w-md mx-auto leading-relaxed">
            For bespoke appointments, press inquiries, or exclusive collection access, please contact our maison.
          </p>
        </motion.div>

        <motion.form 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="w-full max-w-2xl bg-white/[0.02] backdrop-blur-3xl border border-white/10 p-8 md:p-16 relative"
          onSubmit={(e) => e.preventDefault()}
        >
          {/* Subtle inner glowing edges */}
          <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(200,169,107,0.02)] pointer-events-none" />

          <div className="space-y-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative group">
                <input required type="text" id="name" className="w-full bg-transparent border-b border-white/20 pb-2 pt-4 text-white focus:outline-none focus:border-gold transition-colors font-sans text-sm peer" placeholder=" " />
                <label htmlFor="name" className="absolute top-4 left-0 font-sans text-[10px] uppercase tracking-[0.2em] text-white/40 transition-all peer-focus:-top-2 peer-focus:text-gold peer-focus:text-[9px] peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-[9px]">Full Name</label>
              </div>
              <div className="relative group">
                <input required type="email" id="email" className="w-full bg-transparent border-b border-white/20 pb-2 pt-4 text-white focus:outline-none focus:border-gold transition-colors font-sans text-sm peer" placeholder=" " />
                <label htmlFor="email" className="absolute top-4 left-0 font-sans text-[10px] uppercase tracking-[0.2em] text-white/40 transition-all peer-focus:-top-2 peer-focus:text-gold peer-focus:text-[9px] peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-[9px]">Email Address</label>
              </div>
            </div>
            
            <div className="relative group">
              <input type="text" id="subject" className="w-full bg-transparent border-b border-white/20 pb-2 pt-4 text-white focus:outline-none focus:border-gold transition-colors font-sans text-sm peer" placeholder=" " />
              <label htmlFor="subject" className="absolute top-4 left-0 font-sans text-[10px] uppercase tracking-[0.2em] text-white/40 transition-all peer-focus:-top-2 peer-focus:text-gold peer-focus:text-[9px] peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-[9px]">Subject / Inquiry</label>
            </div>

            <div className="relative group">
              <textarea required id="message" rows={4} className="w-full bg-transparent border-b border-white/20 pb-2 pt-4 text-white focus:outline-none focus:border-gold transition-colors font-sans text-sm peer resize-none" placeholder=" " />
              <label htmlFor="message" className="absolute top-4 left-0 font-sans text-[10px] uppercase tracking-[0.2em] text-white/40 transition-all peer-focus:-top-2 peer-focus:text-gold peer-focus:text-[9px] peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-[9px]">Your Message</label>
            </div>

            <button type="submit" className="w-full pt-8 flex items-center justify-center font-sans text-[10px] uppercase tracking-[0.3em] text-gold hover:text-white transition-colors duration-500 overflow-hidden group">
               <span className="relative z-10 px-12 py-4 border border-gold/40 group-hover:border-white/40 group-hover:bg-white/[0.05] w-full transition-all duration-500">Send Message</span>
            </button>
          </div>
        </motion.form>
      </div>
    </div>
  );
}

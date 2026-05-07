import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, Search, ShoppingBag } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Layout({ children }: { children: ReactNode }) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-black text-white selection:bg-gold selection:text-black">
      <Navbar />
      
      <main className="relative w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="fixed top-0 left-0 right-0 z-40 bg-black/50 backdrop-blur-md border-b border-white/5 mix-blend-difference"
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex items-center justify-between h-24">
        {/* Left Links */}
        <div className="hidden md:flex items-center space-x-12 font-sans text-xs uppercase tracking-[0.2em]">
          <Link to="/" className="hover:text-gold transition-colors duration-300">Home</Link>
          <Link to="/categories" className="hover:text-gold transition-colors duration-300">Collections</Link>
          <Link to="/about" className="hover:text-gold transition-colors duration-300">Maison</Link>
        </div>

        {/* Logo */}
        <Link to="/" className="absolute left-1/2 -translate-x-1/2 text-center">
          <span className="font-display text-3xl md:text-4xl uppercase tracking-[0.3em] pl-[0.3em]">Xerxes</span>
        </Link>

        {/* Right Links */}
        <div className="hidden md:flex items-center space-x-8">
          <button className="text-white hover:text-gold transition-colors duration-300"><Search size={20} strokeWidth={1.5} /></button>
          <Link to="/contact" className="font-sans text-xs uppercase tracking-[0.2em] hover:text-gold transition-colors duration-300">Contact</Link>
          <button className="text-white hover:text-gold transition-colors duration-300"><ShoppingBag size={20} strokeWidth={1.5} /></button>
        </div>

        {/* Mobile menu toggle */}
        <div className="md:hidden flex items-center space-x-6">
          <button className="text-white"><ShoppingBag size={20} strokeWidth={1.5} /></button>
          <button className="text-white"><Menu size={24} strokeWidth={1.5} /></button>
        </div>
      </div>
    </motion.nav>
  );
}

function Footer() {
  return (
    <footer className="bg-black pt-32 pb-12 border-t border-white/5 relative overflow-hidden">
      <div className="ambient-glow" style={{ top: '100%', opacity: 0.3 }} />
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-24">
          <div className="md:col-span-1">
            <span className="font-display text-4xl uppercase tracking-[0.2em] mb-6 block">Xerxes</span>
            <p className="font-serif italic text-white/50 text-xl">The scent of timeless elegance.</p>
          </div>
          
          <div>
            <h4 className="font-sans text-xs uppercase tracking-[0.2em] text-gold mb-6">Collections</h4>
            <ul className="space-y-4 font-sans text-sm text-white/60">
              <li><Link to="/categories" className="hover:text-white transition-colors">Woody</Link></li>
              <li><Link to="/categories" className="hover:text-white transition-colors">Oriental</Link></li>
              <li><Link to="/categories" className="hover:text-white transition-colors">Fresh</Link></li>
              <li><Link to="/categories" className="hover:text-white transition-colors">Royal Collection</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-sans text-xs uppercase tracking-[0.2em] text-gold mb-6">Maison</h4>
            <ul className="space-y-4 font-sans text-sm text-white/60">
              <li><Link to="/about" className="hover:text-white transition-colors">Our Story</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Craftsmanship</Link></li>
              <li><Link to="/gallery" className="hover:text-white transition-colors">Gallery</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-sans text-xs uppercase tracking-[0.2em] text-gold mb-6">Newsletter</h4>
            <p className="font-sans text-sm text-white/60 mb-4 line-height-relaxed">Subscribe to receive exclusive access privileges and brand updates.</p>
            <div className="relative">
              <input type="email" placeholder="Email Address" className="w-full bg-transparent border-b border-white/20 pb-2 text-sm text-white focus:outline-none focus:border-gold transition-colors font-sans placeholder:uppercase placeholder:letter-spacing-[0.1em] placeholder:text-[10px]" />
              <button className="absolute right-0 bottom-2 text-[10px] uppercase tracking-[0.2em] text-gold hover:text-white transition-colors">Submit</button>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/10 pt-8 mt-8">
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-white/40">&copy; {new Date().getFullYear()} XERXES PARIS. All Rights Reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0 font-sans text-[10px] uppercase tracking-[0.2em] text-white/40">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

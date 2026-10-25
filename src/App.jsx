import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Skills from './components/Skills.jsx';
import LearningRoadmap from './components/LearningRoadmap.jsx';
import Projects from './components/Projects.jsx';
import Journey from './components/Journey.jsx';
import Certifications from './components/Certifications.jsx';
import Resume from './components/Resume.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import CloudBackground from './components/CloudBackground.jsx';

function BackToTop({ isDark }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-200"
          style={{
            background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
            boxShadow: '0 0 20px rgba(139,92,246,0.4)',
          }}
          whileHover={{ scale: 1.1, boxShadow: '0 0 30px rgba(139,92,246,0.6)' }}
          whileTap={{ scale: 0.9 }}
          aria-label="Back to top"
          id="floating-back-to-top"
        >
          <ArrowUp size={18} className="text-white" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// Page loading screen
function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-950"
    >
      <div className="flex flex-col items-center gap-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 rounded-full"
          style={{
            border: '3px solid rgba(139,92,246,0.2)',
            borderTopColor: '#8b5cf6',
          }}
        />
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-sm text-slate-400 font-mono"
        >
          Loading portfolio...
        </motion.p>
      </div>
    </motion.div>
  );
}

export default function App() {
  // Persist theme preference
  const [isDark, setIsDark] = useState(() => {
    try {
      const stored = localStorage.getItem('portfolio-theme');
      if (stored) return stored === 'dark';
    } catch {}
    return true; // default dark
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Apply theme class to html element
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      document.documentElement.style.colorScheme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      document.documentElement.style.colorScheme = 'light';
    }
    try {
      localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
    } catch {}
  }, [isDark]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => setIsDark(prev => !prev);

  return (
    <>
      <AnimatePresence>{isLoading && <LoadingScreen key="loader" />}</AnimatePresence>

      <div
        className={`min-h-screen relative transition-colors duration-300 ${
          isDark ? 'bg-[#020817] text-slate-200' : 'bg-[#f0f4ff] text-slate-800'
        }`}
      >
        {/* Animated Cloud & Infrastructure Theme Background */}
        <CloudBackground isDark={isDark} />

        <div className="relative z-10">
          <Navbar isDark={isDark} toggleTheme={toggleTheme} />

          <main>
          <Hero isDark={isDark} />

          {/* Separator */}
          <div className="neon-line opacity-30" />

          <About isDark={isDark} />
          <div className="neon-line opacity-20 mx-8 md:mx-24" />

          <Skills isDark={isDark} />
          <LearningRoadmap isDark={isDark} />
          <div className="neon-line opacity-20 mx-8 md:mx-24" />

          <Projects isDark={isDark} />
          <div className="neon-line opacity-20 mx-8 md:mx-24" />

          <Journey isDark={isDark} />
          <div className="neon-line opacity-20 mx-8 md:mx-24" />

          <Certifications isDark={isDark} />
          <div className="neon-line opacity-20 mx-8 md:mx-24" />

          <Resume isDark={isDark} />
          <div className="neon-line opacity-20 mx-8 md:mx-24" />

          <Contact isDark={isDark} />
        </main>

        <Footer isDark={isDark} />
      </div>
        <BackToTop isDark={isDark} />
      </div>
    </>
  );
}

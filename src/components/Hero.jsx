import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowDown, Terminal, Cloud, Shield, Server, GitBranch } from 'lucide-react';

const typingWords = ['Cloud Computing', 'DevOps & Automation', 'AWS Infrastructure', 'Cloud Security'];

const floatingIcons = [
  { icon: Cloud, label: 'Cloud', x: '10%', y: '20%', delay: 0, size: 28, color: '#06b6d4' },
  { icon: Shield, label: 'Security', x: '85%', y: '15%', delay: 0.5, size: 24, color: '#8b5cf6' },
  { icon: Server, label: 'Server', x: '80%', y: '65%', delay: 1, size: 26, color: '#a855f7' },
  { icon: Terminal, label: 'Terminal', x: '8%', y: '70%', delay: 1.5, size: 22, color: '#22d3ee' },
  { icon: GitBranch, label: 'DevOps', x: '50%', y: '88%', delay: 2, size: 20, color: '#c084fc' },
];

// CSS-based 3D developer illustration
function DeveloperIllustration() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Outer orbital ring */}
      <div className="absolute w-72 h-72 rounded-full border border-purple-500/20 animate-spin-slow" style={{ animationDuration: '20s' }}>
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-purple-500 shadow-[0_0_12px_#8b5cf6]" />
      </div>
      {/* Inner orbital ring */}
      <div className="absolute w-48 h-48 rounded-full border border-cyan-500/20" style={{ animation: 'spin 12s linear infinite reverse' }}>
        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_10px_#06b6d4]" />
        <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 rounded-full bg-violet-400 shadow-[0_0_10px_#a78bfa]" />
      </div>

      {/* Central hexagon card */}
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="relative z-10 w-40 h-40 rounded-3xl flex flex-col items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, rgba(139,92,246,0.3), rgba(6,182,212,0.2))',
          border: '1px solid rgba(139,92,246,0.4)',
          boxShadow: '0 0 40px rgba(139,92,246,0.3), 0 0 80px rgba(6,182,212,0.1), inset 0 1px 0 rgba(255,255,255,0.1)',
          backdropFilter: 'blur(16px)',
        }}
      >
        {/* Terminal lines */}
        <div className="font-mono text-xs space-y-1 px-4 w-full">
          <div className="flex items-center gap-1">
            <span className="text-green-400">$</span>
            <span className="text-slate-300 text-[10px]">aws configure</span>
          </div>
          <div className="text-cyan-400 text-[10px]">✓ Region: ap-south</div>
          <div className="text-purple-400 text-[10px]">✓ EC2: running</div>
          <div className="flex items-center gap-1">
            <span className="text-green-400">$</span>
            <span className="text-slate-300 text-[10px] animate-pulse">_</span>
          </div>
        </div>
      </motion.div>

      {/* Small floating tech chips */}
      {[
        { label: 'AWS', x: -110, y: -50, color: '#f97316' },
        { label: 'Linux', x: 100, y: -40, color: '#06b6d4' },
        { label: 'Python', x: -100, y: 50, color: '#eab308' },
        { label: 'Nginx', x: 95, y: 55, color: '#22c55e' },
      ].map((chip, i) => (
        <motion.div
          key={chip.label}
          className="absolute px-3 py-1.5 rounded-full text-xs font-semibold text-white"
          style={{
            left: `calc(50% + ${chip.x}px)`,
            top: `calc(50% + ${chip.y}px)`,
            background: `${chip.color}22`,
            border: `1px solid ${chip.color}44`,
            color: chip.color,
          }}
          animate={{ y: [0, i % 2 === 0 ? -8 : 8, 0] }}
          transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
        >
          {chip.label}
        </motion.div>
      ))}

      {/* Ambient glow blobs */}
      <div className="absolute w-32 h-32 rounded-full blur-3xl opacity-30 animate-glow-pulse"
        style={{ background: '#8b5cf6', top: '20%', left: '20%' }} />
      <div className="absolute w-24 h-24 rounded-full blur-3xl opacity-25 animate-glow-pulse"
        style={{ background: '#06b6d4', bottom: '20%', right: '20%', animationDelay: '2s' }} />
    </div>
  );
}

// Animated typing hook
function useTypingEffect(words, speed = 80, pause = 2000) {
  const [displayText, setDisplayText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const currentWord = words[wordIndex];

    const tick = () => {
      if (isDeleting) {
        setDisplayText(prev => prev.slice(0, -1));
        if (displayText.length <= 1) {
          setIsDeleting(false);
          setWordIndex(prev => (prev + 1) % words.length);
          timeoutRef.current = setTimeout(tick, 400);
          return;
        }
        timeoutRef.current = setTimeout(tick, speed / 2);
      } else {
        setDisplayText(currentWord.slice(0, displayText.length + 1));
        if (displayText.length === currentWord.length) {
          timeoutRef.current = setTimeout(() => setIsDeleting(true), pause);
          return;
        }
        timeoutRef.current = setTimeout(tick, speed);
      }
    };

    timeoutRef.current = setTimeout(tick, speed);
    return () => clearTimeout(timeoutRef.current);
  }, [displayText, isDeleting, wordIndex, words, speed, pause]);

  return displayText;
}

// Particle field
function ParticleField() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 10,
    opacity: Math.random() * 0.4 + 0.1,
    color: i % 3 === 0 ? '#8b5cf6' : i % 3 === 1 ? '#06b6d4' : '#c084fc',
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(p => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            bottom: '-10px',
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.color,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
          }}
        />
      ))}
    </div>
  );
}

export default function Hero({ isDark }) {
  const typedText = useTypingEffect(typingWords);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: isDark
          ? 'radial-gradient(ellipse at 30% 0%, rgba(88, 28, 135, 0.35) 0%, rgba(2, 8, 23, 0) 60%), radial-gradient(ellipse at 70% 100%, rgba(6, 182, 212, 0.15) 0%, rgba(2, 8, 23, 0) 60%), #020817'
          : 'radial-gradient(ellipse at 30% 0%, rgba(168, 85, 247, 0.15) 0%, rgba(240, 244, 255, 0) 60%), #f0f4ff',
      }}
    >
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-60" />

      {/* Particles */}
      <ParticleField />

      {/* Floating icons */}
      {floatingIcons.map(({ icon: Icon, label, x, y, delay, size, color }) => (
        <motion.div
          key={label}
          className="absolute hidden md:flex items-center justify-center w-12 h-12 rounded-xl"
          style={{
            left: x,
            top: y,
            background: `${color}18`,
            border: `1px solid ${color}30`,
            boxShadow: `0 0 16px ${color}20`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
          transition={{
            opacity: { delay: delay + 0.5, duration: 0.5 },
            scale: { delay: delay + 0.5, duration: 0.5 },
            y: { delay: delay, duration: 4 + delay, repeat: Infinity, ease: 'easeInOut' },
          }}
          aria-label={label}
        >
          <Icon size={size} color={color} />
        </motion.div>
      ))}

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* Left: Text Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{
                background: 'rgba(139,92,246,0.12)',
                border: '1px solid rgba(139,92,246,0.3)',
              }}
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm font-medium text-purple-300">Open to Cloud / DevOps Internships</span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black mb-2 leading-tight"
            >
              <span className={isDark ? 'text-white' : 'text-slate-900'}>Anshu Kumar</span>{' '}
              <span className="gradient-text">Jha</span>
            </motion.h1>

            {/* Main heading */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4"
            >
              <span className={isDark ? 'text-slate-300' : 'text-slate-600'}>Cloud & DevOps </span>
              <span className="gradient-text-warm">Enthusiast</span>
            </motion.h2>

            {/* Typing effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-center lg:justify-start gap-2 mb-6 h-8"
            >
              <Terminal size={16} className="text-cyan-400 flex-shrink-0" />
              <span className="font-mono text-lg text-cyan-400">{typedText}</span>
              <span className="w-0.5 h-6 bg-cyan-400 animate-typing-cursor" />
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className={`text-base sm:text-lg leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0 ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              B.Tech student in <span className="text-purple-400 font-semibold">Cloud Technology & Information Security</span> at
              Sandip University. I learn by building — exploring AWS infrastructure, automation pipelines,
              Linux environments, and cloud security concepts through real hands-on projects.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8"
            >
              <motion.button
                onClick={scrollToProjects}
                className="btn-primary"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                id="hero-explore-btn"
              >
                <span>Explore My Projects</span>
                <ArrowDown size={16} />
              </motion.button>
              <motion.button
                onClick={scrollToContact}
                className="btn-secondary"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                id="hero-contact-btn"
              >
                Contact Me
              </motion.button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-4 justify-center lg:justify-start"
            >
              <a
                href="https://github.com/your-github-username"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 text-sm font-medium transition-colors duration-200 ${
                  isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
                aria-label="GitHub Profile"
                id="hero-github-link"
              >
                <Github size={20} />
                <span className="hidden sm:inline">GitHub</span>
              </a>
              <div className={`w-px h-4 ${isDark ? 'bg-slate-700' : 'bg-slate-300'}`} />
              <a
                href="https://linkedin.com/in/your-linkedin-username"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 text-sm font-medium transition-colors duration-200 ${
                  isDark ? 'text-slate-400 hover:text-blue-400' : 'text-slate-600 hover:text-blue-600'
                }`}
                aria-label="LinkedIn Profile"
                id="hero-linkedin-link"
              >
                <Linkedin size={20} />
                <span className="hidden sm:inline">LinkedIn</span>
              </a>
              <div className={`w-px h-4 ${isDark ? 'bg-slate-700' : 'bg-slate-300'}`} />
              <a
                href="mailto:your.email@example.com"
                className={`flex items-center gap-2 text-sm font-medium transition-colors duration-200 ${
                  isDark ? 'text-slate-400 hover:text-purple-400' : 'text-slate-600 hover:text-purple-600'
                }`}
                aria-label="Email"
                id="hero-email-link"
              >
                <Mail size={20} />
                <span className="hidden sm:inline">Email</span>
              </a>
            </motion.div>
          </div>

          {/* Right: Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:flex items-center justify-center h-96"
          >
            <DeveloperIllustration />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex justify-center mt-12"
        >
          <motion.button
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className={`flex flex-col items-center gap-2 text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'} hover:text-purple-400 transition-colors`}
            aria-label="Scroll down"
          >
            <span>Scroll to explore</span>
            <ArrowDown size={16} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

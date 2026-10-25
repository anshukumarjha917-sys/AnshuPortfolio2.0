import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Heart, Terminal, ArrowUp } from 'lucide-react';

const footerLinks = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#journey', label: 'Journey' },
  { href: '#contact', label: 'Contact' },
];

export default function Footer({ isDark }) {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleNavClick = (href) => {
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer
      className={`relative border-t ${isDark ? 'border-white/5' : 'border-slate-200'}`}
      role="contentinfo"
    >
      {/* Top gradient line */}
      <div className="neon-line" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br from-purple-500 to-cyan-500">
                <Terminal size={14} className="text-white" />
              </div>
              <span className="font-bold text-lg gradient-text">Anshu.dev</span>
            </div>
            <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
              Cloud & DevOps Enthusiast | B.Tech CTIS Student at Sandip University.
              Building cloud skills one project at a time.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className={`text-sm font-semibold mb-4 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Quick Links
            </h3>
            <nav className="space-y-2">
              {footerLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  className={`block text-sm transition-colors duration-200 ${
                    isDark ? 'text-slate-500 hover:text-purple-400' : 'text-slate-400 hover:text-purple-600'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Connect */}
          <div>
            <h3 className={`text-sm font-semibold mb-4 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Connect
            </h3>
            <div className="space-y-3">
              <a
                href="https://github.com/your-github-username"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 text-sm transition-colors duration-200 ${
                  isDark ? 'text-slate-500 hover:text-white' : 'text-slate-400 hover:text-slate-900'
                }`}
                aria-label="GitHub"
              >
                <Github size={16} />
                <span>GitHub</span>
              </a>
              <a
                href="https://linkedin.com/in/your-linkedin-username"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 text-sm transition-colors duration-200 ${
                  isDark ? 'text-slate-500 hover:text-blue-400' : 'text-slate-400 hover:text-blue-600'
                }`}
                aria-label="LinkedIn"
              >
                <Linkedin size={16} />
                <span>LinkedIn</span>
              </a>
              <a
                href="mailto:your.email@example.com"
                className={`flex items-center gap-2 text-sm transition-colors duration-200 ${
                  isDark ? 'text-slate-500 hover:text-purple-400' : 'text-slate-400 hover:text-purple-600'
                }`}
                aria-label="Email"
              >
                <Mail size={16} />
                <span>your.email@example.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t ${isDark ? 'border-white/5' : 'border-slate-200'}`}>
          <p className={`text-sm flex items-center gap-1.5 ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>
            <span>© 2024 Anshu Kumar Jha. Built with</span>
            <Heart size={12} className="text-purple-400 fill-purple-400" />
            <span>React + Vite + Tailwind</span>
          </p>

          {/* Back to top */}
          <motion.button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-purple-400 transition-colors duration-200"
            whileHover={{ y: -2 }}
            aria-label="Back to top"
            id="back-to-top-btn"
          >
            <ArrowUp size={14} />
            <span>Back to top</span>
          </motion.button>
        </div>
      </div>
    </footer>
  );
}

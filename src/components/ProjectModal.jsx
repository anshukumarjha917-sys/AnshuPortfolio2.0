import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, CheckCircle, Zap, ArrowRight } from 'lucide-react';

const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modal = {
  hidden: { opacity: 0, scale: 0.9, y: 30 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', damping: 25, stiffness: 300 } },
  exit: { opacity: 0, scale: 0.92, y: 20, transition: { duration: 0.2 } },
};

export default function ProjectModal({ project, isDark, onClose }) {
  // Trap focus and close on Escape
  useEffect(() => {
    if (!project) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="backdrop"
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} details`}
        >
          <motion.div
            key="modal"
            variants={modal}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl ${
              isDark ? 'bg-navy-900 border border-white/10' : 'bg-white border border-slate-200'
            }`}
            style={{ boxShadow: `0 24px 80px rgba(0,0,0,0.6), 0 0 40px ${project.glowColor}20` }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Gradient top bar */}
            <div className={`h-1.5 w-full bg-gradient-to-r ${project.color.replace('/20', '')}`} />

            <div className="p-6 sm:p-8">
              {/* Close button */}
              <button
                onClick={onClose}
                className={`absolute top-5 right-5 p-2 rounded-xl transition-colors duration-200 ${
                  isDark ? 'text-slate-400 hover:text-white hover:bg-white/10' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                }`}
                aria-label="Close modal"
                id="project-modal-close"
              >
                <X size={18} />
              </button>

              {/* Header */}
              <div className="flex items-start gap-4 mb-6 pr-10">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${project.glowColor}25, ${project.glowColor}10)`,
                    border: `1px solid ${project.glowColor}35`,
                  }}
                >
                  {project.icon}
                </div>
                <div>
                  <h2 className={`text-xl font-bold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {project.title}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="tech-badge">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="neon-line mb-6" />

              {/* Overview */}
              <section className="mb-6">
                <h3 className={`flex items-center gap-2 text-sm font-semibold uppercase tracking-wider mb-3 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  <Zap size={14} className="text-purple-400" />
                  Project Overview
                </h3>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {project.description}
                </p>
              </section>

              {/* Problem Statement */}
              <section className="mb-6">
                <h3 className={`flex items-center gap-2 text-sm font-semibold uppercase tracking-wider mb-3 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  <ArrowRight size={14} className="text-cyan-400" />
                  Problem / Motivation
                </h3>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {project.problem}
                </p>
              </section>

              {/* What I Learned */}
              <section className="mb-6">
                <h3 className={`flex items-center gap-2 text-sm font-semibold uppercase tracking-wider mb-3 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  <CheckCircle size={14} className="text-emerald-400" />
                  What I Learned
                </h3>
                <ul className="space-y-2">
                  {project.learned.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07 }}
                      className={`flex items-start gap-2.5 text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0 mt-1.5" />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </section>

              {/* Future Improvements */}
              <section className="mb-8">
                <h3 className={`flex items-center gap-2 text-sm font-semibold uppercase tracking-wider mb-3 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  <ArrowRight size={14} className="text-purple-400" />
                  Future Improvements
                </h3>
                <ul className="space-y-2">
                  {project.improvements.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07 + 0.2 }}
                      className={`flex items-start gap-2.5 text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0 mt-1.5" />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </section>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-3">
                {project.hasLive && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-sm"
                    id={`modal-live-${project.id}`}
                  >
                    <ExternalLink size={15} />
                    <span>Live Demo</span>
                  </a>
                )}
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-sm"
                  id={`modal-github-${project.id}`}
                >
                  <Github size={15} />
                  <span>GitHub Repository</span>
                </a>
              </div>

              {/* Placeholder notice */}
              <p className={`text-xs mt-4 ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>
                * Links above are placeholders. Replace URLs in <code className="text-purple-400">src/data/projects.js</code>
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

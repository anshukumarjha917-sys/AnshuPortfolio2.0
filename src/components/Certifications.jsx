import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Award, ExternalLink, FileText, CheckCircle2, X, Download, Eye, Sparkles } from 'lucide-react';
import { certifications } from '../data/certifications.js';

export default function Certifications({ isDark }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [selectedCert, setSelectedCert] = useState(null);

  // Close modal on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedCert(null);
    };
    if (selectedCert) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedCert]);

  return (
    <section id="certifications" className="py-24 relative" ref={ref}>
      {/* Background radial glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #f59e0b, transparent)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-4 border border-amber-500/30 bg-amber-500/10 text-amber-400">
            <Sparkles size={13} />
            Verified Credentials & Achievements
          </div>

          <h2 className={`section-title ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Certifications &{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(135deg, #f59e0b, #fbbf24)' }}
            >
              Honors
            </span>
          </h2>
          <p className="section-subtitle">
            Authentic certificates, technical course completions, and national competition recognitions
          </p>
        </motion.div>

        {/* Certifications Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.12, duration: 0.5 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className={`rounded-2xl p-6 relative flex flex-col justify-between transition-all duration-300 border ${
                isDark
                  ? 'bg-navy-900/60 border-white/10 hover:border-amber-400/40 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]'
                  : 'bg-white border-slate-200/90 shadow-sm hover:border-amber-400/50 hover:shadow-xl'
              }`}
            >
              {/* Top Row: Icon & Status Badge */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: `${cert.color}18`,
                      border: `1px solid ${cert.color}35`,
                      boxShadow: `0 0 15px ${cert.color}20`,
                    }}
                  >
                    <Award size={24} style={{ color: cert.color }} />
                  </div>

                  <span
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium"
                    style={{
                      background: `${cert.color}15`,
                      color: cert.color,
                      border: `1px solid ${cert.color}30`,
                    }}
                  >
                    <CheckCircle2 size={12} />
                    {cert.badgeText}
                  </span>
                </div>

                {/* Title & Organization */}
                <h3 className={`text-lg font-bold mb-1 leading-snug ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {cert.name}
                </h3>
                <p className="text-amber-400 text-sm font-medium mb-3 flex items-center gap-2">
                  <span>{cert.org}</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-xs text-slate-400 font-mono">{cert.date}</span>
                </p>

                {/* Description */}
                <p className={`text-sm mb-5 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  {cert.description}
                </p>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`text-[11px] px-2.5 py-1 rounded-md font-medium ${
                        isDark ? 'bg-navy-800 text-slate-300 border border-white/5' : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedCert(cert)}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-400 hover:text-amber-300 transition-colors py-1 px-2.5 rounded-lg hover:bg-amber-400/10"
                >
                  <Eye size={14} />
                  Quick Preview
                </button>

                <div className="flex items-center gap-2">
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 font-medium py-1 px-2 rounded-lg hover:bg-cyan-400/10 transition-colors"
                      title="Verify on Credly"
                    >
                      Credly <ExternalLink size={12} />
                    </a>
                  )}

                  <a
                    href={cert.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-all ${
                      isDark
                        ? 'bg-white/10 hover:bg-white/20 text-white'
                        : 'bg-slate-900 hover:bg-slate-800 text-white'
                    }`}
                  >
                    <FileText size={13} />
                    View PDF
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Interactive Certificate Preview Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className={`relative w-full max-w-4xl h-[88vh] rounded-2xl flex flex-col overflow-hidden border shadow-2xl ${
                isDark ? 'bg-navy-950 border-white/15' : 'bg-white border-slate-200'
              }`}
            >
              {/* Modal Topbar */}
              <div className="flex items-center justify-between p-4 px-6 border-b border-white/10 bg-navy-900/50">
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: `${selectedCert.color}20`, color: selectedCert.color }}
                  >
                    <Award size={20} />
                  </div>
                  <div>
                    <h3 className={`font-bold text-base leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {selectedCert.name}
                    </h3>
                    <p className="text-xs text-slate-400">
                      {selectedCert.org} • {selectedCert.date}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {selectedCert.credentialUrl && (
                    <a
                      href={selectedCert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500/20 transition-all"
                    >
                      Credly <ExternalLink size={12} />
                    </a>
                  )}

                  <a
                    href={selectedCert.fileUrl}
                    download
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-amber-500/15 text-amber-400 border border-amber-500/30 hover:bg-amber-500/25 transition-all"
                  >
                    <Download size={13} />
                    Download
                  </a>

                  <button
                    type="button"
                    onClick={() => setSelectedCert(null)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors ml-2"
                    aria-label="Close Preview"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Embedded PDF Viewer */}
              <div className="flex-1 w-full bg-slate-950 relative overflow-hidden">
                <iframe
                  src={`${selectedCert.fileUrl}#toolbar=0&navpanes=0`}
                  title={selectedCert.name}
                  className="w-full h-full border-none"
                />
              </div>

              {/* Modal Footer */}
              <div className="p-3 px-6 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 bg-navy-900/40">
                <span>Verified genuine credential document</span>
                <a
                  href={selectedCert.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:text-amber-300 flex items-center gap-1"
                >
                  Open in dedicated tab <ExternalLink size={12} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Download, FileText, AlertCircle } from 'lucide-react';

// Set this to true once you've added your actual resume file
// Place the file at: public/Anshu-Kumar-Jha-Resume.pdf
const RESUME_FILE = '/Anshu-Kumar-Jha-Resume.pdf';
const RESUME_EXISTS = false; // ← Change to true after adding your PDF

export default function Resume({ isDark }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [showPreview, setShowPreview] = useState(false);

  return (
    <section id="resume" className="py-24 relative" ref={ref}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <span className="tech-badge inline-block mb-4">Resume</span>
          <h2 className={`section-title ${isDark ? 'text-white' : 'text-slate-900'}`}>
            My <span className="gradient-text">Resume</span>
          </h2>
          <p className="section-subtitle">
            Download or preview my resume for internship and opportunity applications
          </p>
        </motion.div>

        {/* Resume Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="glass-card p-8 sm:p-10"
          style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.08), rgba(6,182,212,0.04))' }}
        >
          <div className="flex flex-col sm:flex-row items-center gap-8">
            {/* Document icon */}
            <div
              className="w-24 h-32 rounded-2xl flex flex-col items-center justify-center gap-2 flex-shrink-0"
              style={{
                background: 'linear-gradient(135deg, rgba(139,92,246,0.2), rgba(6,182,212,0.1))',
                border: '1px solid rgba(139,92,246,0.3)',
                boxShadow: '0 0 30px rgba(139,92,246,0.15)',
              }}
            >
              <FileText size={32} className="text-purple-400" />
              <span className="text-xs font-bold text-purple-400">PDF</span>
            </div>

            {/* Info */}
            <div className="flex-1 text-center sm:text-left">
              <h3 className={`text-xl font-bold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Anshu Kumar Jha
              </h3>
              <p className="text-purple-400 font-medium mb-1">Cloud & DevOps Enthusiast</p>
              <p className={`text-sm mb-4 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                B.Tech — Cloud Technology & Information Security
                <span className={`ml-2 text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                  | Sandip University | 2024–2028
                </span>
              </p>

              {RESUME_EXISTS ? (
                <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                  <a
                    href={RESUME_FILE}
                    download="Anshu-Kumar-Jha-Resume.pdf"
                    className="btn-primary"
                    id="resume-download-btn"
                    aria-label="Download Resume PDF"
                  >
                    <Download size={16} />
                    <span>Download Resume</span>
                  </a>
                  <button
                    onClick={() => setShowPreview(!showPreview)}
                    className="btn-secondary"
                    id="resume-preview-btn"
                  >
                    <FileText size={16} />
                    <span>{showPreview ? 'Hide Preview' : 'Preview Resume'}</span>
                  </button>
                </div>
              ) : (
                <div>
                  <div
                    className="flex items-start gap-3 p-4 rounded-xl mb-4"
                    style={{
                      background: 'rgba(245,158,11,0.08)',
                      border: '1px solid rgba(245,158,11,0.2)',
                    }}
                  >
                    <AlertCircle size={16} className="text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className={`text-sm font-medium ${isDark ? 'text-amber-300' : 'text-amber-600'}`}>
                        Resume not yet added
                      </p>
                      <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        Add your PDF at <code className="text-amber-400">public/Anshu-Kumar-Jha-Resume.pdf</code>{' '}
                        and set <code className="text-amber-400">RESUME_EXISTS = true</code> in{' '}
                        <code className="text-amber-400">Resume.jsx</code>
                      </p>
                    </div>
                  </div>
                  <button
                    className="btn-primary opacity-50 cursor-not-allowed"
                    disabled
                    aria-label="Resume not yet available"
                  >
                    <Download size={16} />
                    <span>Download Resume</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Preview iframe */}
          {RESUME_EXISTS && showPreview && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 600 }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-8 rounded-xl overflow-hidden border border-white/10"
            >
              <iframe
                src={RESUME_FILE}
                title="Resume Preview"
                className="w-full h-full"
                style={{ height: '600px' }}
              />
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

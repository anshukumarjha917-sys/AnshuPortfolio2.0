import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Send, Github, Linkedin, Mail, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

// =====================================================
// PERSONAL LINKS — update these values:
// =====================================================
const GITHUB_URL = 'https://github.com/your-github-username'; // ← Replace
const LINKEDIN_URL = 'https://linkedin.com/in/your-linkedin-username'; // ← Replace
const EMAIL = 'your.email@example.com'; // ← Replace
// =====================================================

function SocialLink({ href, icon: Icon, label, color, isDark }) {
  return (
    <a
      href={href}
      target={href.startsWith('mailto') ? '_self' : '_blank'}
      rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
      className="flex items-center gap-3 p-4 rounded-xl transition-all duration-200 group"
      style={{
        background: `${color}10`,
        border: `1px solid ${color}25`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = `${color}18`;
        e.currentTarget.style.borderColor = `${color}50`;
        e.currentTarget.style.boxShadow = `0 0 15px ${color}20`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = `${color}10`;
        e.currentTarget.style.borderColor = `${color}25`;
        e.currentTarget.style.boxShadow = 'none';
      }}
      aria-label={label}
    >
      <Icon size={20} style={{ color }} />
      <span className={`text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'} group-hover:text-white transition-colors`}>
        {label}
      </span>
    </a>
  );
}

export default function Contact({ isDark }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // null | 'loading' | 'success' | 'error'

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.message.trim()) e.message = 'Message is required';
    else if (form.message.trim().length < 20) e.message = 'Message must be at least 20 characters';
    return e;
  };

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors(prev => ({ ...prev, [e.target.name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Mailto fallback — opens the user's email client with the message pre-filled.
    // No fake success messages. No backend required.
    const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    );
    const mailtoLink = `mailto:${EMAIL}?subject=${subject}&body=${body}`;

    setStatus('loading');
    setTimeout(() => {
      window.location.href = mailtoLink;
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    }, 600);
  };

  return (
    <section id="contact" className="py-24 relative" ref={ref}>
      <div
        className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-8 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #8b5cf6, transparent)' }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="tech-badge inline-block mb-4">Contact</span>
          <h2 className={`section-title ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="section-subtitle">
            Interested in internship opportunities, collaborations, or just want to say hi?
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            <div className="glass-card p-6">
              <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Let's Connect
              </h3>
              <p className={`text-sm leading-relaxed mb-6 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                I'm actively looking for cloud/DevOps internship opportunities. Whether you have a project in mind,
                a question, or just want to connect — feel free to reach out!
              </p>
              <div className="space-y-3">
                <SocialLink href={GITHUB_URL} icon={Github} label="GitHub — your-github-username" color="#8b5cf6" isDark={isDark} />
                <SocialLink href={LINKEDIN_URL} icon={Linkedin} label="LinkedIn — your-linkedin-username" color="#0ea5e9" isDark={isDark} />
                <SocialLink href={`mailto:${EMAIL}`} icon={Mail} label={EMAIL} color="#06b6d4" isDark={isDark} />
              </div>
            </div>

            {/* Notice */}
            <div
              className="flex items-start gap-3 p-4 rounded-xl"
              style={{
                background: 'rgba(139,92,246,0.08)',
                border: '1px solid rgba(139,92,246,0.2)',
              }}
            >
              <Mail size={16} className="text-purple-400 flex-shrink-0 mt-0.5" />
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                The form uses a <span className="text-purple-400 font-medium">mailto fallback</span> — it opens your email client with the message pre-filled. No backend required, no data is stored.
              </p>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="glass-card p-6 sm:p-8">
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                    style={{ background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)' }}
                  >
                    <CheckCircle size={28} className="text-emerald-400" />
                  </div>
                  <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Email Client Opened!
                  </h3>
                  <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Your default email client should have opened with the message pre-filled. Send it from there!
                  </p>
                  <button
                    onClick={() => setStatus(null)}
                    className="btn-secondary mt-6 text-sm"
                    id="contact-send-another-btn"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate id="contact-form">
                  {/* Name */}
                  <div className="mb-5">
                    <label htmlFor="contact-name" className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      Your Name *
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Recruiter Name"
                      className={`form-input ${errors.name ? 'border-red-500/50' : ''}`}
                      autoComplete="name"
                    />
                    {errors.name && (
                      <p className="flex items-center gap-1 text-xs text-red-400 mt-1">
                        <AlertCircle size={12} /> {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="mb-5">
                    <label htmlFor="contact-email" className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      Email Address *
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="recruiter@company.com"
                      className={`form-input ${errors.email ? 'border-red-500/50' : ''}`}
                      autoComplete="email"
                    />
                    {errors.email && (
                      <p className="flex items-center gap-1 text-xs text-red-400 mt-1">
                        <AlertCircle size={12} /> {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div className="mb-6">
                    <label htmlFor="contact-message" className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      Message *
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Hi Anshu, I'd like to discuss a cloud internship opportunity..."
                      className={`form-input resize-none ${errors.message ? 'border-red-500/50' : ''}`}
                    />
                    {errors.message && (
                      <p className="flex items-center gap-1 text-xs text-red-400 mt-1">
                        <AlertCircle size={12} /> {errors.message}
                      </p>
                    )}
                    <p className={`text-xs mt-1 ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>
                      {form.message.length} / 500 characters
                    </p>
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={status === 'loading'}
                    className="btn-primary w-full justify-center"
                    whileHover={{ scale: status === 'loading' ? 1 : 1.02 }}
                    whileTap={{ scale: status === 'loading' ? 1 : 0.98 }}
                    id="contact-submit-btn"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Opening email client...</span>
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>Send Message</span>
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

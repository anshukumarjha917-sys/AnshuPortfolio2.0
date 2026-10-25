import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap, Target, Lightbulb, Code2, MapPin } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

function InfoPanel({ icon: Icon, title, description, color, isDark }) {
  return (
    <motion.div
      variants={fadeUp}
      className="glass-card p-4 flex items-start gap-4 group hover:border-purple-500/20 transition-all duration-300"
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
        style={{ background: `${color}18`, border: `1px solid ${color}30` }}
      >
        <Icon size={18} style={{ color }} />
      </div>
      <div>
        <h3 className={`font-semibold text-sm mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>{title}</h3>
        <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{description}</p>
      </div>
    </motion.div>
  );
}

export default function About({ isDark }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const infoPanels = [
    {
      icon: GraduationCap,
      title: 'B.Tech — Cloud Technology & Information Security',
      description: 'Studying at Sandip University (2024–2028). My curriculum covers cloud fundamentals, networking, security principles, and information systems.',
      color: '#a855f7',
    },
    {
      icon: Target,
      title: 'Career Goal: Cloud / DevOps Engineer',
      description: 'Aiming to secure a Cloud or DevOps internship where I can contribute, grow, and build real-world cloud infrastructure skills.',
      color: '#06b6d4',
    },
    {
      icon: Lightbulb,
      title: 'Learn by Building',
      description: 'I believe in hands-on learning. Every concept I study, I try to apply in a real project — from deploying on EC2 to building computer vision scripts.',
      color: '#f59e0b',
    },
    {
      icon: Code2,
      title: 'Interested In',
      description: 'AWS cloud services, Linux system administration, DevOps automation, CI/CD pipelines, and cloud security fundamentals.',
      color: '#22c55e',
    },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #8b5cf6, transparent)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Section header */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeUp}
          className="text-center mb-16"
        >
          <span className="tech-badge inline-block mb-4">About Me</span>
          <h2 className={`section-title ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Who I <span className="gradient-text">Am</span>
          </h2>
          <p className="section-subtitle">
            A motivated cloud & DevOps enthusiast learning by doing
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="flex justify-center"
          >
            <div
              className="relative w-full max-w-sm glass-card p-8 text-center"
              style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.1), rgba(6,182,212,0.05))' }}
            >
              {/* Avatar */}
              <div className="relative inline-block mb-6">
                <div
                  className="w-28 h-28 rounded-2xl mx-auto overflow-hidden p-0.5 relative group"
                  style={{
                    background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
                    boxShadow: '0 0 30px rgba(139,92,246,0.4)',
                  }}
                >
                  <img
                    src="/images/profile.jpg"
                    alt="Anshu Kumar Jha"
                    className="w-full h-full object-cover rounded-[14px]"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="w-full h-full hidden items-center justify-center text-5xl">
                    👨‍💻
                  </div>
                </div>
                {/* Status dot */}
                <div className="absolute -bottom-1 -right-1 flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium text-green-300"
                  style={{ background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)' }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  Available
                </div>
              </div>

              <h3 className={`text-2xl font-bold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Anshu Kumar Jha
              </h3>
              <p className="text-purple-400 font-medium text-sm mb-4">Cloud & DevOps Enthusiast</p>

              <div className="flex items-center justify-center gap-1.5 mb-6">
                <MapPin size={14} className="text-slate-400" />
                <span className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Sandip University, India
                </span>
              </div>

              {/* Divider */}
              <div className="neon-line mb-6" />

              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: '4', label: 'Projects' },
                  { value: '5+', label: 'AWS Services' },
                  { value: '2024', label: 'Batch' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                    <div className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Decorative corner */}
              <div className="absolute top-4 right-4 w-16 h-16 opacity-10">
                <div className="w-full h-full border-t-2 border-r-2 border-purple-400 rounded-tr-2xl" />
              </div>
              <div className="absolute bottom-4 left-4 w-16 h-16 opacity-10">
                <div className="w-full h-full border-b-2 border-l-2 border-cyan-400 rounded-bl-2xl" />
              </div>
            </div>
          </motion.div>

          {/* Right: Info Panels */}
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={stagger}
            className="flex flex-col gap-4"
          >
            {/* Intro text */}
            <motion.p
              variants={fadeUp}
              className={`text-base leading-relaxed mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}
            >
              Hi! I'm Anshu — a first-year B.Tech student specializing in{' '}
              <span className="text-purple-400 font-semibold">Cloud Technology & Information Security</span>.
              Rather than just studying theory, I build real projects to understand cloud concepts deeply.
              I've deployed on S3 and EC2, explored CI/CD, and built a computer vision project with Python.
            </motion.p>

            {infoPanels.map((panel) => (
              <InfoPanel key={panel.title} {...panel} isDark={isDark} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

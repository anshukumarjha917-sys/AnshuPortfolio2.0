import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { roadmapSkills } from '../data/skills.js';
import { ArrowRight } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function LearningRoadmap({ isDark }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="py-16 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeUp}
          className="text-center mb-12"
        >
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4"
            style={{
              background: 'rgba(6,182,212,0.12)',
              border: '1px solid rgba(6,182,212,0.3)',
              color: '#22d3ee',
            }}
          >
            Learning Roadmap
          </span>
          <h2 className={`section-title ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Currently Learning /{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(135deg, #22d3ee, #06b6d4)' }}
            >
              Next Goals
            </span>
          </h2>
          <p className="section-subtitle">
            Technologies on my active learning roadmap — not yet practiced, but coming soon
          </p>
        </motion.div>

        {/* Notice banner */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex items-start gap-3 p-4 rounded-xl mb-10 max-w-2xl mx-auto"
          style={{
            background: 'rgba(6,182,212,0.08)',
            border: '1px solid rgba(6,182,212,0.2)',
          }}
        >
          <ArrowRight size={16} className="text-cyan-400 flex-shrink-0 mt-0.5" />
          <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            These are technologies I'm planning to learn next. They are <strong className="text-cyan-400">not listed as current skills</strong> — just an honest preview of where I'm heading.
          </p>
        </motion.div>

        {/* Roadmap Grid */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={stagger}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {roadmapSkills.map((skill, i) => (
            <motion.div
              key={skill.name}
              variants={fadeUp}
              className="relative p-5 rounded-2xl overflow-hidden group transition-all duration-300 hover:-translate-y-1"
              style={{
                background: 'rgba(6,182,212,0.05)',
                border: '1px solid rgba(6,182,212,0.15)',
              }}
              whileHover={{
                borderColor: 'rgba(6,182,212,0.35)',
                boxShadow: '0 0 20px rgba(6,182,212,0.1)',
              }}
            >
              {/* Dashed future overlay */}
              <div
                className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-xs font-medium"
                style={{
                  background: 'rgba(6,182,212,0.12)',
                  border: '1px dashed rgba(6,182,212,0.4)',
                  color: '#22d3ee',
                }}
              >
                {skill.eta}
              </div>

              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl opacity-70">{skill.icon}</span>
                <h3 className={`font-semibold ${isDark ? 'text-white/80' : 'text-slate-700'}`}>
                  {skill.name}
                </h3>
              </div>
              <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                {skill.description}
              </p>

              {/* Progress bar (empty — shows "not started") */}
              <div className="mt-4">
                <div className="flex justify-between text-xs mb-1">
                  <span className={isDark ? 'text-slate-600' : 'text-slate-400'}>Progress</span>
                  <span style={{ color: '#22d3ee' }}>Upcoming</span>
                </div>
                <div className="h-1 rounded-full" style={{ background: 'rgba(6,182,212,0.1)', border: '1px dashed rgba(6,182,212,0.2)' }}>
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: '8%',
                      background: 'linear-gradient(90deg, #06b6d4, transparent)',
                      animation: 'shimmer 2s linear infinite',
                    }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { skills, skillCategories, levelColors } from '../data/skills.js';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

function SkillCard({ skill, isDark }) {
  const level = levelColors[skill.level];
  return (
    <motion.div
      variants={fadeUp}
      layout
      className="glass-card-hover p-5 flex flex-col gap-3"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3">
          <span className="text-2xl" role="img" aria-label={skill.name}>{skill.icon}</span>
          <div>
            <h3 className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {skill.name}
            </h3>
            <span className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
              {skill.category}
            </span>
          </div>
        </div>
        {/* Level badge */}
        <span className={`px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 flex-shrink-0 ${level.bg} ${level.text} border ${level.border}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${level.dot}`} />
          {skill.level}
        </span>
      </div>
      <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
        {skill.description}
      </p>
    </motion.div>
  );
}

export default function Skills({ isDark }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const filtered = activeCategory === 'All'
    ? skills
    : skills.filter(s => s.category === activeCategory);

  return (
    <section id="skills" className="py-24 relative" ref={ref}>
      <div
        className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-3xl opacity-8 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #06b6d4, transparent)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeUp}
          className="text-center mb-12"
        >
          <span className="tech-badge inline-block mb-4">Skills</span>
          <h2 className={`section-title ${isDark ? 'text-white' : 'text-slate-900'}`}>
            What I <span className="gradient-text">Know</span>
          </h2>
          <p className="section-subtitle">
            Technologies and tools I've studied or practiced hands-on
          </p>

          {/* Legend */}
          <div className="flex items-center justify-center gap-6 text-sm mt-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>Practiced (built projects with it)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>Learning (studied, exploring)</span>
            </div>
          </div>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-2 justify-center mb-10"
          role="group"
          aria-label="Filter skills by category"
        >
          {skillCategories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              id={`skill-filter-${cat.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {filtered.map((skill) => (
              <SkillCard key={skill.name} skill={skill} isDark={isDark} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { projects } from '../data/projects.js';
import { ExternalLink, Github, Eye } from 'lucide-react';
import ProjectModal from './ProjectModal.jsx';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

function TechBadge({ tech, isDark }) {
  return (
    <span className="tech-badge">{tech}</span>
  );
}

function ProjectCard({ project, isDark, onOpen }) {
  return (
    <motion.article
      variants={fadeUp}
      className="group relative glass-card overflow-hidden cursor-pointer"
      onClick={() => onOpen(project)}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onOpen(project)}
      aria-label={`View details for ${project.title}`}
      id={`project-card-${project.id}`}
    >
      {/* Top gradient bar */}
      <div
        className={`h-1 w-full bg-gradient-to-r ${project.color.replace('/20', '')}`}
        style={{ opacity: 0.7 }}
      />

      {/* Animated glow border on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        style={{
          boxShadow: `inset 0 0 0 1px ${project.glowColor}`,
          background: `radial-gradient(ellipse at top, ${project.glowColor}08, transparent 60%)`,
        }}
      />

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
            style={{
              background: `linear-gradient(135deg, ${project.glowColor}25, ${project.glowColor}10)`,
              border: `1px solid ${project.glowColor}35`,
            }}
          >
            {project.icon}
          </div>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <span className="text-xs text-slate-400">View details</span>
            <Eye size={14} className="text-purple-400" />
          </div>
        </div>

        {/* Title & Description */}
        <h3 className={`font-bold text-lg mb-2 leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
          {project.title}
        </h3>
        <p className={`text-sm leading-relaxed mb-4 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          {project.shortDesc}
        </p>

        {/* Tech Badges */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.map((tech) => (
            <TechBadge key={tech} tech={tech} isDark={isDark} />
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
          {project.hasLive && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm px-4 py-2 flex items-center gap-1.5"
              onClick={(e) => e.stopPropagation()}
              id={`project-${project.id}-live`}
              aria-label={`Live demo for ${project.title}`}
            >
              <ExternalLink size={14} />
              <span>Live Demo</span>
            </a>
          )}
          {!project.hasLive && (
            <button
              className="btn-primary text-sm px-4 py-2 flex items-center gap-1.5"
              onClick={(e) => { e.stopPropagation(); onOpen(project); }}
              id={`project-${project.id}-view`}
            >
              <Eye size={14} />
              <span>View Project</span>
            </button>
          )}
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary text-sm px-4 py-2 flex items-center gap-1.5"
            onClick={(e) => e.stopPropagation()}
            id={`project-${project.id}-github`}
            aria-label={`Source code for ${project.title}`}
          >
            <Github size={14} />
            <span>Source Code</span>
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects({ isDark }) {
  const [selectedProject, setSelectedProject] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="projects" className="py-24 relative" ref={ref}>
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-3xl opacity-5 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #8b5cf6, #06b6d4)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeUp}
          className="text-center mb-16"
        >
          <span className="tech-badge inline-block mb-4">Projects</span>
          <h2 className={`section-title ${isDark ? 'text-white' : 'text-slate-900'}`}>
            What I've <span className="gradient-text">Built</span>
          </h2>
          <p className="section-subtitle">
            Real projects I've worked on while learning cloud and DevOps concepts.
            Click any card for full details.
          </p>
        </motion.div>

        {/* Project Grid */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={stagger}
          className="grid md:grid-cols-2 gap-6"
        >
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              isDark={isDark}
              onOpen={setSelectedProject}
            />
          ))}
        </motion.div>

        {/* Placeholder note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center text-xs text-slate-500 mt-8"
        >
          * Live demo and GitHub links are placeholders — replace them with your actual URLs in{' '}
          <code className="text-purple-400">src/data/projects.js</code>
        </motion.p>
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isDark={isDark}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}

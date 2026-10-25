import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GraduationCap, BookOpen, Server, GitMerge, Eye, Briefcase } from 'lucide-react';

const timelineEvents = [
  {
    icon: GraduationCap,
    title: 'Started B.Tech — Cloud Technology & Information Security',
    subtitle: 'Sandip University',
    period: '2024',
    description: 'Enrolled in a 4-year degree program focused on cloud computing, networking, and information security fundamentals.',
    color: '#a855f7',
    status: 'completed',
  },
  {
    icon: BookOpen,
    title: 'AWS Fundamentals & IAM',
    subtitle: 'Self-Learning',
    period: '2024',
    description: 'Studied core AWS concepts — global infrastructure, IAM user creation, MFA setup, roles, and least-privilege principles.',
    color: '#06b6d4',
    status: 'completed',
  },
  {
    icon: Server,
    title: 'S3 & EC2 Hands-on Deployments',
    subtitle: 'Project Work',
    period: '2024',
    description: 'Deployed a static website on S3 and hosted a portfolio on EC2 using Nginx. Explored Linux server administration and security groups.',
    color: '#8b5cf6',
    status: 'completed',
  },
  {
    icon: GitMerge,
    title: 'CI/CD Pipeline & Version Control',
    subtitle: 'Project Work',
    period: '2024',
    description: 'Built a learning CI/CD project connecting GitHub with AWS CodeBuild and CodePipeline. Practiced git branching and pull requests.',
    color: '#f59e0b',
    status: 'completed',
  },
  {
    icon: Eye,
    title: 'Computer Vision — Hand Gesture Project',
    subtitle: 'Python Project',
    period: '2024',
    description: 'Built a real-time hand gesture volume controller using Python, OpenCV, and MediaPipe hand landmark detection.',
    color: '#22c55e',
    status: 'completed',
  },
  {
    icon: Briefcase,
    title: 'Preparing for Cloud / DevOps Internship',
    subtitle: 'Current Goal',
    period: '2025 →',
    description: 'Actively learning Docker, Kubernetes, and Terraform. Building more cloud projects and preparing applications for internship opportunities.',
    color: '#ec4899',
    status: 'active',
  },
];

export default function Journey({ isDark }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="journey" className="py-24 relative" ref={ref}>
      <div
        className="absolute top-0 left-1/4 w-72 h-72 rounded-full blur-3xl opacity-8 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #a855f7, transparent)' }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="tech-badge inline-block mb-4">My Journey</span>
          <h2 className={`section-title ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Learning <span className="gradient-text">Timeline</span>
          </h2>
          <p className="section-subtitle">
            How I've been building my cloud and DevOps skills step by step
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px"
            style={{ background: 'linear-gradient(to bottom, #8b5cf6, rgba(139,92,246,0.1))' }}
          />

          <div className="space-y-8">
            {timelineEvents.map((event, i) => {
              const Icon = event.icon;
              const isLeft = i % 2 === 0;

              return (
                <motion.div
                  key={event.title}
                  initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.12, duration: 0.5 }}
                  className={`relative flex items-start gap-6 md:gap-0 ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Icon node (centered on md+) */}
                  <div className="relative z-10 flex-shrink-0 md:absolute md:left-1/2 md:-translate-x-1/2">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{
                        background: `${event.color}20`,
                        border: `2px solid ${event.color}50`,
                        boxShadow: event.status === 'active' ? `0 0 16px ${event.color}40` : 'none',
                      }}
                    >
                      <Icon size={20} style={{ color: event.color }} />
                    </div>
                    {event.status === 'active' && (
                      <span
                        className="absolute -top-1 -right-1 w-3 h-3 rounded-full animate-pulse"
                        style={{ background: event.color }}
                      />
                    )}
                  </div>

                  {/* Content card */}
                  <div className={`flex-1 pl-0 md:pl-0 ${isLeft ? 'md:pr-16' : 'md:pl-16'} md:max-w-[calc(50%-40px)]`}>
                    <div
                      className="glass-card p-5 hover:border-purple-500/20 transition-all duration-300"
                      style={{
                        borderLeft: event.status === 'active' ? `3px solid ${event.color}` : undefined,
                      }}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className={`font-bold text-sm leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          {event.title}
                        </h3>
                        <span
                          className="px-2 py-0.5 rounded-full text-xs font-semibold flex-shrink-0"
                          style={{
                            background: `${event.color}18`,
                            color: event.color,
                            border: `1px solid ${event.color}35`,
                          }}
                        >
                          {event.period}
                        </span>
                      </div>
                      <p className="text-xs text-purple-400 font-medium mb-2">{event.subtitle}</p>
                      <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        {event.description}
                      </p>
                      {event.status === 'active' && (
                        <div className="flex items-center gap-1.5 mt-3">
                          <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" />
                          <span className="text-xs text-pink-400 font-medium">Currently active</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Spacer for opposite side on md+ */}
                  <div className="hidden md:block flex-1" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

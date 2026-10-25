export const skillCategories = ['All', 'Cloud & AWS', 'Linux & Tools', 'Programming', 'Networking'];

export const skills = [
  // Cloud & AWS
  {
    name: 'AWS Fundamentals',
    icon: '☁️',
    category: 'Cloud & AWS',
    level: 'Learning',
    description: 'Core AWS concepts, global infrastructure, IAM, and service overview.',
  },
  {
    name: 'Amazon S3',
    icon: '🪣',
    category: 'Cloud & AWS',
    level: 'Practiced',
    description: 'Static hosting, bucket policies, access control, and storage classes.',
  },
  {
    name: 'Amazon EC2',
    icon: '🖥️',
    category: 'Cloud & AWS',
    level: 'Practiced',
    description: 'Instance launch, AMIs, key pairs, Security Groups, and SSH access.',
  },
  {
    name: 'Amazon VPC',
    icon: '🔒',
    category: 'Cloud & AWS',
    level: 'Learning',
    description: 'Subnets, routing tables, Internet Gateways, and network isolation.',
  },
  {
    name: 'IAM',
    icon: '🛡️',
    category: 'Cloud & AWS',
    level: 'Practiced',
    description: 'User creation, policies, roles, MFA setup, and least-privilege principles.',
  },
  // Linux & Tools
  {
    name: 'Linux Commands',
    icon: '🐧',
    category: 'Linux & Tools',
    level: 'Learning',
    description: 'File system navigation, permissions (chmod/chown), process management.',
  },
  {
    name: 'Git & GitHub',
    icon: '🌿',
    category: 'Linux & Tools',
    level: 'Practiced',
    description: 'Version control basics, branching, commits, pull requests.',
  },
  {
    name: 'Nginx',
    icon: '🌐',
    category: 'Linux & Tools',
    level: 'Learning',
    description: 'Basic web server setup and configuration on Ubuntu.',
  },
  // Programming
  {
    name: 'HTML & CSS',
    icon: '🎨',
    category: 'Programming',
    level: 'Practiced',
    description: 'Building responsive static websites and UI layouts.',
  },
  {
    name: 'JavaScript',
    icon: '⚡',
    category: 'Programming',
    level: 'Learning',
    description: 'Fundamentals: DOM manipulation, functions, events, and ES6 basics.',
  },
  {
    name: 'Python',
    icon: '🐍',
    category: 'Programming',
    level: 'Learning',
    description: 'Core Python: data structures, OOP basics, and scripting.',
  },
  {
    name: 'OpenCV & MediaPipe',
    icon: '👁️',
    category: 'Programming',
    level: 'Practiced',
    description: 'Real-time video processing and hand landmark detection.',
  },
  // Networking
  {
    name: 'Networking Basics',
    icon: '🔗',
    category: 'Networking',
    level: 'Learning',
    description: 'IP addressing, subnetting, DNS, HTTP/HTTPS, and TCP/IP.',
  },
];

export const roadmapSkills = [
  {
    name: 'Docker',
    icon: '🐳',
    description: 'Containerization, Dockerfiles, images, and container orchestration basics.',
    eta: 'Next up',
  },
  {
    name: 'Kubernetes',
    icon: '⚙️',
    description: 'Container orchestration, pods, services, and deployments.',
    eta: 'Q1 2025',
  },
  {
    name: 'Terraform',
    icon: '🏗️',
    description: 'Infrastructure as Code for provisioning cloud resources.',
    eta: 'Q1 2025',
  },
  {
    name: 'Advanced CI/CD',
    icon: '🔄',
    description: 'GitHub Actions, Jenkins pipelines, and deployment automation.',
    eta: 'Q2 2025',
  },
  {
    name: 'Advanced AWS',
    icon: '🚀',
    description: 'ECS, Lambda, CloudFormation, Route 53, and multi-region architecture.',
    eta: 'Q2 2025',
  },
  {
    name: 'Cloud Security',
    icon: '🔐',
    description: 'Security Hub, GuardDuty, compliance frameworks, and threat modeling.',
    eta: 'Q3 2025',
  },
];

export const levelColors = {
  Practiced: {
    bg: 'bg-emerald-500/15',
    border: 'border-emerald-500/30',
    text: 'text-emerald-400',
    dot: 'bg-emerald-400',
  },
  Learning: {
    bg: 'bg-blue-500/15',
    border: 'border-blue-500/30',
    text: 'text-blue-400',
    dot: 'bg-blue-400',
  },
};

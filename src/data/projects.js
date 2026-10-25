export const projects = [
  {
    id: 1,
    title: 'AWS S3 Portfolio Website',
    shortDesc: 'A static portfolio website deployed using Amazon S3 static website hosting.',
    description:
      'Deployed a personal portfolio website as a static site using Amazon S3. Configured bucket policies for public read access, enabled static website hosting, and explored content delivery concepts.',
    icon: '☁️',
    color: 'from-orange-500/20 to-amber-500/20',
    borderColor: 'border-orange-500/30',
    glowColor: 'rgba(249, 115, 22, 0.3)',
    technologies: ['AWS S3', 'HTML', 'CSS', 'JavaScript'],
    techColors: ['cyan', 'purple', 'purple', 'purple'],
    liveUrl: '#placeholder-s3-live',
    githubUrl: '#placeholder-s3-repo',
    hasLive: true,
    problem:
      'Needed a cost-effective, scalable way to host a static portfolio without managing a web server.',
    learned: [
      'How to configure S3 bucket policies for static website hosting',
      'Understanding of AWS S3 permissions and public access settings',
      'Basics of DNS and domain configuration',
      'Cost model of S3 storage and data transfer',
    ],
    improvements: [
      'Add a custom domain using Route 53',
      'Set up CloudFront CDN for HTTPS and faster global delivery',
      'Implement a CI/CD pipeline for automatic deployment on git push',
    ],
  },
  {
    id: 2,
    title: 'AWS EC2 Portfolio Hosting',
    shortDesc: 'Hosted a portfolio on an AWS EC2 instance with Linux and Nginx web server.',
    description:
      'Launched an EC2 instance (Ubuntu), set up a web server using Nginx, configured Security Groups, and deployed a portfolio website — exploring Linux system administration in a real cloud environment.',
    icon: '🖥️',
    color: 'from-violet-500/20 to-purple-500/20',
    borderColor: 'border-violet-500/30',
    glowColor: 'rgba(139, 92, 246, 0.3)',
    technologies: ['AWS EC2', 'Linux', 'Nginx', 'Ubuntu'],
    techColors: ['cyan', 'purple', 'cyan', 'purple'],
    liveUrl: '#placeholder-ec2-live',
    githubUrl: '#placeholder-ec2-repo',
    hasLive: true,
    problem:
      'Wanted to understand how cloud servers work by hosting a real website and administering a Linux VM.',
    learned: [
      'EC2 instance types, AMI selection, and key pair setup',
      'Security Group rules for HTTP, HTTPS, and SSH traffic',
      'Installing and configuring Nginx on Ubuntu',
      'Basic Linux commands for file management, permissions, and process control',
      'SSH into a remote server and deploying web content',
    ],
    improvements: [
      'Attach an Elastic IP for a stable public address',
      'Set up SSL/TLS using Let\'s Encrypt and Certbot',
      'Automate deployment with a simple shell script or GitHub Actions',
    ],
  },
  {
    id: 3,
    title: 'CI/CD Pipeline Learning Project',
    shortDesc:
      'A hands-on CI/CD exploration using GitHub, AWS CodeBuild, and AWS CodePipeline.',
    description:
      'Built a learning CI/CD pipeline to understand automated build and deployment workflows. Connected a GitHub repository to AWS CodePipeline, configured CodeBuild to run build steps, and explored deployment stage concepts.',
    icon: '⚙️',
    color: 'from-cyan-500/20 to-blue-500/20',
    borderColor: 'border-cyan-500/30',
    glowColor: 'rgba(6, 182, 212, 0.3)',
    technologies: ['GitHub', 'AWS CodeBuild', 'AWS CodePipeline', 'YAML'],
    techColors: ['purple', 'cyan', 'cyan', 'purple'],
    liveUrl: null,
    githubUrl: '#placeholder-cicd-repo',
    hasLive: false,
    problem:
      'Wanted to understand how professional teams automate testing and deployment so code changes ship faster and more reliably.',
    learned: [
      'Core CI/CD concepts: source, build, and deploy stages',
      'Writing a buildspec.yml file for AWS CodeBuild',
      'Connecting GitHub to AWS CodePipeline as a source provider',
      'Importance of automated builds in real-world development workflows',
    ],
    improvements: [
      'Add automated testing steps to the build stage',
      'Deploy to S3 or EC2 automatically on successful build',
      'Introduce environment-specific pipelines (dev, staging, prod)',
    ],
  },
  {
    id: 4,
    title: 'Hand Gesture Volume Control',
    shortDesc:
      'A computer vision project that controls laptop volume using hand gestures in real time.',
    description:
      'Built a Python application using OpenCV and MediaPipe that detects hand landmarks through a webcam and maps the distance between the index finger and thumb to the system audio volume — enabling touchless volume control.',
    icon: '✋',
    color: 'from-emerald-500/20 to-green-500/20',
    borderColor: 'border-emerald-500/30',
    glowColor: 'rgba(16, 185, 129, 0.3)',
    technologies: ['Python', 'OpenCV', 'MediaPipe', 'pycaw'],
    techColors: ['cyan', 'purple', 'cyan', 'purple'],
    liveUrl: null,
    githubUrl: '#placeholder-gesture-repo',
    hasLive: false,
    problem:
      'Wanted to explore computer vision and build something interactive — controlling a real system action with just hand movement.',
    learned: [
      'How to use MediaPipe Hands for real-time hand landmark detection',
      'OpenCV video capture, frame processing, and drawing utilities',
      'Mapping geometric distances to system-level audio controls on Windows',
      'Importance of frame rate optimization in real-time computer vision',
    ],
    improvements: [
      'Add gesture support for play/pause, skip track, and mute',
      'Improve robustness under different lighting conditions',
      'Package it as a desktop application with a system tray icon',
    ],
  },
];

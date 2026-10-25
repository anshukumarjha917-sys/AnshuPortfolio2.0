import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function CloudBackground({ isDark }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Mouse tracking for interactive cloud connection
    const mouse = { x: -1000, y: -1000, radius: 150 };
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Cloud node definition
    // Simulates distributed cloud infrastructure (VPCs, Gateways, Clusters, Servers)
    const nodeCount = Math.min(Math.floor((width * height) / 32000), 45);
    const nodes = [];

    const cloudTypes = ['gateway', 'cluster', 'database', 'server', 'shield'];
    const colorsDark = ['#06b6d4', '#8b5cf6', '#3b82f6', '#f59e0b', '#10b981'];
    const colorsLight = ['#0284c7', '#7c3aed', '#2563eb', '#d97706', '#059669'];

    for (let i = 0; i < nodeCount; i++) {
      const type = cloudTypes[i % cloudTypes.length];
      const isLargeCloud = i % 7 === 0;
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: isLargeCloud ? 18 : Math.random() * 4 + 2.5,
        isLargeCloud,
        type,
        colorIndex: i % colorsDark.length,
        pulseOffset: Math.random() * Math.PI * 2,
        pulseSpeed: 0.03 + Math.random() * 0.02,
      });
    }

    // Floating data packets moving along connections
    const packets = [];
    const maxPackets = 18;

    // Helper: Draw stylized cloud icon
    function drawCloudShape(ctx, x, y, scale, color, alpha, glow = true) {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(scale, scale);
      ctx.fillStyle = color;
      ctx.globalAlpha = alpha;

      if (glow) {
        ctx.shadowColor = color;
        ctx.shadowBlur = 14;
      }

      ctx.beginPath();
      // Smooth cloud silhouette
      ctx.arc(0, 0, 11, Math.PI * 0.5, Math.PI * 1.5);
      ctx.arc(10, -9, 12, Math.PI * 1.0, Math.PI * 1.85);
      ctx.arc(26, -7, 10, Math.PI * 1.35, Math.PI * 0.25);
      ctx.arc(21, 5, 8, Math.PI * 1.8, Math.PI * 0.5);
      ctx.closePath();
      ctx.fill();

      // Cyber inner core
      ctx.fillStyle = isDark ? '#ffffff' : '#ffffff';
      ctx.globalAlpha = alpha * 0.8;
      ctx.beginPath();
      ctx.arc(13, -2, 2.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }

    // Render loop
    let time = 0;
    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      const colors = isDark ? colorsDark : colorsLight;

      // Update positions
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;

        // Bounce gently at viewport edges
        if (n.x < 0) {
          n.x = 0;
          n.vx *= -1;
        } else if (n.x > width) {
          n.x = width;
          n.vx *= -1;
        }
        if (n.y < 0) {
          n.y = 0;
          n.vy *= -1;
        } else if (n.y > height) {
          n.y = height;
          n.vy *= -1;
        }

        // Mouse repelling/interacting wave
        const dx = mouse.x - n.x;
        const dy = mouse.y - n.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius && dist > 0) {
          const force = (mouse.radius - dist) / mouse.radius;
          n.x -= (dx / dist) * force * 1.5;
          n.y -= (dy / dist) * force * 1.5;
        }
      }

      // Draw connection lines between nearby cloud nodes
      const maxDist = 140;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const n1 = nodes[i];
          const n2 = nodes[j];
          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * (isDark ? 0.22 : 0.16);
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = colors[n1.colorIndex];
            ctx.globalAlpha = alpha;
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.restore();

            // Randomly spawn data packet between linked nodes
            if (packets.length < maxPackets && Math.random() < 0.003) {
              packets.push({
                from: n1,
                to: n2,
                progress: 0,
                speed: 0.015 + Math.random() * 0.015,
                color: colors[n1.colorIndex],
              });
            }
          }
        }

        // Line to mouse cursor if nearby
        const dxM = mouse.x - nodes[i].x;
        const dyM = mouse.y - nodes[i].y;
        const distM = Math.sqrt(dxM * dxM + dyM * dyM);
        if (distM < mouse.radius) {
          const alpha = (1 - distM / mouse.radius) * (isDark ? 0.45 : 0.35);
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = '#06b6d4';
          ctx.globalAlpha = alpha;
          ctx.lineWidth = 1.2;
          ctx.stroke();
          ctx.restore();
        }
      }

      // Draw and advance data packets
      for (let k = packets.length - 1; k >= 0; k--) {
        const p = packets[k];
        p.progress += p.speed;

        if (p.progress >= 1) {
          packets.splice(k, 1);
          continue;
        }

        const curX = p.from.x + (p.to.x - p.from.x) * p.progress;
        const curY = p.from.y + (p.to.y - p.from.y) * p.progress;

        ctx.save();
        ctx.beginPath();
        ctx.arc(curX, curY, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.globalAlpha = isDark ? 0.9 : 0.8;
        ctx.fill();
        ctx.restore();
      }

      // Draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const pulse = Math.sin(time * 3 + n.pulseOffset);
        const color = colors[n.colorIndex];

        if (n.isLargeCloud) {
          // Draw cloud icon node
          const scale = 0.55 + pulse * 0.05;
          const alpha = isDark ? 0.35 + pulse * 0.1 : 0.28 + pulse * 0.08;
          drawCloudShape(ctx, n.x - 7, n.y - 2, scale, color, alpha);
        } else {
          // Draw circular cloud infrastructure endpoint
          const currentRadius = Math.max(1, n.radius + pulse * 0.8);
          ctx.save();
          ctx.beginPath();
          ctx.arc(n.x, n.y, currentRadius, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.shadowColor = color;
          ctx.shadowBlur = 10;
          ctx.globalAlpha = isDark ? 0.6 + pulse * 0.2 : 0.45 + pulse * 0.15;
          ctx.fill();

          // Outer halo ring for primary servers
          if (i % 3 === 0) {
            ctx.beginPath();
            ctx.arc(n.x, n.y, currentRadius + 5 + pulse * 2, 0, Math.PI * 2);
            ctx.strokeStyle = color;
            ctx.globalAlpha = isDark ? 0.25 : 0.18;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
          ctx.restore();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isDark]);

  // Floating Cyber Cloud Telemetry Badges
  const cloudTelemetry = [
    { label: '☁️ AWS::ap-south-1', x: '8%', duration: 24, delay: 0 },
    { label: '⚡ EC2::Instance_Online', x: '78%', duration: 28, delay: 4 },
    { label: '🌐 CloudFront::Edge_CDN', x: '85%', duration: 26, delay: 8 },
    { label: '🔒 IAM::LeastPrivilege', x: '18%', duration: 32, delay: 2 },
    { label: '🚀 S3::Website_Hosting', x: '68%', duration: 22, delay: 11 },
    { label: '🛡️ VPC::Subnet_Guarded', x: '35%', duration: 30, delay: 6 },
    { label: '⚙️ CI/CD::Pipeline_Active', x: '52%', duration: 25, delay: 14 },
  ];

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
    >
      {/* 1. Volumetric Ethereal Cloud Blobs (Nebulae) */}
      <div
        className="absolute top-[-10%] left-[-10%] w-[55vw] h-[55vw] rounded-full blur-[130px] transition-opacity duration-700"
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(139,92,246,0.18) 0%, rgba(6,182,212,0.08) 50%, transparent 80%)'
            : 'radial-gradient(circle, rgba(147,197,253,0.3) 0%, rgba(196,181,253,0.2) 50%, transparent 80%)',
          animation: 'floatSlow 24s ease-in-out infinite alternate',
        }}
      />

      <div
        className="absolute bottom-[-15%] right-[-10%] w-[60vw] h-[60vw] rounded-full blur-[140px] transition-opacity duration-700"
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(6,182,212,0.16) 0%, rgba(139,92,246,0.1) 50%, transparent 80%)'
            : 'radial-gradient(circle, rgba(165,243,252,0.3) 0%, rgba(221,214,254,0.2) 50%, transparent 80%)',
          animation: 'floatSlow 28s ease-in-out infinite alternate-reverse',
        }}
      />

      <div
        className="absolute top-[40%] right-[20%] w-[45vw] h-[45vw] rounded-full blur-[120px] transition-opacity duration-700"
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(245,158,11,0.08) 0%, rgba(139,92,246,0.06) 60%, transparent 80%)'
            : 'radial-gradient(circle, rgba(254,215,170,0.25) 0%, transparent 70%)',
          animation: 'floatSlow 32s ease-in-out infinite alternate',
        }}
      />

      {/* 2. Interactive Cloud Network & Nodes Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
        style={{ opacity: isDark ? 0.95 : 0.75 }}
      />

      {/* 3. Floating Cyber Cloud Telemetry Stream */}
      <div className="absolute inset-0 overflow-hidden">
        {cloudTelemetry.map((item, idx) => (
          <motion.div
            key={idx}
            className={`absolute font-mono text-[10px] tracking-wider px-2.5 py-1 rounded-full border backdrop-blur-sm select-none ${
              isDark
                ? 'bg-navy-950/40 text-cyan-400/50 border-cyan-500/15'
                : 'bg-white/50 text-blue-600/60 border-blue-400/20 shadow-sm'
            }`}
            style={{ left: item.x }}
            initial={{ y: '110vh', opacity: 0 }}
            animate={{
              y: '-10vh',
              opacity: [0, 0.7, 0.7, 0],
            }}
            transition={{
              duration: item.duration,
              repeat: Infinity,
              delay: item.delay,
              ease: 'linear',
            }}
          >
            {item.label}
          </motion.div>
        ))}
      </div>

      {/* 4. Fine Digital Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(${isDark ? '#38bdf8' : '#0284c7'} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? '#38bdf8' : '#0284c7'} 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />
    </div>
  );
}

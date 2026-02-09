import React, { useEffect, useRef } from 'react';

const SNIPPETS = [
  'system.init()',
  'aws.lambda.invoke()',
  'runtime: 24/7',
  'shopify.webhook.recv()',
  'if (friction) remove(e)',
  '{{ order.metafields.r_state }}',
  'integrity_check: 100%',
  'const R = autonomous',
  'node_status: nominal',
  'await heartbeat()',
  'process.exit(0)',
  'deployment: redundant',
  'hydrogen.cache.hydrate()',
  'shopify.hydrogen.remix()',
  'aws.eventBridge.emit()'
];

const CodeStarfield: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    const resize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const getAccentColor = () => {
      const color = getComputedStyle(document.documentElement).getPropertyValue('--accent-primary').trim();
      return color || '#00FF9C';
    };

    class Particle {
      x: number;
      y: number;
      text: string;
      speed: number;
      opacity: number;
      fontSize: number;

      constructor() {
        this.x = Math.random() * (canvas?.width || 1920);
        this.y = Math.random() * (canvas?.height || 1080);
        this.text = SNIPPETS[Math.floor(Math.random() * SNIPPETS.length)];
        this.speed = 0.15 + Math.random() * 0.3;
        this.opacity = 0.05 + Math.random() * 0.1;
        this.fontSize = 9 + Math.random() * 5;
      }

      draw(color: string) {
        if (!ctx) return;
        ctx.font = `${this.fontSize}px "JetBrains Mono", monospace`;

        // Convert hex to rgba for opacity control
        let fillStyle = color;
        if (color.startsWith('#')) {
          const r = parseInt(color.slice(1, 3), 16);
          const g = parseInt(color.slice(3, 5), 16);
          const b = parseInt(color.slice(5, 7), 16);
          fillStyle = `rgba(${r}, ${g}, ${b}, ${this.opacity})`;
        } else if (color.startsWith('rgb')) {
          // If it's already rgb/rgba, we might need more complex parsing but usually it's hex or simple
          fillStyle = color.replace(')', `, ${this.opacity})`).replace('rgb', 'rgba');
        }

        ctx.fillStyle = fillStyle;
        ctx.fillText(this.text, this.x, this.y);
      }

      update() {
        this.y -= this.speed;
        if (this.y < -20) {
          this.y = (canvas?.height || 1080) + 20;
          this.x = Math.random() * (canvas?.width || 1920);
        }
      }
    }

    const init = () => {
      particles = Array.from({ length: 45 }, () => new Particle());
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const accentColor = getAccentColor();
      particles.forEach(p => {
        p.update();
        p.draw(accentColor);
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    init();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        pointerEvents: 'none',
        opacity: 0.6
      }}
    />
  );
};

export default CodeStarfield;

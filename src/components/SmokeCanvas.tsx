import { useEffect, useRef } from 'react';

export default function SmokeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    // Create initial particles
    const initParticles = () => {
      particles = [];
      const numParticles = 35; // Number of smoke clouds
      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle(canvas.width, canvas.height));
      }
    };

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      opacitySpeed: number;
      maxOpacity: number;
      colorR: number;
      colorG: number;
      colorB: number;

      constructor(canvasWidth: number, canvasHeight: number) {
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.size = Math.random() * 300 + 150; // Large puffs of smoke
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4 - 0.2; // Slowly moving up
        this.maxOpacity = Math.random() * 0.15 + 0.05;
        this.opacity = Math.random() * this.maxOpacity;
        this.opacitySpeed = (Math.random() * 0.002) + 0.001;
        
        // Gold/Blue/Dark grey tint mix
        const colors = [
          [100, 150, 255], // Soft blue (summer)
          [200, 169, 107], // Gold
          [255, 255, 255]  // White
        ];
        const color = colors[Math.floor(Math.random() * colors.length)];
        this.colorR = color[0];
        this.colorG = color[1];
        this.colorB = color[2];
      }

      update(canvasWidth: number, canvasHeight: number) {
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Gentle pulsing opacity
        this.opacity += this.opacitySpeed;
        if (this.opacity >= this.maxOpacity || this.opacity <= 0) {
          this.opacitySpeed = -this.opacitySpeed;
        }

        // Wrap around
        if (this.x > canvasWidth + this.size) this.x = -this.size;
        if (this.x < -this.size) this.x = canvasWidth + this.size;
        if (this.y > canvasHeight + this.size) this.y = -this.size;
        if (this.y < -this.size) this.y = canvasHeight + this.size;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.opacity);
        ctx.globalCompositeOperation = 'screen';
        
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size
        );
        gradient.addColorStop(0, `rgba(${this.colorR}, ${this.colorG}, ${this.colorB}, 0.8)`);
        gradient.addColorStop(0.4, `rgba(${this.colorR}, ${this.colorG}, ${this.colorB}, 0.2)`);
        gradient.addColorStop(1, `rgba(${this.colorR}, ${this.colorG}, ${this.colorB}, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update(canvas.width, canvas.height);
        particle.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', () => {
      resizeCanvas();
      initParticles();
    });
    
    resizeCanvas();
    initParticles();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 mix-blend-screen"
      style={{ filter: 'blur(20px)' }}
    />
  );
}

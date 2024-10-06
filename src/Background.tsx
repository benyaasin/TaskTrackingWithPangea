import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  baseX: number;
  baseY: number;
  density: number;
}

const Background: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const createParticles = () => {
      const numberOfParticles = 200;
      for (let i = 0; i < numberOfParticles; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particlesRef.current.push({
          x,
          y,
          size: Math.random() * 5 + 1,
          baseX: x,
          baseY: y,
          density: (Math.random() * 20) + 1  
        });
      }
    };

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particlesRef.current.length; i++) {
        let p = particlesRef.current[i];
        
        ctx.fillStyle = 'rgba(173, 216, 230, 0.5)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();

        // İmleç etkileşimi
        let dx = mousePosition.current.x - p.x;
        let dy = mousePosition.current.y - p.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let maxDistance = 200;  // Increased from 100 to 200
        let force = (maxDistance - distance) / maxDistance;
        
        // Reduce the force
        force = Math.max(force, 0) * 0.5;  // Limit force to positive values and reduce by half
        
        let directionX = forceDirectionX * force * p.density;
        let directionY = forceDirectionY * force * p.density;

        if (distance < maxDistance) {
          p.x += directionX;
          p.y += directionY;
        } else {
          if (p.x !== p.baseX) {
            let dx = p.x - p.baseX;
            p.x -= dx/20;  // Slower return to original position
          }
          if (p.y !== p.baseY) {
            let dy = p.y - p.baseY;
            p.y -= dy/20;  // Slower return to original position
          }
        }
      }

      requestAnimationFrame(animateParticles);
    };

    const handleMouseMove = (event: MouseEvent) => {
      mousePosition.current.x = event.clientX;
      mousePosition.current.y = event.clientY;
    };

    createParticles();
    animateParticles();

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: -1
      }}
    />
  );
};

export default Background;
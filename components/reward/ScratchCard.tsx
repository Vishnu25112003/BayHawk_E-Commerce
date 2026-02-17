import React, { useRef, useEffect, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  life: number;
}

interface ScratchCardProps {
  coverImage: string;
  revealImage: string;
  width?: number;
  height?: number;
  brushSize?: number;
  threshold?: number;
  onComplete?: () => void;
  className?: string;
  children?: React.ReactNode;
}

const ScratchCard: React.FC<ScratchCardProps> = ({
  coverImage,
  revealImage,
  width = 300,
  height = 200,
  brushSize = 25,
  threshold = 50,
  onComplete,
  className = '',
  children,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particleCanvasRef = useRef<HTMLCanvasElement>(null);
  const [isScratched, setIsScratched] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const particles = useRef<Particle[]>([]);
  const requestRef = useRef<number>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const img = new Image();
    img.src = coverImage;
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      ctx.drawImage(img, 0, 0, width, height);
    };
    img.onerror = () => {
      // Fallback: Fill with silver gradient if image fails to load
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, '#d1d5db');
      gradient.addColorStop(0.5, '#9ca3af');
      gradient.addColorStop(1, '#d1d5db');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
      
      // Add some "scratch here" text
      ctx.fillStyle = '#4b5563';
      ctx.font = 'bold 16px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('SCRATCH HERE', width / 2, height / 2);
    };

    // Particle animation loop
    const animateParticles = () => {
      const pCanvas = particleCanvasRef.current;
      if (!pCanvas) return;
      const pCtx = pCanvas.getContext('2d');
      if (!pCtx) return;

      pCtx.clearRect(0, 0, width, height);
      
      for (let i = 0; i < particles.current.length; i++) {
        const p = particles.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.2; // Gravity
        p.life -= 0.02;

        if (p.life <= 0) {
          particles.current.splice(i, 1);
          i--;
          continue;
        }

        pCtx.globalAlpha = p.life;
        pCtx.fillStyle = p.color;
        pCtx.beginPath();
        pCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        pCtx.fill();
      }
      
      requestRef.current = requestAnimationFrame(animateParticles);
    };

    requestRef.current = requestAnimationFrame(animateParticles);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [coverImage, width, height]);

  const createParticles = (x: number, y: number) => {
    for (let i = 0; i < 5; i++) {
      particles.current.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        size: Math.random() * 3 + 1,
        color: '#d1d5db', // Silver/Grey dust
        life: 1.0
      });
    }
  };

  const getPointerPos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    return {
      x: (clientX - rect.left) * (width / rect.width),
      y: (clientY - rect.top) * (height / rect.height),
    };
  };

  const scratch = (x: number, y: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, brushSize, 0, Math.PI * 2);
    ctx.fill();

    createParticles(x, y);
    checkScratchPercentage();
  };

  const checkScratchPercentage = () => {
    if (isScratched) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, width, height);
    const pixels = imageData.data;
    let transparentPixels = 0;

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) {
        transparentPixels++;
      }
    }

    const percentage = (transparentPixels / (width * height)) * 100;

    if (percentage >= threshold) {
      setIsScratched(true);
      if (onComplete) {
        onComplete();
      }
      if (canvas) {
        canvas.style.transition = 'opacity 0.5s ease-out';
        canvas.style.opacity = '0';
        setTimeout(() => {
          canvas.style.display = 'none';
        }, 500);
      }
    }
  };

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    const { x, y } = getPointerPos(e);
    scratch(x, y);
    
    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || isScratched) return;
    const { x, y } = getPointerPos(e);
    scratch(x, y);
    
    if (Math.random() > 0.8 && 'vibrate' in navigator) {
        navigator.vibrate(5);
    }
  };

  const handleEnd = () => {
    setIsDrawing(false);
  };

  return (
    <div 
      className={`relative overflow-hidden rounded-2xl shadow-xl border-4 border-white/50 bg-gray-200 ${className}`}
      style={{ width, height }}
    >
      {/* Revealed Content (After Image) */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${revealImage})` }}
      />

      {/* Children Content (e.g. Coupon Code) */}
      {children && (
        <div className="absolute inset-0 z-5 flex items-center justify-center pointer-events-none">
          {children}
        </div>
      )}

      {/* Premium Shine Effect */}
      <div className="absolute inset-0 pointer-events-none z-10 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent -translate-x-full animate-shimmer" />
      </div>

      {/* Particle Canvas for dust effect */}
      <canvas
        ref={particleCanvasRef}
        width={width}
        height={height}
        className="absolute inset-0 pointer-events-none z-20"
      />

      {/* Scratch Canvas Overlay */}
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="absolute inset-0 cursor-crosshair touch-none z-30"
        onMouseDown={handleStart}
        onMouseMove={handleMove}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={handleStart}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
      />
    </div>
  );
};

export default ScratchCard;
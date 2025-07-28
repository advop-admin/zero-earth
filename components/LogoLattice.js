'use client';
import { useRef, useEffect, useCallback, useMemo, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";

const LogoLattice = ({
  logoSize = 60,
  gap = 20,
  baseOpacity = 0.2,
  hoverOpacity = 1,
  transitionDuration = 0.3,
  className = "",
  style,
}) => {
  const wrapperRef = useRef(null);
  const canvasRef = useRef(null);
  const logosRef = useRef([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [backgroundLoaded, setBackgroundLoaded] = useState(false);

  // Load images
  const coloredLogo = useMemo(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = '/assets/logos/logo-colored.png';
    img.onload = () => setIsLoaded(true);
    return img;
  }, []);

  const monochromeLogo = useMemo(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = '/assets/logos/logo-monochrome.png';
    return img;
  }, []);

  const backgroundImage = useMemo(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = '/assets/images/farmer-background.jpg';
    img.onload = () => setBackgroundLoaded(true);
    return img;
  }, []);

  const buildLattice = useCallback(() => {
    const wrap = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas || !isLoaded) return;

    const { width, height } = wrap.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.scale(dpr, dpr);

    // Calculate grid for triangular tessellation
    const cellSize = logoSize + gap;
    const cols = Math.ceil((width + cellSize) / cellSize);
    const rows = Math.ceil((height + cellSize) / cellSize);

    const logos = [];
    
    // Create tessellated pattern with offset rows for triangular effect
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = col * cellSize + (row % 2) * (cellSize / 2);
        const y = row * cellSize * 0.866; // 0.866 = sin(60°)
        
        // Only add if within bounds with some padding
        if (x >= -logoSize && x <= width + logoSize && y >= -logoSize && y <= height + logoSize) {
          logos.push({
            x,
            y,
            isHovered: false,
            opacity: baseOpacity,
            rotation: Math.random() * 360, // Random rotation for variety
            scale: 0.8 + Math.random() * 0.4, // Random scale for variety
          });
        }
      }
    }

    logosRef.current = logos;
    renderLattice();
  }, [logoSize, gap, baseOpacity, isLoaded]);

  const renderLattice = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!canvas || !ctx || !isLoaded) return;

    const { width, height } = canvas.getBoundingClientRect();

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw background image if loaded
    if (backgroundLoaded && backgroundImage) {
      // Calculate aspect ratio to fit background
      const imgAspect = backgroundImage.width / backgroundImage.height;
      const canvasAspect = width / height;
      
      let drawWidth, drawHeight, drawX, drawY;
      
      if (imgAspect > canvasAspect) {
        // Image is wider than canvas
        drawHeight = height;
        drawWidth = height * imgAspect;
        drawX = (width - drawWidth) / 2;
        drawY = 0;
      } else {
        // Image is taller than canvas
        drawWidth = width;
        drawHeight = width / imgAspect;
        drawX = 0;
        drawY = (height - drawHeight) / 2;
      }
      
      ctx.drawImage(backgroundImage, drawX, drawY, drawWidth, drawHeight);
      
      // Add subtle overlay for better contrast
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.fillRect(0, 0, width, height);
    }

    // Draw logos
    logosRef.current.forEach((logo) => {
      ctx.save();
      ctx.globalAlpha = logo.opacity;
      ctx.translate(logo.x + logoSize / 2, logo.y + logoSize / 2);
      ctx.rotate((logo.rotation * Math.PI) / 180);
      ctx.scale(logo.scale, logo.scale);
      
      const img = logo.isHovered ? coloredLogo : monochromeLogo;
      ctx.drawImage(img, -logoSize / 2, -logoSize / 2, logoSize, logoSize);
      
      ctx.restore();
    });
  }, [logoSize, baseOpacity, isLoaded, backgroundLoaded, backgroundImage, coloredLogo, monochromeLogo]);

  const handleMouseMove = useCallback((e) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const hoverRadius = logoSize * 2;

    logosRef.current.forEach((logo) => {
      const distance = Math.sqrt(
        Math.pow(mouseX - (logo.x + logoSize / 2), 2) +
        Math.pow(mouseY - (logo.y + logoSize / 2), 2)
      );

      const wasHovered = logo.isHovered;
      logo.isHovered = distance < hoverRadius;

      if (logo.isHovered !== wasHovered) {
        gsap.to(logo, {
          opacity: logo.isHovered ? hoverOpacity : baseOpacity,
          scale: logo.isHovered ? 1.1 : (0.8 + Math.random() * 0.4),
          duration: transitionDuration,
          ease: "power2.out",
          onUpdate: renderLattice,
        });
      }
    });
  }, [logoSize, hoverOpacity, baseOpacity, transitionDuration]);

  const handleMouseLeave = useCallback(() => {
    logosRef.current.forEach((logo) => {
      if (logo.isHovered) {
        logo.isHovered = false;
        gsap.to(logo, {
          opacity: baseOpacity,
          scale: 0.8 + Math.random() * 0.4,
          duration: transitionDuration,
          ease: "power2.out",
          onUpdate: renderLattice,
        });
      }
    });
  }, [baseOpacity, transitionDuration]);

  // Initialize and handle resize
  useEffect(() => {
    buildLattice();
    
    const handleResize = () => {
      buildLattice();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [buildLattice]);

  // Re-render when images load
  useEffect(() => {
    if (isLoaded && backgroundLoaded) {
      renderLattice();
    }
  }, [isLoaded, backgroundLoaded, renderLattice]);

  return (
    <div
      ref={wrapperRef}
      className={`relative w-full h-full ${className}`}
      style={style}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ cursor: 'pointer' }}
      />
      {(!isLoaded || !backgroundLoaded) && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 text-white">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
            <p>Loading assets...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogoLattice; 
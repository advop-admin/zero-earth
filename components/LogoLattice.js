'use client';
import { useRef, useEffect, useCallback, useMemo, useState } from "react";
import { gsap } from "gsap";

// Throttle function for performance optimization
const throttle = (func, limit) => {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

const LogoLattice = ({
  logoSize = 50,
  baseOpacity = 0.2,
  hoverOpacity = 0.8,
  transitionDuration = 0.3,
  className = "",
  style,
}) => {
  const wrapperRef = useRef(null);
  const canvasRef = useRef(null);
  const nodesRef = useRef([]);
  const animationRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [backgroundLoaded, setBackgroundLoaded] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Detect touch device
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  // Load images with proper error handling
  const loadImage = useCallback((src, onLoad, onError) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = onLoad;
    img.onerror = onError;
    img.src = src;
    return img;
  }, []);

  const coloredLogo = useMemo(() => {
    return loadImage(
      '/assets/logos/logo-colored.png',
      () => {
        console.log('Colored logo loaded');
        setIsLoaded(true);
      },
      (e) => {
        console.error('Error loading colored logo:', e);
        setIsLoaded(true);
      }
    );
  }, [loadImage]);

  const monochromeLogo = useMemo(() => {
    return loadImage(
      '/assets/logos/logo-monochrome.png',
      () => console.log('Monochrome logo loaded'),
      (e) => console.error('Error loading monochrome logo:', e)
    );
  }, [loadImage]);

  const backgroundImage = useMemo(() => {
    return loadImage(
      '/assets/images/farmer-background.jpg',
      () => {
        console.log('Background image loaded');
        setBackgroundLoaded(true);
      },
      (e) => {
        console.error('Error loading background image:', e);
        setBackgroundLoaded(true);
      }
    );
  }, [loadImage]);

  // Create tessellating hexagonal lattice structure
  const buildTessellatingLattice = useCallback(() => {
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

    // Calculate hexagonal grid spacing
    const hexSize = logoSize * 1.2; // Space between logo centers
    const hexWidth = hexSize * Math.sqrt(3);
    const hexHeight = hexSize * 2;

    // Calculate grid dimensions with extra padding
    const cols = Math.ceil((width + hexWidth) / hexWidth) + 2;
    const rows = Math.ceil((height + hexHeight) / hexHeight) + 2;

    const nodes = [];
    
    // Create hexagonal grid of logo nodes
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        // Calculate hexagonal position
        const x = col * hexWidth + (row % 2) * (hexWidth / 2);
        const y = row * hexHeight * 0.75;
        
        // Only add if within bounds with some padding
        if (x >= -logoSize && x <= width + logoSize && y >= -logoSize && y <= height + logoSize) {
          const node = {
            id: `${row}-${col}`,
            x,
            y,
            isHovered: false,
            opacity: baseOpacity,
            rotation: Math.random() * 360,
            scale: 0.9 + Math.random() * 0.2,
          };
          nodes.push(node);
        }
      }
    }

    nodesRef.current = nodes;
    renderLattice();
  }, [logoSize, baseOpacity, isLoaded]);

  const renderLattice = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!canvas || !ctx || !isLoaded) return;

    const { width, height } = canvas.getBoundingClientRect();

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw background image if loaded
    if (backgroundLoaded && backgroundImage) {
      const imgAspect = backgroundImage.width / backgroundImage.height;
      const canvasAspect = width / height;
      
      let drawWidth, drawHeight, drawX, drawY;
      
      if (imgAspect > canvasAspect) {
        drawHeight = height;
        drawWidth = height * imgAspect;
        drawX = (width - drawWidth) / 2;
        drawY = 0;
      } else {
        drawWidth = width;
        drawHeight = width / imgAspect;
        drawX = 0;
        drawY = (height - drawHeight) / 2;
      }
      
      ctx.drawImage(backgroundImage, drawX, drawY, drawWidth, drawHeight);
      
      // Add subtle overlay for better contrast
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.fillRect(0, 0, width, height);
    }

    // Draw logo nodes only (no connecting lines)
    nodesRef.current.forEach((node) => {
      ctx.save();
      
      // Set global alpha for the logo
      ctx.globalAlpha = node.opacity;
      
      // Apply transformations
      ctx.translate(node.x + logoSize / 2, node.y + logoSize / 2);
      ctx.rotate((node.rotation * Math.PI) / 180);
      ctx.scale(node.scale, node.scale);
      
      // Choose logo based on hover state
      const img = node.isHovered ? coloredLogo : monochromeLogo;
      
      // Draw the logo
      ctx.drawImage(img, -logoSize / 2, -logoSize / 2, logoSize, logoSize);
      
      ctx.restore();
    });
  }, [logoSize, isLoaded, backgroundLoaded, backgroundImage, coloredLogo, monochromeLogo]);

  // Unified interaction handler for both mouse and touch
  const handleInteraction = useCallback((clientX, clientY) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const hoverRadius = logoSize * 0.8;

    let hasChanges = false;
    let hoveredCount = 0;

    nodesRef.current.forEach((node) => {
      const distance = Math.sqrt(
        Math.pow(x - (node.x + logoSize / 2), 2) +
        Math.pow(y - (node.y + logoSize / 2), 2)
      );

      const wasHovered = node.isHovered;
      node.isHovered = distance < hoverRadius;

      if (node.isHovered) hoveredCount++;

      if (node.isHovered !== wasHovered) {
        hasChanges = true;
        console.log(`Node ${node.id} hover state changed: ${wasHovered} -> ${node.isHovered}`);
        
        // Kill any existing animation for this node
        if (animationRef.current && animationRef.current[node.id]) {
          animationRef.current[node.id].kill();
        }
        
        // Create new animation with onUpdate callback
        const anim = gsap.to(node, {
          opacity: node.isHovered ? hoverOpacity : baseOpacity,
          scale: node.isHovered ? 1.1 : (0.9 + Math.random() * 0.2),
          duration: transitionDuration,
          ease: "power2.out",
          onUpdate: () => {
            renderLattice();
          }
        });
        
        // Store animation reference
        if (!animationRef.current) animationRef.current = {};
        animationRef.current[node.id] = anim;
      }
    });

    if (hasChanges) {
      console.log(`Hover interaction: ${hoveredCount} nodes hovered`);
      renderLattice();
    }
  }, [logoSize, hoverOpacity, baseOpacity, transitionDuration, renderLattice]);

  // Throttled interaction handler
  const throttledInteraction = useMemo(() => 
    throttle(handleInteraction, 16), // ~60fps
    [handleInteraction]
  );

  // Mouse event handlers
  const handleMouseMove = useCallback((e) => {
    console.log('Mouse move detected:', e.clientX, e.clientY);
    throttledInteraction(e.clientX, e.clientY);
  }, [throttledInteraction]);

  const handleMouseLeave = useCallback(() => {
    console.log('Mouse leave detected');
    // Reset all nodes
    let hasChanges = false;
    
    nodesRef.current.forEach((node) => {
      if (node.isHovered) {
        node.isHovered = false;
        hasChanges = true;
        
        if (animationRef.current && animationRef.current[node.id]) {
          animationRef.current[node.id].kill();
        }
        
        const anim = gsap.to(node, {
          opacity: baseOpacity,
          scale: 0.9 + Math.random() * 0.2,
          duration: transitionDuration,
          ease: "power2.out",
          onUpdate: () => {
            renderLattice();
          }
        });
        
        if (!animationRef.current) animationRef.current = {};
        animationRef.current[node.id] = anim;
      }
    });

    if (hasChanges) {
      renderLattice();
    }
  }, [baseOpacity, transitionDuration, renderLattice]);

  // --- Native touch event listeners for passive: false ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    function onTouchStart(e) {
      console.log('Touch start detected');
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        throttledInteraction(touch.clientX, touch.clientY);
      }
    }
    
    function onTouchMove(e) {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        throttledInteraction(touch.clientX, touch.clientY);
      }
    }
    
    function onTouchEnd(e) {
      console.log('Touch end detected');
      handleMouseLeave();
    }
    
    canvas.addEventListener('touchstart', onTouchStart, { passive: false });
    canvas.addEventListener('touchmove', onTouchMove, { passive: false });
    canvas.addEventListener('touchend', onTouchEnd, { passive: false });
    
    return () => {
      canvas.removeEventListener('touchstart', onTouchStart);
      canvas.removeEventListener('touchmove', onTouchMove);
      canvas.removeEventListener('touchend', onTouchEnd);
    };
  }, [throttledInteraction, handleMouseLeave]);

  // Initialize and handle resize
  useEffect(() => {
    buildTessellatingLattice();
    
    const handleResize = () => {
      buildTessellatingLattice();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      // Cleanup animations
      if (animationRef.current) {
        Object.values(animationRef.current).forEach(anim => anim.kill());
      }
    };
  }, [buildTessellatingLattice]);

  // Re-render when images load
  useEffect(() => {
    if (isLoaded && backgroundLoaded) {
      console.log('All assets loaded, rendering tessellating lattice');
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
        className="absolute inset-0 w-full h-full touch-none"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ 
          cursor: isTouchDevice ? 'default' : 'pointer',
          touchAction: 'none'
        }}
      />
      {(!isLoaded || !backgroundLoaded) && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 text-white">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
            <p>Loading tessellating lattice...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogoLattice; 
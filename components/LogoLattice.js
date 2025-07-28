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
  logoSize = 40,
  gap = 60,
  baseOpacity = 0.2,
  hoverOpacity = 1,
  transitionDuration = 0.3,
  bondOpacity = 0.3,
  className = "",
  style,
}) => {
  const wrapperRef = useRef(null);
  const canvasRef = useRef(null);
  const nodesRef = useRef([]);
  const bondsRef = useRef([]);
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
        // Fallback to monochrome if colored fails
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
        // Continue without background
        setBackgroundLoaded(true);
      }
    );
  }, [loadImage]);

  // Create covalent bond-like lattice structure
  const buildCovalentLattice = useCallback(() => {
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

    // Create hexagonal grid for covalent bond structure
    const cellSize = gap;
    const cols = Math.ceil((width + cellSize) / cellSize);
    const rows = Math.ceil((height + cellSize) / cellSize);

    const nodes = [];
    const bonds = [];
    
    // Create nodes in hexagonal pattern
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = col * cellSize + (row % 2) * (cellSize / 2);
        const y = row * cellSize * 0.866; // sin(60°)
        
        // Only add if within bounds
        if (x >= -logoSize && x <= width + logoSize && y >= -logoSize && y <= height + logoSize) {
          const node = {
            id: `${row}-${col}`,
            x,
            y,
            isHovered: false,
            opacity: baseOpacity,
            rotation: Math.random() * 360,
            scale: 0.8 + Math.random() * 0.4,
            connections: []
          };
          nodes.push(node);
        }
      }
    }

    // Create covalent bonds between adjacent nodes
    nodes.forEach((node) => {
      const [row, col] = node.id.split('-').map(Number);
      
      // Find adjacent nodes (6 directions in hexagonal grid)
      const directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],           [0, 1],
        [1, -1],  [1, 0],  [1, 1]
      ];

      directions.forEach(([dr, dc]) => {
        const targetId = `${row + dr}-${col + dc}`;
        const targetNode = nodes.find(n => n.id === targetId);
        
        if (targetNode && !bonds.some(b => 
          (b.from === node.id && b.to === targetId) || 
          (b.from === targetId && b.to === node.id)
        )) {
          const bond = {
            from: node.id,
            to: targetId,
            fromNode: node,
            toNode: targetNode,
            opacity: bondOpacity,
            isActive: false
          };
          bonds.push(bond);
          node.connections.push(bond);
        }
      });
    });

    nodesRef.current = nodes;
    bondsRef.current = bonds;
    renderLattice();
  }, [logoSize, gap, baseOpacity, bondOpacity, isLoaded]);

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
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.fillRect(0, 0, width, height);
    }

    // Draw covalent bonds first (behind logos)
    bondsRef.current.forEach((bond) => {
      const fromNode = bond.fromNode;
      const toNode = bond.toNode;
      
      if (fromNode && toNode) {
        ctx.save();
        ctx.globalAlpha = bond.opacity;
        ctx.strokeStyle = fromNode.isHovered || toNode.isHovered ? '#ffffff' : '#666666';
        ctx.lineWidth = fromNode.isHovered || toNode.isHovered ? 2 : 1;
        ctx.beginPath();
        ctx.moveTo(fromNode.x + logoSize / 2, fromNode.y + logoSize / 2);
        ctx.lineTo(toNode.x + logoSize / 2, toNode.y + logoSize / 2);
        ctx.stroke();
        ctx.restore();
      }
    });

    // Draw logos on top
    nodesRef.current.forEach((node) => {
      ctx.save();
      ctx.globalAlpha = node.opacity;
      ctx.translate(node.x + logoSize / 2, node.y + logoSize / 2);
      ctx.rotate((node.rotation * Math.PI) / 180);
      ctx.scale(node.scale, node.scale);
      
      const img = node.isHovered ? coloredLogo : monochromeLogo;
      ctx.drawImage(img, -logoSize / 2, -logoSize / 2, logoSize, logoSize);
      
      ctx.restore();
    });
  }, [logoSize, baseOpacity, isLoaded, backgroundLoaded, backgroundImage, coloredLogo, monochromeLogo]);

  // Unified interaction handler for both mouse and touch
  const handleInteraction = useCallback((clientX, clientY) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const hoverRadius = logoSize * 1.5;

    let hasChanges = false;

    nodesRef.current.forEach((node) => {
      const distance = Math.sqrt(
        Math.pow(x - (node.x + logoSize / 2), 2) +
        Math.pow(y - (node.y + logoSize / 2), 2)
      );

      const wasHovered = node.isHovered;
      node.isHovered = distance < hoverRadius;

      if (node.isHovered !== wasHovered) {
        hasChanges = true;
        
        // Kill any existing animation for this node
        if (animationRef.current && animationRef.current[node.id]) {
          animationRef.current[node.id].kill();
        }
        
        // Create new animation
        const anim = gsap.to(node, {
          opacity: node.isHovered ? hoverOpacity : baseOpacity,
          scale: node.isHovered ? 1.2 : (0.8 + Math.random() * 0.4),
          duration: transitionDuration,
          ease: "power2.out",
        });
        
        // Store animation reference
        if (!animationRef.current) animationRef.current = {};
        animationRef.current[node.id] = anim;
      }
    });

    // Update bond opacity based on connected nodes
    bondsRef.current.forEach((bond) => {
      const fromNode = bond.fromNode;
      const toNode = bond.toNode;
      const shouldBeActive = fromNode?.isHovered || toNode?.isHovered;
      
      if (bond.isActive !== shouldBeActive) {
        bond.isActive = shouldBeActive;
        hasChanges = true;
        
        gsap.to(bond, {
          opacity: shouldBeActive ? 0.8 : bondOpacity,
          duration: transitionDuration,
          ease: "power2.out",
        });
      }
    });

    if (hasChanges) {
      renderLattice();
    }
  }, [logoSize, hoverOpacity, baseOpacity, bondOpacity, transitionDuration]);

  // Throttled interaction handler
  const throttledInteraction = useMemo(() => 
    throttle(handleInteraction, 16), // ~60fps
    [handleInteraction]
  );

  // Mouse event handlers
  const handleMouseMove = useCallback((e) => {
    throttledInteraction(e.clientX, e.clientY);
  }, [throttledInteraction]);

  const handleMouseLeave = useCallback(() => {
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
          scale: 0.8 + Math.random() * 0.4,
          duration: transitionDuration,
          ease: "power2.out",
        });
        
        if (!animationRef.current) animationRef.current = {};
        animationRef.current[node.id] = anim;
      }
    });

    bondsRef.current.forEach((bond) => {
      if (bond.isActive) {
        bond.isActive = false;
        hasChanges = true;
        gsap.to(bond, {
          opacity: bondOpacity,
          duration: transitionDuration,
          ease: "power2.out",
        });
      }
    });

    if (hasChanges) {
      renderLattice();
    }
  }, [baseOpacity, bondOpacity, transitionDuration]);

  // --- Native touch event listeners for passive: false ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    function onTouchStart(e) {
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
    buildCovalentLattice();
    
    const handleResize = () => {
      buildCovalentLattice();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      // Cleanup animations
      if (animationRef.current) {
        Object.values(animationRef.current).forEach(anim => anim.kill());
      }
    };
  }, [buildCovalentLattice]);

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
            <p>Loading covalent lattice...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogoLattice; 
'use client';
import { useRef, useEffect, useCallback, useMemo, useState } from "react";
import { gsap } from "gsap";

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
  const [isLoaded, setIsLoaded] = useState(false);
  const [backgroundLoaded, setBackgroundLoaded] = useState(false);

  // Load images
  const coloredLogo = useMemo(() => {
    const img = new Image();
    img.src = '/assets/logos/logo-colored.png';
    img.onload = () => {
      console.log('Colored logo loaded');
      setIsLoaded(true);
    };
    img.onerror = (e) => {
      console.error('Error loading colored logo:', e);
    };
    return img;
  }, []);

  const monochromeLogo = useMemo(() => {
    const img = new Image();
    img.src = '/assets/logos/logo-monochrome.png';
    img.onload = () => {
      console.log('Monochrome logo loaded');
    };
    img.onerror = (e) => {
      console.error('Error loading monochrome logo:', e);
    };
    return img;
  }, []);

  const backgroundImage = useMemo(() => {
    const img = new Image();
    img.src = '/assets/images/farmer-background.jpg';
    img.onload = () => {
      console.log('Background image loaded');
      setBackgroundLoaded(true);
    };
    img.onerror = (e) => {
      console.error('Error loading background image:', e);
    };
    return img;
  }, []);

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
    nodes.forEach((node, index) => {
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

  const handleMouseMove = useCallback((e) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const hoverRadius = logoSize * 1.5;

    let hasChanges = false;

    nodesRef.current.forEach((node) => {
      const distance = Math.sqrt(
        Math.pow(mouseX - (node.x + logoSize / 2), 2) +
        Math.pow(mouseY - (node.y + logoSize / 2), 2)
      );

      const wasHovered = node.isHovered;
      node.isHovered = distance < hoverRadius;

      if (node.isHovered !== wasHovered) {
        hasChanges = true;
        gsap.to(node, {
          opacity: node.isHovered ? hoverOpacity : baseOpacity,
          scale: node.isHovered ? 1.2 : (0.8 + Math.random() * 0.4),
          duration: transitionDuration,
          ease: "power2.out",
        });
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

  const handleMouseLeave = useCallback(() => {
    let hasChanges = false;

    nodesRef.current.forEach((node) => {
      if (node.isHovered) {
        node.isHovered = false;
        hasChanges = true;
        gsap.to(node, {
          opacity: baseOpacity,
          scale: 0.8 + Math.random() * 0.4,
          duration: transitionDuration,
          ease: "power2.out",
        });
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

  // Initialize and handle resize
  useEffect(() => {
    buildCovalentLattice();
    
    const handleResize = () => {
      buildCovalentLattice();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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
        className="absolute inset-0 w-full h-full"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ cursor: 'pointer' }}
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
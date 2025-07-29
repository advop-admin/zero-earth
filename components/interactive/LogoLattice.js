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
  const isLoadedRef = useRef(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [backgroundLoaded, setBackgroundLoaded] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [loadingError, setLoadingError] = useState(false);

  // Detect touch device
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  // Improved image loading with better error handling
  const loadImage = useCallback((src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      const timeout = setTimeout(() => {
        reject(new Error(`Image load timeout: ${src}`));
      }, 10000); // 10 second timeout
      
      img.onload = () => {
        clearTimeout(timeout);
        resolve(img);
      };
      
      img.onerror = (error) => {
        clearTimeout(timeout);
        reject(new Error(`Failed to load image: ${src}`));
      };
      
      img.src = src;
    });
  }, []);

  // Load all images with proper error handling
  const [coloredLogo, monochromeLogo, backgroundImage] = useMemo(() => {
    const images = [null, null, null];
    
    // Load colored logo with cache busting
    loadImage('/assets/logos/logo-colored.png?v=1.0.1')
      .then(img => {
        images[0] = img;
        checkAllLoaded();
      })
      .catch(error => {
        console.error('Error loading colored logo:', error);
        setLoadingError(true);
      });

    // Load monochrome logo with cache busting
    loadImage('/assets/logos/logo-monochrome.png?v=1.0.1')
      .then(img => {
        images[1] = img;
        checkAllLoaded();
      })
      .catch(error => {
        console.error('Error loading monochrome logo:', error);
        setLoadingError(true);
      });

    // Load background image with cache busting
    loadImage('/assets/images/farmer-background.jpg?v=1.0.1')
      .then(img => {
        images[2] = img;
        setBackgroundLoaded(true);
        checkAllLoaded();
      })
      .catch(error => {
        console.error('Error loading background image:', error);
        setBackgroundLoaded(true); // Continue without background
      });

    function checkAllLoaded() {
      if (images[0] && images[1] && !isLoadedRef.current) {
        isLoadedRef.current = true;
        setIsLoaded(true);
      }
    }

    return images;
  }, [loadImage]);

  // Create tessellating hexagonal lattice structure
  const buildTessellatingLattice = useCallback(() => {
    const wrap = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas || !isLoaded) return;

    try {
      const { width, height } = wrap.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      // Ensure canvas dimensions are valid
      if (width <= 0 || height <= 0) return;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      
      ctx.scale(dpr, dpr);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // Calculate hexagonal grid spacing
      const hexSize = logoSize * 1.2;
      const hexWidth = hexSize * Math.sqrt(3);
      const hexHeight = hexSize * 2;

      // Calculate grid dimensions with padding
      const cols = Math.ceil((width + hexWidth) / hexWidth) + 2;
      const rows = Math.ceil((height + hexHeight) / hexHeight) + 2;

      const nodes = [];
      
      // Create hexagonal grid of logo nodes
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          // Calculate hexagonal position
          const x = col * hexWidth + (row % 2) * (hexWidth / 2);
          const y = row * hexHeight * 0.75;
          
          // Only add if within bounds with padding
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
    } catch (error) {
      console.error('Error building lattice:', error);
      setLoadingError(true);
    }
  }, [logoSize, baseOpacity, isLoaded]);

  const renderLattice = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isLoaded || !coloredLogo || !monochromeLogo) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    try {
      const { width, height } = canvas.getBoundingClientRect();

      // Clear canvas with better performance
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
        
        // Add overlay for better contrast
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.fillRect(0, 0, width, height);
      }

      // Batch render logos for better performance
      nodesRef.current.forEach((node) => {
        ctx.save();
        
        // Set global alpha
        ctx.globalAlpha = Math.max(0, Math.min(1, node.opacity));
        
        // Apply transformations
        const centerX = node.x + logoSize / 2;
        const centerY = node.y + logoSize / 2;
        
        ctx.translate(centerX, centerY);
        ctx.rotate((node.rotation * Math.PI) / 180);
        ctx.scale(node.scale, node.scale);
        
        // Choose logo based on hover state
        const img = node.isHovered ? coloredLogo : monochromeLogo;
        
        // Draw the logo with error handling
        try {
          ctx.drawImage(img, -logoSize / 2, -logoSize / 2, logoSize, logoSize);
        } catch (drawError) {
          console.warn('Error drawing logo:', drawError);
        }
        
        ctx.restore();
      });
    } catch (error) {
      console.error('Error rendering lattice:', error);
    }
  }, [logoSize, isLoaded, backgroundLoaded, backgroundImage, coloredLogo, monochromeLogo]);

  // Improved interaction handler
  const handleInteraction = useCallback((clientX, clientY) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const hoverRadius = logoSize * 0.8;

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
        
        // Kill existing animation
        if (animationRef.current?.[node.id]) {
          animationRef.current[node.id].kill();
        }
        
        // Create new animation
        const targetOpacity = node.isHovered ? hoverOpacity : baseOpacity;
        const targetScale = node.isHovered ? 1.1 : (0.9 + Math.random() * 0.2);
        
        const anim = gsap.to(node, {
          opacity: targetOpacity,
          scale: targetScale,
          duration: transitionDuration,
          ease: "power2.out",
          onUpdate: renderLattice,
          onComplete: () => {
            if (animationRef.current?.[node.id]) {
              delete animationRef.current[node.id];
            }
          }
        });
        
        // Store animation reference
        if (!animationRef.current) animationRef.current = {};
        animationRef.current[node.id] = anim;
      }
    });

    if (hasChanges) {
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
    if (!isTouchDevice) {
      throttledInteraction(e.clientX, e.clientY);
    }
  }, [throttledInteraction, isTouchDevice]);

  const handleMouseLeave = useCallback(() => {
    if (!isTouchDevice) {
      // Reset all nodes
      let hasChanges = false;
      
      nodesRef.current.forEach((node) => {
        if (node.isHovered) {
          node.isHovered = false;
          hasChanges = true;
          
          if (animationRef.current?.[node.id]) {
            animationRef.current[node.id].kill();
          }
          
          const anim = gsap.to(node, {
            opacity: baseOpacity,
            scale: 0.9 + Math.random() * 0.2,
            duration: transitionDuration,
            ease: "power2.out",
            onUpdate: renderLattice,
            onComplete: () => {
              if (animationRef.current?.[node.id]) {
                delete animationRef.current[node.id];
              }
            }
          });
          
          if (!animationRef.current) animationRef.current = {};
          animationRef.current[node.id] = anim;
        }
      });

      if (hasChanges) {
        renderLattice();
      }
    }
  }, [baseOpacity, transitionDuration, renderLattice, isTouchDevice]);

  // Touch event handlers for mobile
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isTouchDevice) return;
    
    function onTouchStart(e) {
      e.preventDefault();
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        throttledInteraction(touch.clientX, touch.clientY);
      }
    }
    
    function onTouchMove(e) {
      e.preventDefault();
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        throttledInteraction(touch.clientX, touch.clientY);
      }
    }
    
    function onTouchEnd(e) {
      e.preventDefault();
      // Reset on touch end for mobile
      setTimeout(() => {
        nodesRef.current.forEach((node) => {
          if (node.isHovered) {
            node.isHovered = false;
            gsap.to(node, {
              opacity: baseOpacity,
              scale: 0.9 + Math.random() * 0.2,
              duration: transitionDuration,
              ease: "power2.out",
              onUpdate: renderLattice
            });
          }
        });
      }, 500); // Half second delay for mobile
    }
    
    canvas.addEventListener('touchstart', onTouchStart, { passive: false });
    canvas.addEventListener('touchmove', onTouchMove, { passive: false });
    canvas.addEventListener('touchend', onTouchEnd, { passive: false });
    
    return () => {
      canvas.removeEventListener('touchstart', onTouchStart);
      canvas.removeEventListener('touchmove', onTouchMove);
      canvas.removeEventListener('touchend', onTouchEnd);
    };
  }, [throttledInteraction, baseOpacity, transitionDuration, renderLattice, isTouchDevice]);

  // Initialize and handle resize
  useEffect(() => {
    let resizeTimeout;
    
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        buildTessellatingLattice();
      }, 100); // Debounce resize
    };

    buildTessellatingLattice();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
      
      // Cleanup animations
      if (animationRef.current) {
        Object.values(animationRef.current).forEach(anim => anim.kill());
        animationRef.current = null;
      }
    };
  }, [buildTessellatingLattice]);

  // Re-render when images load
  useEffect(() => {
    if (isLoaded && backgroundLoaded) {
      renderLattice();
    }
  }, [isLoaded, backgroundLoaded, renderLattice]);

  // Error state
  if (loadingError) {
    return (
      <div className={`relative w-full h-full bg-black flex items-center justify-center ${className}`} style={style}>
        <div className="text-center text-white/60">
          <div className="w-16 h-16 border-2 border-red-400/20 border-t-red-400 rounded-full animate-spin mx-auto mb-4"></div>
          <p>Unable to load lattice assets</p>
          <p className="text-sm mt-2">Please check your connection and try again</p>
        </div>
      </div>
    );
  }

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
        style={{ 
          cursor: isTouchDevice ? 'default' : 'pointer',
          touchAction: 'none'
        }}
        aria-label="Interactive logo lattice background"
        role="img"
      />
      
      {(!isLoaded || !backgroundLoaded) && !loadingError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black text-white">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-sm">Loading tessellating lattice...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogoLattice;
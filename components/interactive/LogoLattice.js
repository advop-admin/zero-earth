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
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [loadingError, setLoadingError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect touch device and mobile screen
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      console.log('Mobile detection:', mobile, 'Width:', window.innerWidth);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Improved image loading with better error handling
  const loadImage = useCallback((src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      const timeout = setTimeout(() => {
        reject(new Error(`Image load timeout: ${src}`));
      }, 5000); // 5 second timeout for faster loading
      
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

  // Image state
  const [coloredLogo, setColoredLogo] = useState(null);
  const [monochromeLogo, setMonochromeLogo] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);

  // Load logos only once when component mounts
  useEffect(() => {
    const loadLogos = async () => {
      try {
        console.log('Loading logos...');
        
        const [colored, monochrome] = await Promise.allSettled([
          loadImage('/assets/logos/logo-colored.png?v=2.0.0'),
          loadImage('/assets/logos/logo-monochrome.png?v=2.0.0')
        ]);

        if (colored.status === 'fulfilled') setColoredLogo(colored.value);
        if (monochrome.status === 'fulfilled') setMonochromeLogo(monochrome.value);

        // Check if logos are loaded
        if (colored.status === 'fulfilled' && monochrome.status === 'fulfilled' && !isLoadedRef.current) {
          isLoadedRef.current = true;
          setIsLoaded(true);
        }

        // Handle errors
        if (colored.status === 'rejected') {
          console.error('Error loading colored logo:', colored.reason);
          setLoadingError(true);
        }
        if (monochrome.status === 'rejected') {
          console.error('Error loading monochrome logo:', monochrome.reason);
          setLoadingError(true);
        }
      } catch (error) {
        console.error('Error in logo loading:', error);
      }
    };

    loadLogos();
  }, [loadImage]);

  // Load background image when mobile state changes
  useEffect(() => {
    const loadBackground = async () => {
      try {
        const backgroundPath = isMobile 
          ? '/assets/images/farmer-background-mobile.png?v=1.0.1'
          : '/assets/images/farmer-background.png?v=1.0.1';
        
        console.log('Loading background image:', backgroundPath, 'Mobile:', isMobile);
        
        const background = await loadImage(backgroundPath);
        setBackgroundImage(background);
        console.log('Background image loaded successfully:', backgroundPath);
      } catch (error) {
        console.error('Error loading background image:', error);
        // Continue without background
      }
    };

    loadBackground();
  }, [loadImage, isMobile]);

  // Create perfect honeycomb hexagonal lattice structure
  const buildTessellatingLattice = useCallback(() => {
    const wrap = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas || !isLoaded) return;

    try {
      const { width, height } = wrap.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      console.log('Wrapper dimensions:', width, 'x', height);

      // Ensure canvas dimensions are valid - use minimum height if needed
      if (width <= 0) return;
      
      // Use viewport height if wrapper height is 0
      const finalHeight = height <= 0 ? window.innerHeight : height;
      console.log('Final canvas height:', finalHeight);

      canvas.width = width * dpr;
      canvas.height = finalHeight * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${finalHeight}px`;
      
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      
      ctx.scale(dpr, dpr);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // PERFECT HONEYCOMB GEOMETRY
      // Each logo should be treated as a circle with radius R
      // In a perfect honeycomb, circles touch exactly at their edges
      const circleRadius = logoSize / 2; // Radius of each logo circle
      
      // Distance between circle centers = 2 * radius (so circles touch exactly)
      const centerDistance = logoSize; // This ensures logos touch at their edges
      
      // For hexagonal packing, horizontal spacing = centerDistance
      // Vertical spacing = centerDistance * sin(60°) = centerDistance * √3/2
      const horizontalSpacing = centerDistance;
      const verticalSpacing = centerDistance * Math.sqrt(3) / 2;

      // Calculate grid dimensions with extra padding for seamless tiling
      const cols = Math.ceil((width + horizontalSpacing) / horizontalSpacing) + 8;
      const rows = Math.ceil((finalHeight + verticalSpacing) / verticalSpacing) + 8;

      const nodes = [];
      
      // Create perfect honeycomb grid
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          // Calculate position with proper hexagonal offset
          const x = col * horizontalSpacing + (row % 2) * (horizontalSpacing / 2);
          const y = row * verticalSpacing;
          
          // Only add if within bounds with padding
          if (x >= -logoSize && x <= width + logoSize && y >= -logoSize && y <= finalHeight + logoSize) {
            const node = {
              id: `${row}-${col}`,
              x,
              y,
              isHovered: false,
              opacity: baseOpacity,
              rotation: 0, // No rotation for perfect honeycomb alignment
              scale: 1.0, // Uniform scale for perfect honeycomb
              originalScale: 1.0,
              circleRadius,
            };
            nodes.push(node);
          }
        }
      }

      console.log(`Created ${nodes.length} nodes in perfect honeycomb lattice pattern`);
      console.log(`Circle radius: ${circleRadius}, Center distance: ${centerDistance}`);
      console.log(`Horizontal spacing: ${horizontalSpacing}, Vertical spacing: ${verticalSpacing}`);
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
      console.log('Rendering lattice - backgroundImage:', backgroundImage ? 'loaded' : 'not loaded');
      if (backgroundImage) {
        console.log('Drawing background image - dimensions:', backgroundImage.width, 'x', backgroundImage.height);
        console.log('Canvas dimensions:', width, 'x', height);
        
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
        
        console.log('Drawing background at:', drawX, drawY, drawWidth, 'x', drawHeight);
        ctx.drawImage(backgroundImage, drawX, drawY, drawWidth, drawHeight);
        
        // Add overlay for better contrast
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.fillRect(0, 0, width, height);
        console.log('Background image drawn successfully');
      } else {
        console.log('No background image to draw');
      }

      // Batch render logos for better performance with honeycomb optimization
      nodesRef.current.forEach((node) => {
        ctx.save();
        
        // Set global alpha
        ctx.globalAlpha = Math.max(0, Math.min(1, node.opacity));
        
        // Apply transformations with perfect honeycomb positioning
        const centerX = node.x + node.circleRadius;
        const centerY = node.y + node.circleRadius;
        
        ctx.translate(centerX, centerY);
        ctx.rotate((node.rotation * Math.PI) / 180);
        ctx.scale(node.scale, node.scale);
        
        // Choose logo based on hover state
        const img = node.isHovered ? coloredLogo : monochromeLogo;
        
        // Draw the logo as a perfect circle that touches neighbors
        try {
          ctx.drawImage(img, -node.circleRadius, -node.circleRadius, logoSize, logoSize);
        } catch (drawError) {
          console.warn('Error drawing logo:', drawError);
        }
        
        ctx.restore();
      });
    } catch (error) {
      console.error('Error rendering lattice:', error);
    }
  }, [logoSize, isLoaded, backgroundImage, coloredLogo, monochromeLogo]);

  // Improved interaction handler with honeycomb-aware hover detection
  const handleInteraction = useCallback((clientX, clientY) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const hoverRadius = logoSize * 0.6; // Precise hover radius for honeycomb precision

    let hasChanges = false;

    nodesRef.current.forEach((node) => {
      const distance = Math.sqrt(
        Math.pow(x - (node.x + node.circleRadius), 2) +
        Math.pow(y - (node.y + node.circleRadius), 2)
      );

      const wasHovered = node.isHovered;
      node.isHovered = distance < hoverRadius;

      if (node.isHovered !== wasHovered) {
        hasChanges = true;
        
        // Kill existing animation
        if (animationRef.current?.[node.id]) {
          animationRef.current[node.id].kill();
        }
        
        // Create new animation with honeycomb-optimized effects
        const targetOpacity = node.isHovered ? hoverOpacity : baseOpacity;
        const targetScale = node.isHovered ? 1.3 : node.originalScale; // Subtle scale for clean honeycomb effect
        
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
            scale: node.originalScale,
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
      // Don't prevent default to allow scrolling
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        throttledInteraction(touch.clientX, touch.clientY);
      }
    }
    
    function onTouchMove(e) {
      // Don't prevent default to allow scrolling
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        throttledInteraction(touch.clientX, touch.clientY);
      }
    }
    
    function onTouchEnd(e) {
      // Don't prevent default to allow scrolling
      // Reset on touch end for mobile
      setTimeout(() => {
        nodesRef.current.forEach((node) => {
          if (node.isHovered) {
            node.isHovered = false;
            gsap.to(node, {
              opacity: baseOpacity,
              scale: node.originalScale,
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
    let initTimeout;
    
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        buildTessellatingLattice();
      }, 100); // Debounce resize
    };

    // Initial setup with retry
    const initLattice = () => {
      buildTessellatingLattice();
      
      // Retry after a short delay if canvas height is still 0
      initTimeout = setTimeout(() => {
        const canvas = canvasRef.current;
        if (canvas && canvas.height === 0) {
          console.log('Canvas height is 0, retrying initialization...');
          buildTessellatingLattice();
        }
      }, 500);
    };

    initLattice();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
      clearTimeout(initTimeout);
      
      // Cleanup animations
      if (animationRef.current) {
        Object.values(animationRef.current).forEach(anim => anim.kill());
        animationRef.current = null;
      }
    };
  }, [buildTessellatingLattice]);

  // Re-render when images load
  useEffect(() => {
    if (isLoaded) {
      renderLattice();
    }
  }, [isLoaded, renderLattice]);

  // Re-render when background image changes
  useEffect(() => {
    if (isLoaded && backgroundImage) {
      console.log('Background image changed, re-rendering...');
      renderLattice();
    }
  }, [backgroundImage, isLoaded, renderLattice]);

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
      style={{
        ...style,
        minHeight: '100vh',
        height: '100%'
      }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-10"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ 
          cursor: isTouchDevice ? 'default' : 'pointer',
          touchAction: 'auto',
          pointerEvents: 'auto'
        }}
        aria-label="Interactive logo lattice background"
        role="img"
      />
      
      {/* Removed loading spinner for better performance */}
    </div>
  );
};

export default LogoLattice;
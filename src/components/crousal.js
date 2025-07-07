import React, { useState, useEffect, useRef } from 'react';

// Utility to preload all images
const preloadImages = (srcArray) => {
  return Promise.all(
    srcArray.map((src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve;
        img.onerror = reject;
      });
    })
  );
};

const App = () => {
  const images = [
    '/images/Indeed.png',
    '/images/IBM.png',
    '/images/LinkedIn.png',
    '/images/Nvidia.png',
    '/images/Naukari.png',
  ];

  const duplicatedImages = [...images, ...images]; // for infinite scroll
  const scrollRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [contentWidth, setContentWidth] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const scrollSpeed = 0.5; // Slower for smooth effect

  // Preload images and calculate width
  useEffect(() => {
    preloadImages(images).then(() => {
      setIsLoaded(true);
      setTimeout(() => {
        const scrollContent = scrollRef.current;
        if (scrollContent) {
          const width = Array.from(scrollContent.children)
            .slice(0, images.length) // Only one set
            .reduce((sum, child) => sum + child.offsetWidth, 0);
          setContentWidth(width);
        }
      }, 100); // Small delay to ensure DOM is ready
    });
  }, []);

  // Animate scroll
  useEffect(() => {
    if (!isLoaded || contentWidth === 0) return;

    let animationFrameId;

    const animate = () => {
      setScrollPosition((prev) => {
        const next = prev + scrollSpeed;
        return next >= contentWidth ? 0 : next;
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isLoaded, contentWidth]);

  return (
    <div className="flex items-center justify-center bg-transparent font-inter">
      <div className="relative w-full overflow-hidden bg-transparent">
        <div className="relative overflow-hidden py-6 bg-transparent">
          <div
            ref={scrollRef}
            className="flex whitespace-nowrap"
            style={{
              transform: `translateX(-${scrollPosition}px)`,
              willChange: 'transform',
              transition: 'none',
            }}
          >
            {duplicatedImages.map((src, index) => (
              <div
                key={index}
                className="flex-shrink-0 flex items-center justify-center px-6"
                style={{ height: '100px' }}
              >
                <img
                  src={src}
                  alt={src.split('/').pop().replace('.png', '')}
                  className="h-16 md:h-20 object-contain select-none"
                  draggable="false"
                  style={{ maxWidth: '180px', minWidth: '120px' }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

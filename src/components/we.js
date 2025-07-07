import React, { useState, useEffect, useRef } from 'react';

const phrases = [
  'DOING',
  'SERVICES',
  'USING AI',
  'ALWAYS FOR YOU.'
];

const WeScrollAnimationPage = ({ setCurrentPage }) => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const animationContainerRef = useRef(null);
  const scrollCountRef = useRef(0);
  const lastScrollDirectionRef = useRef(null);

  // Wheel event logic
  useEffect(() => {
    const handleWheel = (e) => {
      if (animationContainerRef.current) {
        const rect = animationContainerRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        // Check if the section is fully covering the viewport
        const isFullyCoveringViewport =
          rect.top <= 50 &&
          rect.bottom >= viewportHeight - 50 &&
          rect.height >= viewportHeight * 0.8;
        if (isFullyCoveringViewport) {
          const newDirection = e.deltaY > 0 ? 'down' : 'up';
          // Reset scroll count if direction changes
          if (lastScrollDirectionRef.current !== newDirection) {
            scrollCountRef.current = 0;
          }
          lastScrollDirectionRef.current = newDirection;
          scrollCountRef.current += 1;
          const isAtStartAndScrollingUp = currentPhraseIndex === 0 && e.deltaY < 0;
          const isAtEndAndScrollingDown = currentPhraseIndex === phrases.length - 1 && e.deltaY > 0;
          // Prevent default scroll if not at the start/end
          if (!isAtStartAndScrollingUp && !isAtEndAndScrollingDown) {
            e.preventDefault();
          }
          // Only change phrase after 3 scrolls in the same direction
          if (scrollCountRef.current >= 3) {
            if (e.deltaY > 0) {
              setCurrentPhraseIndex((prev) => Math.min(prev + 1, phrases.length - 1));
            } else if (e.deltaY < 0) {
              setCurrentPhraseIndex((prev) => Math.max(prev - 1, 0));
            }
            scrollCountRef.current = 0;
          }
        }
      }
    };
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [currentPhraseIndex]);

  // Lock scroll when not at start or end
  useEffect(() => {
    const section = animationContainerRef.current;
    if (
      section &&
      currentPhraseIndex !== 0 &&
      currentPhraseIndex !== phrases.length - 1
    ) {
      section.scrollIntoView({ behavior: 'auto', block: 'start' });
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [currentPhraseIndex]);

  return (
    <div className="bg-black text-white font-inter min-h-screen flex flex-col">
      <section
        id="animation-section"
        ref={animationContainerRef}
        className="min-h-screen flex items-center relative overflow-hidden flex-grow"
      >
        <div className="flex w-full max-w-6xl mx-auto px-4">
          {/* Left: WE */}
          <div className="flex-shrink-0 flex items-center justify-end pr-4 md:pr-8" style={{ width: '20%' }}>
            <span className="text-6xl md:text-8xl font-extrabold select-none">
              WE
            </span>
          </div>
          {/* Right: Dynamic phrases */}
          <div className="relative flex-grow h-20 md:h-24 overflow-hidden flex items-center pl-4 md:pl-8">
            {phrases.map((phrase, index) => (
              <span
                key={index}
                className={`absolute text-6xl md:text-8xl font-extrabold whitespace-nowrap transition-all duration-500 ease-in-out select-none
                  ${index === currentPhraseIndex
                    ? 'opacity-100 translate-y-0'
                    : index < currentPhraseIndex
                      ? 'opacity-0 -translate-y-full'
                      : 'opacity-0 translate-y-full'
                  }`}
              >
                {phrase}
              </span>
            ))}
          </div>
        </div>
      </section>
      {/* Back to Home button */}
      <div className="text-center py-8">
        <button
          onClick={() => setCurrentPage('home')}
          className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default WeScrollAnimationPage;

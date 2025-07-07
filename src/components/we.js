import React, { useState, useEffect, useRef } from 'react';

const WeScrollAnimationPage = ({ setCurrentPage }) => {
  // Array of phrases to be animated
  const phrases = [
    "DOING",
    "SERVICES",
    "USING AI",
    "ALWAYS FOR YOU."
  ];

  // State to keep track of the currently displayed phrase's index
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  // Ref to the main animation container to check its visibility in the viewport
  const animationContainerRef = useRef(null);

  // New refs for scroll counting and direction
  const scrollCountRef = useRef(0); // Counts consecutive scroll events
  const lastScrollDirectionRef = useRef(null); // Stores 'up' or 'down'

  useEffect(() => {
    // Function to handle mouse wheel events
    const handleWheel = (e) => {
      // Check if the animation container exists
      if (animationContainerRef.current) {
        const rect = animationContainerRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // Define a threshold for "fully covers the screen"
        const isFullyCoveringViewport =
          rect.top <= 50 && // Top is within 50px of viewport top
          rect.bottom >= viewportHeight - 50 && // Bottom is within 50px of viewport bottom
          rect.height >= viewportHeight * 0.8; // And its height is at least 80% of viewport height

        if (isFullyCoveringViewport) {
          const newDirection = e.deltaY > 0 ? 'down' : 'up';

          // If direction changes, reset the scroll count
          if (lastScrollDirectionRef.current !== newDirection) {
            scrollCountRef.current = 0;
          }
          lastScrollDirectionRef.current = newDirection;

          // Increment the scroll count
          scrollCountRef.current += 1;

          const isAtStartAndScrollingUp = currentPhraseIndex === 0 && e.deltaY < 0;
          const isAtEndAndScrollingDown = currentPhraseIndex === phrases.length - 1 && e.deltaY > 0;

          // Prevent default page scroll ONLY if we are within the animation bounds
          // This allows natural page scroll when at the very beginning or very end of the animation sequence
          if (!isAtStartAndScrollingUp && !isAtEndAndScrollingDown) {
            e.preventDefault(); // Prevent default browser scroll
          }

          // Only change phrase after 3 scroll events in the same direction
          if (scrollCountRef.current >= 3) {
            if (e.deltaY > 0) { // Scrolling down
              setCurrentPhraseIndex((prevIndex) =>
                Math.min(prevIndex + 1, phrases.length - 1) // Increment, but not beyond last phrase
              );
            } else if (e.deltaY < 0) { // Scrolling up
              setCurrentPhraseIndex((prevIndex) =>
                Math.max(prevIndex - 1, 0) // Decrement, but not below first phrase
              );
            }
            // Reset the counter after a phrase change
            scrollCountRef.current = 0;
          }
        }
      }
    };

    // Add the wheel event listener to the window
    // { passive: false } is crucial to allow e.preventDefault() to work
    window.addEventListener('wheel', handleWheel, { passive: false });

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [currentPhraseIndex, phrases.length]); // Re-run effect if currentPhraseIndex or phrases change

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
  }, [currentPhraseIndex, phrases.length]);

  return (
    <div className="bg-black text-white font-inter min-h-screen flex flex-col">
      {/* Main Animation Section */}
      <section
        id="animation-section"
        ref={animationContainerRef}
        // min-h-screen ensures this section takes at least the full viewport height
        // flex and items-center center the content vertically
        // relative and overflow-hidden are for positioning and clipping the animating text
        className="min-h-screen flex items-center relative overflow-hidden flex-grow"
      >
        <div className="flex w-full max-w-6xl mx-auto px-4"> {/* Container for two columns, centered with max-width */}
          {/* Left Column for "WE" */}
          <div className="flex-shrink-0 flex items-center justify-end pr-4 md:pr-8" style={{ width: '20%' }}> {/* Adjusted width and padding */}
            <span className="text-6xl md:text-8xl font-extrabold select-none">
              WE
            </span>
          </div>

          {/* Right Column for dynamic phrases */}
          <div className="relative flex-grow h-20 md:h-24 overflow-hidden flex items-center pl-4 md:pl-8"> {/* Adjusted height and padding */}
            {phrases.map((phrase, index) => (
              <span
                key={index}
                // absolute positioning for overlapping phrases
                // whitespace-nowrap keeps the phrase on a single line
                // transition-all duration-500 ease-in-out provides the smooth animation
                // select-none prevents text selection and cursor blinking
                className={`absolute text-6xl md:text-8xl font-extrabold whitespace-nowrap transition-all duration-500 ease-in-out select-none
                  ${index === currentPhraseIndex
                    ? 'opacity-100 translate-y-0' // Current phrase: fully visible, no vertical offset
                    : index < currentPhraseIndex
                      ? 'opacity-0 -translate-y-full' // Previous phrases: hidden, moved up
                      : 'opacity-0 translate-y-full' // Next phrases: hidden, moved down
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

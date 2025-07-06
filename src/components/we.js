import React, { useState, useEffect, useRef } from 'react';

const App = () => {
  // Array of phrases to be animated
  const phrases = [
    "doing",
    "services",
    "using ai",
    "always for you."
  ];

  // State to keep track of the currently displayed phrase's index
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  // Ref to the main animation container to check its visibility in the viewport
  const animationContainerRef = useRef(null);

  useEffect(() => {
    // Function to handle mouse wheel events
    const handleWheel = (e) => {
      // Check if the animation container exists and is currently in the viewport
      if (animationContainerRef.current) {
        const rect = animationContainerRef.current.getBoundingClientRect();
        // Determine if any part of the animation section is visible
        const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;

        if (isInViewport) {
          // Determine if the user is trying to scroll beyond the animation limits
          const isAtStartAndScrollingUp = currentPhraseIndex === 0 && e.deltaY < 0;
          const isAtEndAndScrollingDown = currentPhraseIndex === phrases.length - 1 && e.deltaY > 0;

          // If not at the limits, prevent default page scroll to handle animation
          if (!isAtStartAndScrollingUp && !isAtEndAndScrollingDown) {
            e.preventDefault();
          }

          // Update the phrase index based on scroll direction
          if (e.deltaY > 0) { // Scrolling down
            setCurrentPhraseIndex((prevIndex) =>
              Math.min(prevIndex + 1, phrases.length - 1) // Increment, but not beyond last phrase
            );
          } else { // Scrolling up
            setCurrentPhraseIndex((prevIndex) =>
              Math.max(prevIndex - 1, 0) // Decrement, but not below first phrase
            );
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

  return (
    <div className="bg-black text-white font-inter">
      {/* Main Animation Section */}
      <section
        id="animation-section"
        ref={animationContainerRef}
        // min-h-screen ensures this section takes at least the full viewport height
        // flex and items-center center the content vertically
        // relative and overflow-hidden are for positioning and clipping the animating text
        className="min-h-screen flex items-center relative overflow-hidden"
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
                // transition-all duration-500 ease-out provides the smooth animation
                // select-none prevents text selection and cursor blinking
                className={`absolute text-6xl md:text-8xl font-extrabold whitespace-nowrap transition-all duration-500 ease-out select-none
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

      
    </div>
  );
};

export default App;

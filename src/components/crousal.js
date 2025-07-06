import React, { useState, useEffect, useRef } from 'react';

// Main App component for the text carousel
const App = () => {
  // Array of text data for the carousel
  const texts = [
    "cu",
    "crosseye",
    "crossTech",
    "agenticHireX"
  ];

  // Ref to the inner scrolling container to measure its width
  const scrollRef = useRef(null);
  // State to hold the current scroll position (translateX value)
  const [scrollPosition, setScrollPosition] = useState(0);

  // Speed of the scroll in pixels per frame (adjust for desired speed)
  const scrollSpeed = 0.5; // Controls how fast the text scrolls

  useEffect(() => {
    let animationFrameId;
    const scrollContent = scrollRef.current;

    const animateScroll = () => {
      if (scrollContent) {
        // We duplicate the content to create a seamless loop.
        // The 'loopPoint' is the width of one full set of the original texts.
        // When the scroll position reaches this point, it resets to 0,
        // making the duplicated content appear as the original content.
        const contentWidth = scrollContent.scrollWidth / 2; // Assuming content is duplicated once

        setScrollPosition((prevPos) => {
          let newPos = prevPos + scrollSpeed;

          // If the scroll position exceeds the width of the first set of content,
          // reset it back to 0 to create the seamless loop.
          if (newPos >= contentWidth) {
            newPos = 0;
          }
          return newPos;
        });
      }
      animationFrameId = requestAnimationFrame(animateScroll);
    };

    // Start the animation loop
    animationFrameId = requestAnimationFrame(animateScroll);

    // Cleanup function to cancel the animation frame when the component unmounts
    return () => cancelAnimationFrame(animationFrameId);
  }, [scrollSpeed]); // Re-run effect if scrollSpeed changes

  // To make the loop truly seamless, we need to render the texts at least twice.
  // This ensures that as the first set scrolls out of view, the second set
  // is already scrolling in, creating the illusion of an infinite loop.
  const duplicatedTexts = [...texts, ...texts];

  return (
    // Removed min-h-screen to allow the page height to match content height
    <div className="flex items-center justify-center bg-gray-100 p-4 font-inter">
      {/* Changed max-w-4xl to w-full to make it full width */}
      <div className="relative w-full bg-white shadow-xl rounded-lg overflow-hidden">
        {/* Carousel container for text - Removed fixed height classes */}
        <div className="relative overflow-hidden py-4"> {/* Added vertical padding for spacing */}
          {/* Inner container for sliding text - Removed h-full */}
          {/* Uses flex to lay out items horizontally and whitespace-nowrap to keep them on one line */}
          {/* The transform property is dynamically updated to create the scrolling effect */}
          <div
            ref={scrollRef} // Attach ref to measure the total width of the content
            className="flex whitespace-nowrap" // Removed h-full
            style={{ transform: `translateX(-${scrollPosition}px)` }}
          >
            {duplicatedTexts.map((text, index) => (
              <div
                key={index} // Using index as key, consider a more unique key if texts can be identical
                // flex-shrink-0 ensures items don't shrink and maintain their natural width
                // px-4 adds horizontal padding to each text item
                className="flex-shrink-0 flex items-center justify-center text-center px-4"
              >
                {/* Added user-select-none to prevent text selection and cursor blinking */}
                <p className="text-5xl md:text-7xl font-extrabold text-gray-800 select-none">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons and Dot Indicators are removed for continuous scroll */}
      </div>
    </div>
  );
};

export default App;

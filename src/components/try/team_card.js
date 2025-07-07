import React, { useState } from 'react';

// Define the card data with front and back image URLs, and new details for the back face
const cardData = [
  {
    id: 1,
    frontImg: "https://i.loli.net/2019/11/23/cnKl1Ykd5rZCVwm.jpg",
    backImg: "https://i.loli.net/2019/11/16/cqyJiYlRwnTeHmj.jpg", // This image will be behind the text, or can be removed
    name: "Alice Johnson",
    description: "Lead Developer with expertise in front-end frameworks and UI/UX design.",
  },
  {
    id: 2,
    frontImg: "https://i.loli.net/2019/11/16/FLnzi5Kq4tkRZSm.jpg",
    backImg: "https://i.loli.net/2019/10/18/buDT4YS6zUMfHst.jpg",
    name: "Bob Williams",
    description: "Senior Product Manager, focused on delivering innovative solutions and user satisfaction.",
  },
  {
    id: 3,
    frontImg: "https://i.loli.net/2019/10/18/uXF1Kx7lzELB6wf.jpg",
    backImg: "https://i.loli.net/2019/11/03/RtVq2wxQYySDb8L.jpg",
    name: "Charlie Brown",
    description: "Creative Designer, bringing concepts to life with stunning visuals and engaging experiences.",
  },
  { // New fourth card
    id: 4,
    frontImg: "https://i.loli.net/2019/11/23/cnKl1Ykd5rZCVwm.jpg", // Using a placeholder, replace with actual image
    backImg: "https://i.loli.net/2019/11/16/cqyJiYlRwnTeHmj.jpg", // Using a placeholder, replace with actual image
    name: "Diana Miller",
    description: "Marketing Specialist, driving brand awareness and customer engagement.",
  },
];

// Card Component: Represents a single flippable card
const Card = ({ frontImg, backImg, name, description }) => {
  // State to manage whether the card is flipped or not
  const [isFlipped, setIsFlipped] = useState(false);

  // Function to handle mouse entering the card (flips to back)
  const handleMouseEnter = () => {
    setIsFlipped(true);
  };

  // Function to handle mouse leaving the card (flips back to front)
  const handleMouseLeave = () => {
    setIsFlipped(false);
  };

  return (
    // The main card container.
    // Increased width and height from w-60 h-72 to w-64 h-80 for larger images and better fit.
    // Transition duration is kept at 1000ms for smoothness.
    <div
      className="relative w-64 h-80 text-white cursor-pointer transition-transform duration-1000 ease-in-out"
      style={{
        transformStyle: 'preserve-3d',
        transform: isFlipped ? 'rotateY(0.5turn)' : 'rotateY(0deg)',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Front face of the card */}
      <div
        className="absolute top-0 left-0 w-full h-full backface-hidden"
        style={{ backfaceVisibility: 'hidden' }} // Hide back face when rotated away
      >
        <img
          src={frontImg}
          alt="Card Front"
          className="w-full h-full object-cover rounded-lg shadow-lg"
          // Fallback image in case the main image fails to load
          onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/256x320/cccccc/333333?text=Front+Image+Error"; }}
        />
      </div>

      {/* Back face of the card - now contains text details */}
      <div
        className="absolute top-0 left-0 w-full h-full backface-hidden bg-gray-800 rounded-lg shadow-lg
                   flex flex-col justify-center items-center p-4 text-center"
        style={{
          transform: 'rotateY(0.5turn)', // Initially rotated to show back when parent is flipped
          backfaceVisibility: 'hidden',   // Hide back face when rotated away
        }}
      >
        {/* Optional: You can keep the back image as a background or remove it */}
        {/* <img
          src={backImg}
          alt="Card Back Background"
          className="absolute inset-0 w-full h-full object-cover opacity-30 rounded-lg"
          onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/256x320/999999/ffffff?text=Back+Image+Error"; }}
        /> */}
        <h3 className="text-xl font-bold text-white mb-2 z-10">{name}</h3>
        <p className="text-sm text-gray-300 z-10">{description}</p>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-white font-inter p-14">
      {/* Our Team Heading */}
      <h1 className="text-7xl font-extrabold text-black mb-12 mt-8">Our Team</h1>

      {/* Scene container with perspective for 3D effect */}
      <div
        className="w-full flex flex-row justify-center gap-6 overflow-x-auto p-4 overflow-hidden" // Changed to flex-row and added overflow-x-auto
        style={{ perspective: '800px' }}
      >
        {cardData.map((card) => (
          <Card
            key={card.id}
            frontImg={card.frontImg}
            backImg={card.backImg}
            name={card.name}
            description={card.description}
          />
        ))}
      </div>
    </div>
  );
};

export default App;

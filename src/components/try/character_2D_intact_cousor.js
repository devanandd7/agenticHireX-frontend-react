import React, { useState, useEffect, useRef } from 'react';

// Removed the Character interface as it's TypeScript specific
// interface Character {
//   id: number;
//   x: number;
//   y: number;
//   targetX: number;
//   targetY: number;
//   speed: number;
//   delay: number;
//   type: 'woman1' | 'man1' | 'man2' | 'woman2' | 'man3';
//   eyeDirection: { x: number; y: number };
// }

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  // Initial characters array, no type annotation needed in JS
  const [characters, setCharacters] = useState([]);
  const animationRef = useRef(); // Removed <number>
  const mouseRef = useRef({ x: 0, y: 0 });

  // Initialize characters
  useEffect(() => {
    // Removed Character[] type annotation
    const initialCharacters = [
      {
        id: 1,
        x: 200,
        y: 300,
        targetX: 200,
        targetY: 300,
        speed: 0.02,
        delay: 0,
        type: 'woman1',
        eyeDirection: { x: 0, y: 0 }
      },
      {
        id: 2,
        x: 350,
        y: 350,
        targetX: 350,
        targetY: 350,
        speed: 0.025,
        delay: 100,
        type: 'man1',
        eyeDirection: { x: 0, y: 0 }
      },
      {
        id: 3,
        x: 500,
        y: 280,
        targetX: 500,
        targetY: 280,
        speed: 0.018,
        delay: 200,
        type: 'man2',
        eyeDirection: { x: 0, y: 0 }
      },
      {
        id: 4,
        x: 650,
        y: 320,
        targetX: 650,
        targetY: 320,
        speed: 0.03,
        delay: 150,
        type: 'woman2',
        eyeDirection: { x: 0, y: 0 }
      },
      {
        id: 5,
        x: 800,
        y: 290,
        targetX: 800,
        targetY: 290,
        speed: 0.022,
        delay: 80,
        type: 'man3',
        eyeDirection: { x: 0, y: 0 }
      }
    ];
    setCharacters(initialCharacters);
  }, []);

  // Track mouse movement with high performance
  useEffect(() => {
    const handleMouseMove = (e) => { // Removed : MouseEvent
      mouseRef.current = { x: e.clientX, y: e.clientY };
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animation loop
  useEffect(() => {
    const animate = () => {
      setCharacters(prevCharacters => 
        prevCharacters.map(character => {
          // Calculate target position with offset based on character position
          const offsetX = (character.id - 3) * 80; // Spread characters around cursor
          const offsetY = Math.sin(character.id) * 40;
          
          const newTargetX = mouseRef.current.x + offsetX;
          const newTargetY = mouseRef.current.y + offsetY;

          // Smooth movement towards target
          const deltaX = newTargetX - character.x;
          const deltaY = newTargetY - character.y;
          
          const newX = character.x + deltaX * character.speed;
          const newY = character.y + deltaY * character.speed;

          // Calculate eye direction based on cursor position
          const eyeDeltaX = mouseRef.current.x - character.x;
          const eyeDeltaY = mouseRef.current.y - character.y;
          const eyeDistance = Math.sqrt(eyeDeltaX * eyeDeltaX + eyeDeltaY * eyeDeltaY);
          
          const eyeDirection = {
            x: eyeDistance > 0 ? (eyeDeltaX / eyeDistance) * 3 : 0,
            y: eyeDistance > 0 ? (eyeDeltaY / eyeDistance) * 3 : 0
          };

          return {
            ...character,
            x: newX,
            y: newY,
            targetX: newTargetX,
            targetY: newTargetY,
            eyeDirection
          };
        })
      );

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Removed type annotation for character prop
  const StickFigure = ({ character }) => {
    const { x, y, type, eyeDirection } = character;
    
    // Calculate body rotation based on movement direction
    const deltaX = character.targetX - character.x;
    const deltaY = character.targetY - character.y;
    const rotation = Math.atan2(deltaY, deltaX) * (180 / Math.PI) * 0.1; // Subtle rotation

    return (
      <g 
        transform={`translate(${x}, ${y}) rotate(${rotation})`}
        style={{ transition: 'transform 0.1s ease-out' }}
      >
        {/* Body */}
        <line x1="0" y1="-20" x2="0" y2="40" stroke="#2d3748" strokeWidth="3" strokeLinecap="round" />
        
        {/* Head */}
        <circle cx="0" cy="-35" r="15" fill="none" stroke="#2d3748" strokeWidth="3" />
        
        {/* Eyes */}
        <circle 
          cx={-5 + eyeDirection.x} 
          cy={-38 + eyeDirection.y} 
          r="2" 
          fill="#2d3748" 
        />
        <circle 
          cx={5 + eyeDirection.x} 
          cy={-38 + eyeDirection.y} 
          r="2" 
          fill="#2d3748" 
        />
        
        {/* Hair based on character type */}
        {(type === 'woman1' || type === 'woman2') && (
          <>
            <path 
              d="M -15 -35 Q -20 -45 -10 -50 Q 0 -52 10 -50 Q 20 -45 15 -35" 
              fill="none" 
              stroke="#2d3748" 
              strokeWidth="3" 
              strokeLinecap="round"
            />
            <path 
              d="M -12 -30 Q -18 -25 -15 -15" 
              fill="none" 
              stroke="#2d3748" 
              strokeWidth="3" 
              strokeLinecap="round"
            />
            <path 
              d="M 12 -30 Q 18 -25 15 -15" 
              fill="none" 
              stroke="#2d3748" 
              strokeWidth="3" 
              strokeLinecap="round"
            />
          </>
        )}
        
        {(type === 'man1' || type === 'man2' || type === 'man3') && (
          <>
            <path 
              d="M -8 -48 L -5 -45 L -2 -48 L 2 -45 L 5 -48 L 8 -45" 
              fill="none" 
              stroke="#2d3748" 
              strokeWidth="2" 
              strokeLinecap="round"
            />
          </>
        )}
        
        {/* Arms */}
        <line 
          x1="-25" 
          y1="0" 
          x2="25" 
          y2="0" 
          stroke="#2d3748" 
          strokeWidth="3" 
          strokeLinecap="round"
          transform={`rotate(${Math.sin(Date.now() * 0.003 + character.id) * 10})`}
        />
        
        {/* Legs */}
        <line 
          x1="0" 
          y1="40" 
          x2="-15" 
          y2="70" 
          stroke="#2d3748" 
          strokeWidth="3" 
          strokeLinecap="round"
          transform={`rotate(${Math.sin(Date.now() * 0.004 + character.id) * 5})`}
        />
        <line 
          x1="0" 
          y1="40" 
          x2="15" 
          y2="70" 
          stroke="#2d3748" 
          strokeWidth="3" 
          strokeLinecap="round"
          transform={`rotate(${Math.sin(Date.now() * 0.004 + character.id + 1) * 5})`}
        />
        
        {/* Dress for women */}
        {(type === 'woman1' || type === 'woman2') && (
          <path 
            d="M -12 20 L 12 20 L 15 50 L -15 50 Z" 
            fill="none" 
            stroke="#2d3748" 
            strokeWidth="3" 
            strokeLinecap="round"
          />
        )}
        
        {/* Hands */}
        <circle cx="-25" cy="0" r="3" fill="none" stroke="#2d3748" strokeWidth="2" />
        <circle cx="25" cy="0" r="3" fill="none" stroke="#2d3748" strokeWidth="2" />
        
        {/* Feet */}
        <ellipse cx="-15" cy="75" rx="8" ry="3" fill="none" stroke="#2d3748" strokeWidth="2" />
        <ellipse cx="15" cy="75" rx="8" ry="3" fill="none" stroke="#2d3748" strokeWidth="2" />
      </g>
    );
  };

  return (
    <div className="min-h-screen overflow-hidden relative bg-gradient-to-br opacity-100 from-slate-50 via-blue-50 to-indigo-100">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-200 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-purple-200 rounded-full blur-lg"></div>
        <div className="absolute bottom-32 left-1/3 w-40 h-40 bg-pink-200 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-indigo-200 rounded-full blur-lg"></div>
      </div>

      {/* SVG Canvas for stick figures */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 10 }}
      >
        {characters.map(character => (
          <StickFigure key={character.id} character={character} />
        ))}
      </svg>

      {/* Instructions */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-center z-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Interactive Stick Figures</h1>
        <p className="text-lg text-gray-600 mb-1">Move your cursor around the screen</p>
        <p className="text-sm text-gray-500">Watch the characters follow your cursor!</p>
      </div>

      {/* Character info */}
      <div className="absolute bottom-8 left-8 bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg z-10">
        <h3 className="font-semibold text-gray-800 mb-2">Character Features:</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Eyes track your cursor</li>
          <li>• Different movement speeds</li>
          <li>• Subtle body animations</li>
          <li>• Unique personalities</li>
        </ul>
      </div>

      {/* Fun facts */}
      <div className="absolute bottom-8 right-8 bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg z-10">
        <h3 className="font-semibold text-gray-800 mb-2">Cursor Features:</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Ultra-smooth tracking</li>
          <li>• Default system cursor</li>
          <li>• No custom text</li>
        </ul>
      </div>

      {/* Floating particles */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-300 rounded-full animate-bounce opacity-60"></div>
      <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-purple-400 rounded-full animate-pulse opacity-70"></div>
      <div className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 bg-pink-300 rounded-full animate-ping opacity-50"></div>
      <div className="absolute top-2/3 right-1/4 w-2 h-2 bg-indigo-300 rounded-full animate-bounce delay-300 opacity-60"></div>
    </div>
  );
}

export default App;

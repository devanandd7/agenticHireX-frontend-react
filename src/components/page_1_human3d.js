import React, { useEffect, useState, useRef } from 'react';

const SplinePreviewTwo = () => {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const cursorRef = useRef(null);
  const animationFrameRef = useRef(null);

  const position = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (window.customElements.get('spline-viewer')) {
      setScriptLoaded(true);
      return;
    }

    const scriptId = 'spline-viewer-script-two';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.type = 'module';
      script.src = 'https://unpkg.com/@splinetool/viewer@1.10.16/build/spline-viewer.js';
      script.async = true;

      script.onload = () => setTimeout(() => setScriptLoaded(true), 100);
      script.onerror = (err) => console.error("Spline script load error:", err);

      document.head.appendChild(script);
    } else {
      const checkCustomElement = setInterval(() => {
        if (window.customElements.get('spline-viewer')) {
          setScriptLoaded(true);
          clearInterval(checkCustomElement);
        }
      }, 50);
      return () => clearInterval(checkCustomElement);
    }
  }, []);

  const handleMouseMove = (e) => {
    position.current = { x: e.clientX + 15, y: e.clientY + 15 };

    if (!animationFrameRef.current) {
      animationFrameRef.current = requestAnimationFrame(() => {
        if (cursorRef.current) {
          cursorRef.current.style.left = `${position.current.x}px`;
          cursorRef.current.style.top = `${position.current.y}px`;
        }
        animationFrameRef.current = null;
      });
    }
  };

  return (
    <>
      <div
        className="flex items-center justify-center min-h-screen w-screen bg-gray-950 relative"
        onMouseMove={handleMouseMove}
        style={{ cursor: 'none' }}
      >
        {scriptLoaded ? (
          <spline-viewer
            url="https://prod.spline.design/OWO3tEcbSjZKzwSG/scene.splinecode"
            style={{
              width: '100%',
              height: '100vh',
              minHeight: '500px',
              display: 'block',
            }}
          ></spline-viewer>
        ) : (
          <div className="text-white text-xl">Loading 3D scene...</div>
        )}

        {/* Header Text */}
        <div className="absolute left-8 top-1/3 -translate-y-1/2 z-20 p-2 animate-text-fade-in">
          <h1 className="text-white font-extrabold text-7xl md:text-8xl leading-tight">
            AgenticHireX
          </h1>
          <p className="text-white text-lg md:text-xl mt-2 font-medium">
            Believe in skill, you get a real job guaranteed.
          </p>
        </div>

        {/* Optimized Custom Cursor */}
        <div
          ref={cursorRef}
          className="absolute pointer-events-none text-white font-bold text-4xl transition-opacity duration-150 ease-out"
          style={{
            transform: 'translate(-50%, -50%)',
            zIndex: 9999,
            opacity: 1,
          }}
        >
          Job
        </div>

        {/* Embedded CSS */}
        <style>{`
          html, body, #root {
            margin: 0;
            height: 100%;
            overflow: auto;
          }

          @keyframes textFadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .animate-text-fade-in {
            animation: textFadeIn 1.5s ease-out forwards;
            opacity: 0;
          }
        `}</style>
      </div>
    </>
  );
};

export default SplinePreviewTwo;

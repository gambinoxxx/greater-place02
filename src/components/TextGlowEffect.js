"use client";
import { useEffect, useState, useRef } from "react";

const TextGlowEffect = () => {
  const [sparks, setSparks] = useState([]);
  const cursorRef = useRef({ x: 0, y: 0, isText: false });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const target = e.target;
      // Check if target is a text element or contains text directly
      const isText = 
        ['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'SPAN', 'A', 'BUTTON', 'LI', 'LABEL', 'STRONG', 'EM', 'B', 'I', 'TD', 'TH'].includes(target.tagName) ||
        (target.innerText && target.children.length === 0 && target.innerText.trim().length > 0);

      cursorRef.current = { x: e.clientX, y: e.clientY, isText };
    };

    const createSpark = (x, y) => {
      const id = Date.now() + Math.random();
      const size = Math.random() * 15 + 10; // Random size between 10px and 25px
      // Gold, Yellow, Purple, Blue colors to match your theme
      const colors = ['#FFD700', '#FFA500', '#9333EA', '#3B82F6', '#F472B6']; 
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      const spark = {
        id,
        x,
        y,
        size,
        color,
        vx: (Math.random() - 0.5) * 4, // Random horizontal velocity
        vy: (Math.random() - 1) * 4 - 2, // Upward vertical velocity (overflow effect)
        rotation: Math.random() * 360
      };

      setSparks((prev) => [...prev, spark]);

      // Cleanup after animation
      setTimeout(() => {
        setSparks((prev) => prev.filter((s) => s.id !== id));
      }, 800);
    };

    const interval = setInterval(() => {
      if (cursorRef.current.isText) {
        createSpark(cursorRef.current.x, cursorRef.current.y);
      }
    }, 50);

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {sparks.map((spark) => (
        <div
          key={spark.id}
          className="absolute animate-spark"
          style={{
            left: spark.x,
            top: spark.y,
            width: spark.size,
            height: spark.size,
            '--tx': `${spark.vx * 30}px`,
            '--ty': `${spark.vy * 30}px`,
            '--rot': `${spark.rotation}deg`,
          }}
        >
          <svg 
            viewBox="0 0 24 24" 
            fill={spark.color} 
            className="w-full h-full"
            style={{ filter: `drop-shadow(0 0 4px ${spark.color})` }}
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>
      ))}
      <style jsx>{`
        .animate-spark {
          animation: spark 0.8s ease-out forwards;
        }
        @keyframes spark {
          0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(0.5) rotate(var(--rot));
          }
          100% {
            opacity: 0;
            transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(0) rotate(calc(var(--rot) + 180deg));
          }
        }
      `}</style>
    </div>
  );
};

export default TextGlowEffect;
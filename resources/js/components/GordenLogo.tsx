import { useState } from 'react';

interface GordenLogoProps {
  className?: string;
  size?: number;
}

export default function GordenLogo({ className = '', size = 80 }: GordenLogoProps) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div 
      className={`relative inline-flex items-center justify-center bg-white rounded-full shadow-md overflow-hidden ${className}`}
      style={{ width: size, height: size }}
      id="gorden-logo"
    >
      {!imgFailed ? (
        <img
          src="/assets/images/logo.png"
          alt="Gorden Yulie Batu"
          className="w-full h-full object-cover p-1"
          onError={() => setImgFailed(true)}
          referrerPolicy="no-referrer"
        />
      ) : (
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full p-1.5"
        >
          {/* Outer subtle decorative border circle */}
          <circle cx="50" cy="50" r="46" stroke="#2c4233" strokeWidth="0.5" strokeOpacity="0.2" />
          
          {/* Botanical leaf emblem in the center top */}
          <g transform="translate(50, 32) scale(0.9)">
            {/* Stem/Center line */}
            <path d="M0 -15 C0 -15 0 10 0 10" stroke="#8da05f" strokeWidth="1.5" strokeLinecap="round" />
            
            {/* Leaf pair 1 (Top) */}
            <path d="M0 -12 C-5 -16 -12 -8 0 0 C12 -8 5 -16 0 -12Z" fill="#2c4233" />
            
            {/* Leaf pair 2 (Middle Left) */}
            <path d="M-1 -5 C-10 -7 -14 5 -1 8" fill="#c3a05c" />
            
            {/* Leaf pair 2 (Middle Right) */}
            <path d="M1 -5 C10 -7 14 5 1 8" fill="#c3a05c" />
            
            {/* Leaf pair 3 (Bottom Left) */}
            <path d="M-2 2 C-14 1 -12 12 -2 12" fill="#2c4233" />
            
            {/* Leaf pair 3 (Bottom Right) */}
            <path d="M2 2 C14 1 12 12 2 12" fill="#2c4233" />
          </g>
          
          {/* TEXT "GORDEN" - clean serif/sans */}
          <text
            x="50"
            y="64"
            textAnchor="middle"
            fill="#5a5e55"
            fontSize="5"
            fontFamily="'Inter', sans-serif"
            fontWeight="700"
            letterSpacing="2.5"
          >
            GORDEN
          </text>
          
          {/* TEXT "Yulie" - exquisite elegant script / serif style */}
          <text
            x="50"
            y="80"
            textAnchor="middle"
            fill="#c3a05c"
            fontSize="14"
            fontFamily="'Playfair Display', 'Georgia', serif"
            fontWeight="700"
            fontStyle="italic"
          >
            Yulie
          </text>
        </svg>
      )}
    </div>
  );
}

import React from 'react'

interface TopographicBackgroundProps {
  opacity?: string
}

export const TopographicBackground: React.FC<TopographicBackgroundProps> = ({
  opacity = 'opacity-30',
}) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
      <svg
        className={`absolute inset-0 w-full h-full object-cover ${opacity}`}
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <defs>
          <pattern
            id="topography-pattern"
            width="320"
            height="320"
            patternUnits="userSpaceOnUse"
          >
            {/* Contour Ridge 1 */}
            <path
              d="M-20 40 C60 0, 120 70, 190 30 C260 -10, 300 50, 360 20"
              fill="none"
              stroke="rgba(255, 255, 255, 0.16)"
              strokeWidth="1.5"
            />
            <path
              d="M-20 60 C70 20, 130 90, 200 50 C270 10, 310 70, 370 40"
              fill="none"
              stroke="rgba(255, 255, 255, 0.22)"
              strokeWidth="1.5"
            />
            <path
              d="M-20 80 C80 40, 140 110, 210 70 C280 30, 320 90, 380 60"
              fill="none"
              stroke="rgba(255, 255, 255, 0.18)"
              strokeWidth="1.5"
            />

            {/* Central Topographic Island / Concentric Loops */}
            <path
              d="M100 150 C70 120, 50 180, 85 215 C120 250, 190 220, 170 170 C155 130, 125 140, 100 150 Z"
              fill="none"
              stroke="rgba(255, 255, 255, 0.18)"
              strokeWidth="1.5"
            />
            <path
              d="M105 155 C80 130, 65 175, 95 205 C125 235, 180 210, 162 172 C150 140, 125 145, 105 155 Z"
              fill="none"
              stroke="rgba(255, 255, 255, 0.25)"
              strokeWidth="1.5"
            />
            <path
              d="M112 162 C95 142, 80 175, 105 198 C130 220, 170 200, 155 175 C142 152, 125 155, 112 162 Z"
              fill="none"
              stroke="rgba(255, 255, 255, 0.32)"
              strokeWidth="1.5"
            />
            <path
              d="M120 170 C110 155, 98 175, 115 190 C132 205, 160 192, 148 178 C138 162, 128 165, 120 170 Z"
              fill="none"
              stroke="rgba(255, 255, 255, 0.4)"
              strokeWidth="1.5"
            />
            {/* Center Peak */}
            <circle
              cx="132"
              cy="180"
              r="4"
              fill="none"
              stroke="rgba(255, 255, 255, 0.45)"
              strokeWidth="1.5"
            />

            {/* Contour Ridge 2 */}
            <path
              d="M-20 200 C50 160, 120 240, 190 190 C260 140, 300 210, 360 170"
              fill="none"
              stroke="rgba(255, 255, 255, 0.16)"
              strokeWidth="1.5"
            />
            <path
              d="M-20 220 C60 180, 130 260, 200 210 C270 160, 310 230, 370 190"
              fill="none"
              stroke="rgba(255, 255, 255, 0.22)"
              strokeWidth="1.5"
            />
            <path
              d="M-20 240 C70 200, 140 280, 210 230 C280 180, 320 250, 380 210"
              fill="none"
              stroke="rgba(255, 255, 255, 0.18)"
              strokeWidth="1.5"
            />

            {/* Secondary Peak in Top Right */}
            <path
              d="M240 60 C220 40, 250 10, 280 30 C300 50, 280 80, 240 60 Z"
              fill="none"
              stroke="rgba(255, 255, 255, 0.22)"
              strokeWidth="1.5"
            />
            <path
              d="M245 62 C232 48, 255 25, 275 40 C288 55, 272 75, 245 62 Z"
              fill="none"
              stroke="rgba(255, 255, 255, 0.3)"
              strokeWidth="1.5"
            />

            {/* Depth shadow accents */}
            <path
              d="M-20 58 C70 18, 130 88, 200 48 C270 8, 310 68, 370 38"
              fill="none"
              stroke="rgba(0, 0, 0, 0.22)"
              strokeWidth="1.5"
            />
            <path
              d="M-20 218 C60 178, 130 258, 200 208 C270 158, 310 228, 370 188"
              fill="none"
              stroke="rgba(0, 0, 0, 0.22)"
              strokeWidth="1.5"
            />
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill="url(#topography-pattern)" />
      </svg>

      {/* Ambient gradient lighting */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#346C4F]/25 to-[#244c37]/50 pointer-events-none" />
    </div>
  )
}

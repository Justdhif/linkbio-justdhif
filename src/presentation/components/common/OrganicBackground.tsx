import React from 'react'

export const OrganicBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <svg
        className="absolute inset-0 w-full h-full object-cover opacity-60"
        viewBox="0 0 580 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        {/* Organic wavy shapes matching Linktree's Organic theme */}
        <path
          d="M-50 420 C80 380, 160 480, 290 440 C420 400, 520 460, 630 410 L630 950 L-50 950 Z"
          fill="#2d5e44"
        />
        <path
          d="M-40 480 C110 520, 200 450, 340 500 C480 550, 550 470, 620 520 L620 950 L-40 950 Z"
          fill="#26503a"
        />
        <path
          d="M-60 560 C90 530, 180 620, 310 580 C440 540, 540 610, 640 570 L640 950 L-60 950 Z"
          fill="#1f4431"
        />
        <path
          d="M-30 650 C120 680, 220 620, 360 670 C500 720, 570 650, 630 690 L630 950 L-30 950 Z"
          fill="#27533c"
        />
      </svg>
    </div>
  )
}

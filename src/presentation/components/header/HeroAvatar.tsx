import React from 'react'

interface HeroAvatarProps {
  imageUrl: string
  alt: string
}

export const HeroAvatar: React.FC<HeroAvatarProps> = ({ imageUrl, alt }) => {
  return (
    <div className="relative w-full select-none" id="profile-picture">
      {/* Picture Frame matching Linktree Hero height */}
      <div className="relative w-full h-[calc(100vw-80px)] sm:h-[480px]">
        {/* Full Image container extending 80px with Linktree's exact radial gradient mask */}
        <div
          className="absolute left-0 right-0 top-0 h-[100vw] sm:h-[560px] w-full overflow-hidden"
          style={{
            WebkitMaskImage:
              'radial-gradient(110.26% 96% at 50% 0%, #000 50%, rgba(0, 0, 0, 0.99) 54.68%, rgba(0, 0, 0, 0.97) 58.79%, rgba(0, 0, 0, 0.94) 62.4%, rgba(0, 0, 0, 0.90) 65.61%, rgba(0, 0, 0, 0.85) 68.52%, rgba(0, 0, 0, 0.79) 71.2%, rgba(0, 0, 0, 0.72) 73.75%, rgba(0, 0, 0, 0.65) 76.25%, rgba(0, 0, 0, 0.57) 78.8%, rgba(0, 0, 0, 0.48) 81.48%, rgba(0, 0, 0, 0.39) 84.39%, rgba(0, 0, 0, 0.30) 87.6%, rgba(0, 0, 0, 0.20) 91.21%, rgba(0, 0, 0, 0.10) 95.32%, rgba(0, 0, 0, 0.00) 100%)',
            maskImage:
              'radial-gradient(110.26% 96% at 50% 0%, #000 50%, rgba(0, 0, 0, 0.99) 54.68%, rgba(0, 0, 0, 0.97) 58.79%, rgba(0, 0, 0, 0.94) 62.4%, rgba(0, 0, 0, 0.90) 65.61%, rgba(0, 0, 0, 0.85) 68.52%, rgba(0, 0, 0, 0.79) 71.2%, rgba(0, 0, 0, 0.72) 73.75%, rgba(0, 0, 0, 0.65) 76.25%, rgba(0, 0, 0, 0.57) 78.8%, rgba(0, 0, 0, 0.48) 81.48%, rgba(0, 0, 0, 0.39) 84.39%, rgba(0, 0, 0, 0.30) 87.6%, rgba(0, 0, 0, 0.20) 91.21%, rgba(0, 0, 0, 0.10) 95.32%, rgba(0, 0, 0, 0.00) 100%)',
          }}
        >
          <img
            src={imageUrl}
            alt={alt}
            className="h-full w-full object-cover object-top"
            loading="eager"
          />

          {/* Top subtle vignette for TopBar icons */}
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/35 via-black/10 to-transparent pointer-events-none" />
        </div>
      </div>
    </div>
  )
}

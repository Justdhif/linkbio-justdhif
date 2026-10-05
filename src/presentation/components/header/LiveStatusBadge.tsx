import React from 'react'
import { motion } from 'framer-motion'

interface LiveStatusBadgeProps {
  isOpen: boolean
  statusText?: string
}

export const LiveStatusBadge: React.FC<LiveStatusBadgeProps> = ({
  isOpen = true,
  statusText = 'Open Order • Menerima Pesanan',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-3.5 py-1 text-xs font-semibold text-white backdrop-blur-md shadow-xs select-none"
    >
      {/* Pulsing Dot */}
      <span className="relative flex h-2.5 w-2.5">
        {isOpen && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        )}
        <span
          className={`relative inline-flex h-2.5 w-2.5 rounded-full ${
            isOpen ? 'bg-emerald-500' : 'bg-amber-500'
          }`}
        />
      </span>
      <span className="tracking-wide text-white/95">{statusText}</span>
    </motion.div>
  )
}

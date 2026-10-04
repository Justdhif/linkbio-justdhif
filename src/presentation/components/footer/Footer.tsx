import React from 'react'
import { motion } from 'framer-motion'
import { Link2 } from 'lucide-react'

export const Footer: React.FC = () => {
  return (
    <footer className="w-full pb-8 pt-4 text-center z-10">
      <motion.div
        whileHover={{ scale: 1.03 }}
        className="inline-flex items-center gap-2 rounded-full bg-black/20 border border-white/15 px-4 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-md"
      >
        <Link2 className="h-3.5 w-3.5 text-lime-400" />
        <span>Justdhif Store • Bio Link</span>
      </motion.div>
      <p className="mt-2 text-[11px] text-white/60">
        © {new Date().getFullYear()} Justdhif Official. All rights reserved.
      </p>
    </footer>
  )
}

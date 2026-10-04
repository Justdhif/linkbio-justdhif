import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'

interface ToastProps {
  isVisible: boolean
  message: string
}

export const Toast: React.FC<ToastProps> = ({ isVisible, message }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed top-16 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-full border-2 border-black bg-white px-5 py-2.5 shadow-neo text-black font-semibold text-xs sm:text-sm"
        >
          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          <span>{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

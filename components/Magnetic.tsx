'use client'

import { motion } from 'framer-motion'
import { useRef, useState, ReactNode } from 'react'

export const Magnetic = ({ children }: { children: ReactNode }) => {
    const ref = useRef<HTMLDivElement>(null)
    const [position, setPosition] = useState({ x: 0, y: 0 })

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e
        const { width, height, left, top } = ref.current?.getBoundingClientRect() || { width: 0, height: 0, left: 0, top: 0 }
        const x = clientX - (left + width / 2)
        const y = clientY - (top + height / 2)

        // Multiplier for magnetic strength
        setPosition({ x: x * 0.35, y: y * 0.35 })
    }

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 })
    }

    const { x, y } = position

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x, y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        >
            {children}
        </motion.div>
    )
}

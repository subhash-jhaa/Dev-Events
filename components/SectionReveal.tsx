'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface SectionRevealProps {
    children: ReactNode
    delay?: number
    direction?: 'up' | 'down' | 'left' | 'right'
    className?: string
}

export const SectionReveal = ({
    children,
    delay = 0,
    direction = 'up',
    className = ""
}: SectionRevealProps) => {
    const variants = {
        hidden: {
            opacity: 0,
            y: direction === 'up' ? 30 : direction === 'down' ? -30 : 0,
            x: direction === 'left' ? 30 : direction === 'right' ? -30 : 0,
        },
        visible: {
            opacity: 1,
            y: 0,
            x: 0,
            transition: {
                duration: 0.8,
                delay: delay,
                ease: [0.16, 1, 0.3, 1] // Custom ease for smooth, cinematic feel
            }
        }
    }

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={variants}
            className={className}
        >
            {children}
        </motion.div>
    )
}

interface StaggerContainerProps {
    children: ReactNode
    delayChildren?: number
    staggerBy?: number
    className?: string
}

export const StaggerContainer = ({
    children,
    delayChildren = 0,
    staggerBy = 0.1,
    className = ""
}: StaggerContainerProps) => {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
                visible: {
                    transition: {
                        delayChildren: delayChildren,
                        staggerChildren: staggerBy
                    }
                }
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

export const StaggerItem = ({ children, className = "" }: { children: ReactNode, className?: string }) => {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                        duration: 0.6,
                        ease: [0.16, 1, 0.3, 1]
                    }
                }
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

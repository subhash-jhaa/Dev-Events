'use client'

import { useEffect, useState, useRef } from 'react'

interface StatProps {
    end: number
    suffix?: string
    label: string
    duration?: number
}

const StatItem = ({ end, suffix = "", label, duration = 2000 }: StatProps) => {
    const [count, setCount] = useState(0)
    const [hasAnimated, setHasAnimated] = useState(false)
    const elementRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    setHasAnimated(true)
                }
            },
            { threshold: 0.5 }
        )

        if (elementRef.current) {
            observer.observe(elementRef.current)
        }

        return () => observer.disconnect()
    }, [hasAnimated])

    useEffect(() => {
        if (!hasAnimated) return

        let start = 0
        const increment = end / (duration / 16)
        const timer = setInterval(() => {
            start += increment
            if (start >= end) {
                setCount(end)
                clearInterval(timer)
            } else {
                setCount(Math.floor(start))
            }
        }, 16)

        return () => clearInterval(timer)
    }, [hasAnimated, end, duration])

    const formatNumber = (num: number) => {
        return num.toLocaleString()
    }

    return (
        <div ref={elementRef} className="flex flex-col items-center justify-center p-4">
            <span className="text-[1.8rem] font-bold text-white tracking-tight">
                {formatNumber(count)}{suffix}
            </span>
            <span className="text-light-200 text-[0.8rem] mt-1 uppercase tracking-wider font-medium opacity-80">
                {label}
            </span>
        </div>
    )
}

const StatsBar = () => {
    return (
        <div className="w-full bg-white/[0.02] border-y border-white/[0.07] py-8 my-12 animate-fade-up [animation-delay:250ms]">
            <div className="container mx-auto px-5">
                <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/[0.07]">
                    <div className="border-r md:border-r-0 border-white/[0.07]">
                        <StatItem end={2400} suffix="+" label="Events Listed" />
                    </div>
                    <div>
                        <StatItem end={37000} suffix="+" label="Developers" />
                    </div>
                    <div className="border-r md:border-r-0 border-white/[0.07]">
                        <StatItem end={120} suffix="+" label="Cities" />
                    </div>
                    <div>
                        <StatItem end={98} suffix="%" label="Free to Join" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StatsBar

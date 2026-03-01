'use client'

import { ArrowDownRight } from 'lucide-react'
import Link from 'next/link'
import posthog from 'posthog-js'
import { Magnetic } from './Magnetic'

const ExploreBtn = () => {
  const handleClick = () => {
    posthog.capture('explore_events_clicked')
  }

  return (
    <div className="flex justify-center">
      <Magnetic>
        <Link
          href="#events"
          prefetch={false}
          id="explore-btn"
          className="group relative px-8 py-4 bg-primary text-black font-bold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2"
          onClick={handleClick}
        >
          <span className="relative z-10 flex items-center gap-2">
            Explore Now
            <ArrowDownRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </span>
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
        </Link>
      </Magnetic>
    </div>
  )
}

export default ExploreBtn

'use client'

import { ArrowDownRight } from 'lucide-react'
import Link from 'next/link'
import posthog from 'posthog-js'

const ExploreBtn = () => {
  const handleClick = () => {
    posthog.capture('explore_events_clicked')
  }

  return (
    <Link
      href="/events/hackathon-2024"
      prefetch={false}
      id="explore-btn"
      className="mt-7 mx-auto inline-flex items-center justify-center"
      onClick={handleClick}
    >
      Explore Now
      <ArrowDownRight size={20} />
    </Link>
  )
}

export default ExploreBtn

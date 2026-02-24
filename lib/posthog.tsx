'use client'

import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import { useEffect, Suspense } from 'react'
import PostHogPageView from './PostHogPageView'

export function PHProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // PostHog is initialized in instrumentation-client.ts
    // No more double initialization
  }, [])

  return (
    <PostHogProvider client={posthog}>
      <Suspense fallback={null}>
        <PostHogPageView />
      </Suspense>
      {children}
    </PostHogProvider>
  )
}

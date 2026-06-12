'use client'

import dynamic from 'next/dynamic'
import { Component, useEffect, useState } from 'react'
import StaticSky from './StaticSky'
import { detectTier } from '@/lib/perf'

const Scene = dynamic(() => import('./Scene'), { ssr: false, loading: () => null })

class CanvasBoundary extends Component {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    return this.state.failed ? <StaticSky /> : this.props.children
  }
}

export default function VoyageCanvas() {
  const [tier, setTier] = useState(null)

  useEffect(() => {
    setTier(detectTier())
  }, [])

  if (tier === null || tier === 0) return <StaticSky />
  return (
    <CanvasBoundary>
      <StaticSky />
      <div className="pointer-events-none fixed inset-0 -z-10">
        <Scene tier={tier} />
      </div>
    </CanvasBoundary>
  )
}

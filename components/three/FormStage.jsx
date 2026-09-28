'use client'

import dynamic from 'next/dynamic'
import { Component, useEffect, useSyncExternalStore } from 'react'
import { detectTier } from '@/lib/perf'

const FormCanvas = dynamic(() => import('./FormCanvas'), { ssr: false, loading: () => null })

// Quality tier, measured once per page load. `?tier=0|1|2` forces a tier for testing.
let cachedTier
function readTier() {
  if (cachedTier === undefined) {
    const forced = new URLSearchParams(window.location.search).get('tier')
    cachedTier = ['0', '1', '2'].includes(forced) ? Number(forced) : detectTier()
  }
  return cachedTier
}
const subscribe = () => () => {}
const serverTier = () => null

function markLive() {
  document.documentElement.setAttribute('data-form', 'live')
}

// No live form: the hero keeps its still, and the room reserved for the form closes up.
function markOff() {
  document.documentElement.setAttribute('data-form', 'off')
}

class FormBoundary extends Component {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch() {
    markOff()
  }

  render() {
    return this.state.failed ? null : this.props.children
  }
}

/** Fixed layer behind the page holding the live 3D form. At tier 0 nothing renders and the page is marked data-form="off". */
export default function FormStage() {
  const tier = useSyncExternalStore(subscribe, readTier, serverTier)
  useEffect(() => {
    if (tier === 0) markOff()
  }, [tier])
  if (!tier) return null
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 print:hidden">
      <FormBoundary>
        <FormCanvas tier={tier} onReady={markLive} />
      </FormBoundary>
    </div>
  )
}

'use client'

import dynamic from 'next/dynamic'
import { Component, useSyncExternalStore } from 'react'
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

class FormBoundary extends Component {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch() {
    document.documentElement.removeAttribute('data-form')
  }

  render() {
    return this.state.failed ? null : this.props.children
  }
}

/** Fixed layer behind the page holding the live 3D form. At tier 0 nothing renders, so the hero keeps its still image. */
export default function FormStage() {
  const tier = useSyncExternalStore(subscribe, readTier, serverTier)
  if (!tier) return null
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 print:hidden">
      <FormBoundary>
        <FormCanvas tier={tier} onReady={markLive} />
      </FormBoundary>
    </div>
  )
}

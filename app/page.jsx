import VoyageCanvas from '@/components/voyage/VoyageCanvas'
import Launch from '@/components/chapters/Launch'
import { CHAPTERS } from '@/lib/chapters'

export default function Home() {
  return (
    <>
      <VoyageCanvas />
      <main className="relative z-10">
        <Launch />
        {CHAPTERS.filter((c) => c.id !== 'launch').map((c) => (
          <section key={c.id} id={c.id} style={{ minHeight: `${c.weight * 100}vh` }} className="flex items-center justify-center">
            <span className="font-mono text-dim/40">{c.id}</span>
          </section>
        ))}
      </main>
    </>
  )
}

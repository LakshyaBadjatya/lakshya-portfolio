import Link from 'next/link'

export default function NotFound() {
  return (
    <main id="main">
      <h1>Page not found</h1>
      <Link href="/">Home</Link>
    </main>
  )
}

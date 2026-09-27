import Image from 'next/image'
import { profile } from '@/content/profile'

export const metadata = { title: 'Share image', robots: { index: false, follow: false } }

/** 1200×630 share card, captured to public/og-image.png by `npm run assets`. */
export default function OgCard() {
  return (
    <div
      id="og"
      className="relative flex h-[630px] w-[1200px] flex-col justify-between overflow-hidden bg-paper px-16 py-14 text-ink"
    >
      <p className="text-xl uppercase tracking-[0.18em] text-ink-2">sukhma.in</p>
      <div className="relative z-10">
        <p className="font-serif text-[132px] leading-[0.88] tracking-[-0.02em]">
          {profile.nameLines[0]}
          <br />
          {profile.nameLines[1]}
        </p>
        <p className="mt-8 text-[30px]">{profile.role}</p>
      </div>
      <div className="absolute bottom-0 right-12 h-[580px] w-[387px]">
        <Image src={profile.portrait.src} alt="" fill sizes="387px" className="object-contain object-bottom" preload />
      </div>
    </div>
  )
}

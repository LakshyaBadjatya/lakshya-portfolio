import SectionHeading from './SectionHeading'
import WorkChapter from './WorkChapter'
import { profile } from '@/content/profile'

export default function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className="mx-auto max-w-[1440px] px-[5vw] pt-32">
      <SectionHeading id="work-title" number="01" title="Selected work" />
      {profile.work.map((item, i) => (
        <WorkChapter key={item.id} item={item} total={profile.work.length} align={i % 2 === 0 ? 'right' : 'left'} />
      ))}
    </section>
  )
}

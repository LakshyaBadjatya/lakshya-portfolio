import { m } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

import section from '../../styles/blocks/section.title.module.scss'

export default function SectionTitle({ preTitle, title, subTitle }) {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true })

  return (
    <div ref={ref} className={`${section.title}`}>
      <m.h4
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
      >
        {preTitle}
      </m.h4>

      <m.h2
        initial={{ opacity: 0, y: 24, clipPath: 'inset(100% 0% 0% 0%)' }}
        animate={inView ? { opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)' } : {}}
        transition={{ duration: 0.65, ease: [0.25, 0.4, 0.25, 1], delay: 0.08 }}
      >
        {title}
      </m.h2>

      <m.p
        className="subtitle"
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, ease: [0.25, 0.4, 0.25, 1], delay: 0.18 }}
      >
        {subTitle}
      </m.p>
    </div>
  )
}

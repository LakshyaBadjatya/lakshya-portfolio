import { m } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

import section from '../../styles/blocks/section.title.module.scss'

export default function SectionTitle({ preTitle, title, subTitle }) {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true })

  return (
    <div ref={ref} className={`${section.title}`}>
      {/* Pre-title with gradient accent line */}
      <m.div
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
      >
        <m.span
          style={{
            width: '32px',
            height: '2px',
            background: 'var(--gradient-primary)',
            borderRadius: '99px',
          }}
          initial={{ width: 0 }}
          animate={inView ? { width: 32 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
        <h4>{preTitle}</h4>
        <m.span
          style={{
            width: '32px',
            height: '2px',
            background: 'var(--gradient-primary)',
            borderRadius: '99px',
          }}
          initial={{ width: 0 }}
          animate={inView ? { width: 32 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
      </m.div>

      {/* Main title with clip-path reveal & gradient */}
      <m.h2
        className="gradient-text"
        initial={{ opacity: 0, y: 30, clipPath: 'inset(100% 0% 0% 0%)' }}
        animate={inView ? { opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)' } : {}}
        transition={{ duration: 0.75, ease: [0.25, 0.4, 0.25, 1], delay: 0.1 }}
        style={{
          backgroundSize: '200% 200%',
          animation: 'gradient-shift 6s ease infinite',
        }}
      >
        {title}
      </m.h2>

      {/* Subtitle */}
      <m.p
        className="subtitle"
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1], delay: 0.25 }}
      >
        {subTitle}
      </m.p>
    </div>
  )
}

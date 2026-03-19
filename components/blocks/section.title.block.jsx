
import { m } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

import Container from '../structure/container';
import section from '../../styles/blocks/section.title.module.scss'

export default function SectionTitle({ preTitle, title, subTitle }) {
	const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true })

	return (
		<m.div
			ref={ref}
			className={`${section.title}`}
			initial={{ opacity: 0, y: 30 }}
			animate={inView ? { opacity: 1, y: 0 } : {}}
			transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
		>
			<h4>{preTitle}</h4>
			<h2>{title}</h2>
			<p className="subtitle">{subTitle}</p>
		</m.div>
	)
}

import Image from 'next/image'

import { useEffect } from 'react'
import { m, useAnimation } from "framer-motion"
import { useInView } from 'react-intersection-observer'

import Badges from '../../utils/badge.list.util'
import Icon from '../../utils/icon.util'

import css from '../../../styles/sections/projects/featured.module.scss'
import content from '../../../content/projects/featured.json'

export default function FeaturedProject({ content }, index) {

	const { project, url, repo, descriptionTitle, description, stack, imageOptions, images } = content

	const controls = useAnimation()
	const { ref, inView } = useInView({
		threshold: 0.2,
		triggerOnce: true
	})

	useEffect(() => {
		if (inView) controls.start("visible")
	}, [controls, inView])

	return (
		<m.section
			key={index}
			className={css.project}
			ref={ref}
			variants={container}
			initial={["rest", "hidden"]}
			whileHover="hover"
			animate={controls}
			role="link"
			tabIndex={0}
			onClick={() => window.open(url, "_blank")}
			onKeyDown={(e) => e.key === "Enter" && window.open(url, "_blank")}
		>
			{/* Gradient border glow on hover */}
			<m.div
				style={{
					position: 'absolute',
					inset: -1,
					borderRadius: 'inherit',
					background: 'var(--gradient-primary)',
					zIndex: -1,
					opacity: 0,
				}}
				variants={{
					rest: { opacity: 0 },
					hover: { opacity: 0.15 },
				}}
				transition={{ duration: 0.4 }}
			/>

			<div className={css.details}>
				<div className={css.projectHeader}>
					<div className={css.header}>
						<m.h3
							className="highlight"
							whileHover={{ x: 5 }}
							transition={{ duration: 0.2 }}
						>
							{project}
						</m.h3>
						<span className={css.privateOr}>
							<i className="devicon-github-plain"></i>{repo}
						</span>
					</div>

					<div className={css.description}>
						<p><strong>{descriptionTitle}</strong> {description}</p>
					</div>

					<div className={css.stackContainer}>
						<Badges list={stack} block="stack" fullContainer={false} color={false} />
					</div>

					<m.div
						className={css.viewProject}
						whileHover={{ x: 12, scale: 1.15 }}
						transition={{ type: 'spring', stiffness: 300, damping: 15 }}
					>
						<Icon icon={['fad', 'arrow-right-to-bracket']} />
					</m.div>
				</div>
			</div>

			<div className={css.imageContainer}>
				<span className={css.imageAnimationContainer}>
					{images.map(({ key, url, hover, h, w }, index) => {
						hover = (hover === 'left') ? hoverLeft : hoverRight
						return (
							<m.div key={`${index}-${key}`} variants={item}>
								<m.div variants={hover}>
									<Image src={url} alt={project} height={h} width={w} />
								</m.div>
							</m.div>
						)
					})}
				</span>
			</div>
		</m.section>
	)
}

/* =======================
   ANIMATION VARIANTS
   ======================= */

const container = {
	hidden: {
		transition: {
			delayChildren: 0.125,
			staggerChildren: 0.0625
		}
	},
	visible: {
		transition: {
			delayChildren: 0.125,
			staggerChildren: 0.25,
		}
	},
	rest: {
		transition: {
			delayChildren: 0,
			staggerChildren: 0,
		}
	},
	hover: {
		transition: {
			delayChildren: 0,
			staggerChildren: 0,
		}
	}
}

const item = {
	hidden: {
		y: 75,
		opacity: 0,
		transition: {
			type: "tween",
			ease: "easeIn",
			duration: 0.35,
		}
	},
	visible: {
		y: 0,
		opacity: 1,
		transition: {
			type: "tween",
			ease: "easeOut",
			duration: 0.5,
		}
	},
}

const hoverLeft = {
	rest: { x: 0, rotate: 0, scale: 1 },
	hover: { x: -24, rotate: -3, scale: 1.02, transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] } }
}

const hoverRight = {
	rest: { x: 0, rotate: 0, scale: 1 },
	hover: { x: 24, rotate: 3, scale: 1.02, transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] } }
}

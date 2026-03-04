import css from '../../styles/utils/page.colors.module.scss'

export default function ColorOverrides({ colors }) {

  const dark = colors?.dark || {}
  const unicorn = colors?.unicorn || {}
  const light = colors?.light || {}

  return (
    <data id="page-specific-colors" className={css.colors}>
      <style>
        {`
        ${generateTheme("dark", dark)}
        ${generateTheme("unicorn", unicorn)}
        ${generateTheme("light", light)}
        `}
      </style>

      <svg aria-hidden="true" focusable="false">
        <linearGradient id="fa-gradient" x1="0%" y1="0%" x2="175%" y2="175%">
          <stop offset="0%" stopColor="var(--neon-1-2)" />
          <stop offset="100%" stopColor="var(--neon-1-1)" />
        </linearGradient>
      </svg>
    </data>
  )
}

function generateTheme(theme, colors) {

  if (!colors || Object.keys(colors).length === 0) return ""

  return `
    :root[data-theme=${theme}] {
      --mesh-color-1: ${colors.mesh__secondaryDark};
      --mesh-color-2: ${colors.mesh__secondaryLight};
      --mesh-color-3: ${colors.mesh__primaryDark};
      --mesh-color-4: ${colors.mesh__primaryLight};
    }
  `
}
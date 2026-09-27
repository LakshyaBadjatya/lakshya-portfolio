import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'

const config = [
  { ignores: ['.next/**', 'node_modules/**', 'public/**', 'docs/**', '.remember/**', 'coverage/**'] },
  ...nextCoreWebVitals,
  {
    // three.js objects are created once and mutated every frame by design, and
    // React Three Fiber uses JSX props (args, attach, intensity…) that React DOM doesn't know.
    files: ['components/three/**/*.{js,jsx}'],
    rules: {
      'react/no-unknown-property': 'off',
      'react-hooks/immutability': 'off',
      'react-hooks/refs': 'off',
      'react-hooks/globals': 'off',
    },
  },
]

export default config

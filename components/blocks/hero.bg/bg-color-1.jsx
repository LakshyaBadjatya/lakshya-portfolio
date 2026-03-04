import hero from '../../../styles/sections/index/hero.module.scss'

export default function BgColor1() {

  return (
    <div className={hero.colorfulV1}>

      <div className={`${hero.barContainer} noEvents`}>
        <div className={hero.barGradient} />
      </div>

      <div className={`${hero.radialContainer} noEvents`}>
        <div className={hero.radialGradient} />
      </div>

    </div>
  )
}
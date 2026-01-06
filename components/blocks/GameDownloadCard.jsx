import Image from "next/image"
import { useRouter } from "next/router"
import css from "../../styles/blocks/gameDownloadCard.module.scss"

export default function GameDownloadCard() {
  const router = useRouter()

  return (
    <div
      className={css.card}
      role="button"
      tabIndex={0}
      onClick={() => router.push("/projects/flappy-bird")}
      onKeyDown={(e) =>
        e.key === "Enter" && router.push("/projects/flappy-bird")
      }
    >
      <div className={css.image}>
        <Image
          src="/img/flappy-bird-preview.webp"
          alt="Flappy Bird Game Preview"
          width={320}
          height={320}
        />
      </div>

      <div className={css.content}>
        <h3>Flappy Bird</h3>

        <p>
          A simple 2D Flappy Bird–style game built using Unity and C#.
        </p>

        <div className={css.stack}>
          <span>Unity</span>
          <span>C#</span>
          <span>Game Dev</span>
        </div>

        {/* ⬇️ DOWNLOAD BUTTON (STOPS CARD CLICK) */}
        <a
          href="/downloads/flappy-bird.zip"
          download
          className={css.downloadBtn}
          onClick={(e) => e.stopPropagation()}
        >
          Download Game
        </a>
      </div>
    </div>
  )
}

import { useEffect, useState } from "react";

export default function Preloader() {
  const [show, setShow] = useState(true);

  useEffect(() => {

    const timer = setTimeout(() => {
      setShow(false);
    }, 3500); // duration of animation

    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div style={styles.wrapper}>
      <video
        src="/preloader.webm"
        autoPlay
        muted
        playsInline
        style={styles.video}
      />
    </div>
  );
}

const styles = {
  wrapper: {
    position: "fixed",
    inset: 0,
    background: "#000",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  },
  video: {
    width: "auto",
    height: "auto",
  },
};

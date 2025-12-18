export default function Watermark() {
  const marks = Array.from({ length: 40 })

  return (
    <div className="watermark">
      {marks.map((_, i) => (
        <span key={i}>LakshyaBadjatya.com</span>
      ))}
    </div>
  )
}

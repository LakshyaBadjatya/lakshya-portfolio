import { useRouter } from "next/router"
import Navbar from "./navbar"
import Footer from "./footer"

export default function Layout({ children }) {
  const router = useRouter()

  // Decide header title based on route
  const headerTitle = router.pathname.startsWith("/projects")
    ? "Projects"
    : "Lakshya Badjatya"

  return (
    <>
      <Navbar title={headerTitle} />
      <main>{children}</main>
      <Footer />
    </>
  )
}

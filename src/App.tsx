import Md from "./components/Md"
import { Analytics } from "@vercel/analytics/react"

function App() {
  return (
    <>
      <div className="min-h-screen w-full dark:bg-black bg-white dark:bg-grid-white/[0.1] bg-grid-black/[0.1] relative flex items-center justify-center">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

      {/* put componets here */}
      <div className="z-40 w-full">
        <Md/>
      </div>
    </div>
    </>
  )
}

export default App

import Md from "./components/Md"
import { Analytics } from "@vercel/analytics/react"

export default function App() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-1">
        <div className="w-full max-w-8xl bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <Md />
        </div>
      </div>
      <Analytics />
    </>
  )
}
import Bar from "./components/Bar"
import WindowManager from "./components/WindowManager"
import PagesManager from "./components/PagesManager"
import NotificationManager from "./components/NotificationManager"
import { useFFmpeg } from "./store/useFfmpeg"
import { useEffect } from "react"

function App() {
  const { loadFFmpeg } = useFFmpeg()

  useEffect(() => {
    const load = async () => {
      await loadFFmpeg()
    }

    load()
  }, [])

  return (
  <div className="overflow-hidden h-screen w-screen">
    <NotificationManager />

    <WindowManager />

    <PagesManager />

    <Bar />
  </div>
  )
}

export default App

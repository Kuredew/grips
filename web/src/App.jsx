import Bar from "./components/Bar"
import WindowManager from "./components/WindowManager"
import PagesManager from "./components/PagesManager"
import NotificationManager from "./components/NotificationManager"
import { useFFmpeg } from "./store/useFFmpeg"
import { useEffect } from "react"
import Loading from "./components/Loading"

function App() {
  const { loaded, loadFFmpeg } = useFFmpeg()

  useEffect(() => {
    const load = async () => {
      await loadFFmpeg()
    }

    load()
  }, [])

  return (
  <div className="overflow-hidden h-screen w-screen">
    <Loading />
    
    {loaded && (
      <>
      <NotificationManager />

      <WindowManager />

      <PagesManager />

      <Bar />
      </>
    )}
  </div>
  )
}

export default App

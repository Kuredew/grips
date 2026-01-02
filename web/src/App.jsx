import Bar from "./components/Bar"
import WindowManager from "./components/WindowManager"
import PagesManager from "./components/PagesManager"
import NotificationManager from "./components/NotificationManager"
import { useFFmpeg } from "./store/useFFmpeg"
import { useEffect } from "react"
import { MotionConfig } from "motion/react"
import { useSetting } from "./store/useSetting"
import { useResource } from "./store/useResource"

function App() {
  const { loadFFmpeg } = useFFmpeg()
  const { loadResource } = useResource()
  const { settings } = useSetting()

  useEffect(() => {
    const load = async () => {
      loadFFmpeg()
      loadResource()
    }

    load()
  }, [])

  return (
  <div className="overflow-hidden h-screen w-screen">
    <>
    <MotionConfig reducedMotion={`${settings['appearance']['reduceMotion'] ? "always" : "never"}`}>
    <NotificationManager />

    <WindowManager />

    <PagesManager />

    <Bar />
    </MotionConfig>
    </>
  </div>
  )
}

export default App

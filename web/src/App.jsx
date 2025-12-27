import Bar from "./components/Bar"
import WindowManager from "./components/WindowManager"
import PagesManager from "./components/PagesManager"
import NotificationManager from "./components/NotificationManager"

function App() {
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

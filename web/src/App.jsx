import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"

import Bar from "./components/Bar"
import AboutPage from "./pages/About"
import DownloadPage from "./pages/Download"
import SettingsPage from "./pages/Settings"
import DownloadIcon from "./components/icons/DownloadIcon"
import SettingsIcon from "./components/icons/SettingsIcon"
import AboutIcon from "./components/icons/AboutIcon"
import Notification from "./components/Notification"

function App() {
  const [activePage, setActivePage] = useState("download")

  const pages = [
    {
      id: "download", 
      page: <DownloadPage />,
      icon: <DownloadIcon />,
      action: () => setActivePage('download')
    },
    {
      id: "settings",
      page: <SettingsPage />,
      icon: <SettingsIcon />,
      action: () => setActivePage('settings')
    },
    {
      id: "about", 
      page: <AboutPage />,
      icon: <AboutIcon />,
      action: () => setActivePage('about')
    },
  ]

  return (
  <>
    <div className="w-50 absolute left-[50%] translate-x-[-50%] z-20">
      <Notification autoHide={true} />
    </div>

    <AnimatePresence mode="wait">
      {pages.map((item) => (
        activePage == item.id && (
          <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 flex items-center justify-center"
          >
            {item.page}
          </motion.div>
        )
      ))}
    </AnimatePresence>

    <div className="absolute bottom-0 mb-10 left-[50%] translate-x-[-50%]">
      <Bar pages={pages} />
    </div>

  </>
  )
}

export default App

import { AnimatePresence } from "motion/react";
import { useWindow } from "../store/useWindow";
import { INSTALLED_WINDOWS } from "../windows/registry";
import Window from "./Window";

export default function WindowManager() {
  const { activeWindows, closeWindow } = useWindow()

  return (
    <AnimatePresence>
      {activeWindows.map((activeWindowId) => {
        const windowInfo = INSTALLED_WINDOWS[activeWindowId]
        if (!windowInfo) return
        
        return (
          <Window
            key={activeWindowId}
            title={windowInfo.title}
            close={() => closeWindow(activeWindowId)}
          >
            {windowInfo.component}
          </Window>
        )
      })}
    </AnimatePresence>
  )
}
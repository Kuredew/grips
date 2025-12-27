import { motion, AnimatePresence } from "motion/react"
import { INSTALLED_PAGES } from "../pages/registry"
import { usePage } from "../store/usePage"

export default function PagesManager() {
  const { activePage } = usePage()

  return (
    <AnimatePresence mode="wait">
      <motion.div
          key={activePage}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.2 }}
          className="inset-0 flex items-center justify-center h-dvh w-dvw"
      >
        {INSTALLED_PAGES[activePage].component}
      </motion.div>
    </AnimatePresence>
  )
}
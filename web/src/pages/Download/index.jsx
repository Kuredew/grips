import { AnimatePresence, motion } from "motion/react"
import { useNotification } from "../../store/useNotification"
import { types } from "../../store/useNotification"
import { runDownloadTask } from "./services/download"
import { useState } from "react"
import DownloadIcon from "../../components/icons/DownloadIcon"
import Notification from "../../components/Notification"
import Window from "../../components/Window"

export default function DownloadPage() {
  const { addNotif, updateNotifFromId } = useNotification()
  const [activeModal, setActiveModal] = useState(null)

  const createNewBatch = () => {
    const notifId = addNotif("waiting", "getting ready...", types.PROGRESS, false)

    runDownloadTask((newProgress) => {
      updateNotifFromId(notifId, { progress: newProgress })
      console.log(`Updated ${notifId}`)
    })

    console.log("Batch created...")
  }

  return (
    <>
    <motion.div 
      onClick={() => setActiveModal("notification")}
      initial={{backgroundColor: "#121212"}}
      whileHover={{backgroundColor: "#292929", scale: 1.1}}
      whileTap={{scale: 0.95}}
      id="notifIcon" 
      className="absolute top-0 mt-30 p-2 border-2 border-[#1f1f1f] rounded-full scale-90 cursor-pointer"
    >
      <DownloadIcon />
    </motion.div>

    <AnimatePresence>
    {activeModal == "notification" && (
      <Window title={"Notification"} close={() => setActiveModal(null)}>
        <Notification autoHide={false} />
      </Window>
    )}
    </AnimatePresence>

    <div>
      <motion.button onClick={createNewBatch} whileTap={{scale: 0.95}} className="text-lg bg-white rounded-lg text-black px-3 py-2 cursor-pointer">download</motion.button>
    </div> 
    </>
  )
}
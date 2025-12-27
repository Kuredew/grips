import { motion } from "motion/react"
import { useNotification } from "../../store/useNotification"
import { types } from "../../store/useNotification"
import { runDownloadTask } from "./services/download"
import DownloadIcon from "../../components/icons/DownloadIcon"
import { useWindow } from "../../store/useWindow"

export default function DownloadPage() {
  const { addNotif, updateNotifFromId } = useNotification()
  const { openWindow } = useWindow()

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
      onClick={() => openWindow("notification")}
      initial={{backgroundColor: "#121212"}}
      whileHover={{backgroundColor: "#292929", scale: 1.1}}
      whileTap={{scale: 0.95}}
      id="notifIcon" 
      className="absolute top-0 mt-30 p-2 border-2 border-[#1f1f1f] rounded-full scale-90 cursor-pointer"
    >
      <DownloadIcon />
    </motion.div>

    <div>
      <motion.button onClick={createNewBatch} whileTap={{scale: 0.95}} className="text-lg bg-white rounded-lg text-black px-3 py-2 cursor-pointer">download</motion.button>
    </div> 
    </>
  )
}
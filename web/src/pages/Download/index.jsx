import { motion } from "motion/react"
import { useNotification } from "../../store/useNotification"
import { types } from "../../store/useNotification"
import DownloadIcon from "../../components/icons/DownloadIcon"
import { useWindow } from "../../store/useWindow"
import { useFFmpeg } from "../../store/useFfmpeg"
import { useState } from "react"
import DownIcon from "../../components/icons/DownIcon"

export default function DownloadPage() {
  const [fileURL, setFileURL] = useState(null)
  const [mode, setMode] = useState(null)
  const { addNotif, updateNotifFromId } = useNotification()
  const { convertVideo } = useFFmpeg()
  const { openWindow } = useWindow()

  const modes = [
    {  }
  ]

  const createNewBatch = async () => {
    console.log("[batch] batch created")

    // create new notification
    const notifId = addNotif("waiting", "getting ready...", types.PROGRESS, false)
    console.log('[batch] notification created')

    console.log('[batch] starting download...')
    const exampleURL = 'https://res.cloudinary.com/ddsuizdgf/video/upload/v1766837725/Out_s89xtz.mp4'
    const setProgress = (newProgress) => updateNotifFromId(notifId, { progress: newProgress })
    const setLog = (newLog) => updateNotifFromId(notifId, { message: newLog })
      
    await convertVideo('video.webm', exampleURL, setProgress, setLog)
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

    <div className="text-3xl mb-5">
      grips
    </div>

    <div>
      <motion.div whileTap={{borderColor: "#ffffff"}} id="form" className="flex gap-3 border-2 border-[#1f1f1f] py-2 px-3 rounded-t-xl w-[500px] max-w-[90dvw]">
        <input className="w-full outline-0 border-0 text-sm" placeholder="paste the url here yaps" type="text" onChange={(e) => setFileURL(e.target.value)} />

      </motion.div> 
      <div className="flex justify-between">
        <div className="flex border-2 border-[#1f1f1f] rounded-b-xl overflow-hidden">
          <div className="px-2 py-1 text-sm">
            video + audio
          </div>  
          <div className="px-2 py-1 text-sm bg-[#292929] text-white">
            audio only
          </div>  
        </div>
        <motion.div
          onClick={createNewBatch} 
          whileTap={{scale: 0.95}} 
          className="px-2 flex items-center justify-center text-sm bg-white rounded-b-xl text-black cursor-pointer"
        >
          start!
        </motion.div>
      </div>
    </div>
    </>
  )
}
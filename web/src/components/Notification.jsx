import { useState } from "react"
import { useNotification } from "../store/useNotification"
import { types } from "../store/useNotification"
import CloseIcon from "./icons/CloseIcon"
import VideoIcon from "./icons/VideoIcon"
import { AnimatePresence, motion } from "motion/react"
import { useEffect } from "react"

export default function Notification({autoHide}) {
 const { notifs, deleteNotifFromId } = useNotification()
 const [hideNotifs, setHideNotifs] = useState([])
 const [active, setActive] = useState(null)

 useEffect(() => {
  if (!autoHide || !notifs.length >= 1) {
    return
  }

  const id = notifs[notifs.length-1].id
  if (hideNotifs.includes(id)) {
    return
  }

  setTimeout(() => {
    if (hideNotifs.includes(id)) {
      return
    }

    setHideNotifs(prev => [...prev, id])
  }, 3000)
 }, [notifs])

 if (notifs.length > 0) return (
    <div className="z-20 flex flex-col-reverse gap-2 pt-3 w-full justify-center items-center">
      <AnimatePresence>
        {notifs.map(notif => !hideNotifs.includes(notif.id) && (
          <motion.div 
              layout
              onMouseEnter={() => setActive(notif.id)}
              onMouseLeave={() => setActive(null)}
              initial={{opacity: 0, scale: 0.95}}
              animate={{opacity: 1, scale: 1}}
              exit={{opacity: 0, scale: 0.95}}
              whileHover={{scale:1.05, backgroundColor: "#292929"}}
              className="overflow-hidden relative w-full flex gap-2 bg-[#121212] items-center border-2 border-[#1f1f1f] px-3 py-2 rounded-xl" key={notif.id}
            >
              <div id="icon" className="min-w-10 min-h-10 flex justify-center items-center text-black bg-white rounded-lg">
                <VideoIcon />
              </div>

              <div className="w-full overflow-hidden">
                <div id="title">
                  {notif.title}
                </div>

                <div id="message" className="text-[12px] text-nowrap w-full overflow-hidden">
                  {notif.message}
                </div>

                {notif.type == types.PROGRESS && (
                  <div className="w-full mt-2 h-px bg-[#505050]">
                    <div className={`bg-[#ffffff] h-px`} style={{ width: `${notif.progress}%` }}>
                    </div>
                  </div>
                )}
              </div>

            <AnimatePresence>
            {active == notif.id && notif.canDelete && (
              <motion.div 
                onClick={() => deleteNotifFromId(notif.id)}
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                whileHover={{scale: 1.1}} id="closeIcon" className="absolute top-0 right-0 p-2 scale-70 cursor-pointer"
              >
                <CloseIcon />
              </motion.div>
            )}
            </AnimatePresence>
          </motion.div>
        ))}
        </AnimatePresence>
    </div>
  ) 
  else if (!autoHide) {
    return (<div className="text-sm">theres nothing here :/</div>)
  }
}
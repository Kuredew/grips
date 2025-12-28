import { AnimatePresence, motion } from "motion/react";
import { useFFmpeg } from "../store/useFFmpeg";

export default function Loading() {
  const { loaded } = useFFmpeg()

  return (
    <AnimatePresence>
      {!loaded && (
        <motion.div 
          initial={{opacity: 0, scale: 0.95}}
          animate={{opacity: 1, scale: 1}}
          exit={{opacity: 0, scale: 1.1}}
          className="fixed bg-black flex items-center justify-center flex-col gap-10 w-dvw h-dvh"
        >
            <div
              className="text-2xl"
            >
              stealing your data...
            </div>
            <div
              className="text-sm"
            >
              im just kidding, lets wait till ffmpeg loaded okay?
            </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
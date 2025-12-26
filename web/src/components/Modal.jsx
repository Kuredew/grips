import { motion } from "motion/react";
import BackIcon from "./icons/BackIcon";

export default function Modal({title, close, children})  {
  return (
    <div className="h-full w-full max-w-100 border-2 rounded-xl border-[#1F1F1F] bg-black">
      <div id="header" className="flex justify-between p-5">
        <motion.button key={"back"} whileHover={{scale:1.1}} whileTap={{scale:0.95}} onClick={close} className="cursor-pointer scale-80">
          <BackIcon />
        </motion.button>
        <p>{title}</p>
      </div>

      <div className="p-5">
        {children}
      </div>
    </div>
  )
}
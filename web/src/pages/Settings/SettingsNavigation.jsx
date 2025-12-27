import { motion } from "motion/react"

export default function Sidebar({menus}) {
  return (
    <div className="flex flex-col">
      {menus.map((item) => (
        <motion.button
        key={item.id}
        className={
          `w-[80dvw]
          max-w-90
          px-2 
          py-2 
          flex 
          gap-5
          items-center 
          border-2 
          border-[#1F1F1F]
          cursor-pointer
          ${item.id == "appearance" ? "rounded-t-xl" : ""}
          ${item.id == "audio" ? "rounded-b-xl" : ""}
          `
        }
        initial={{backgroundColor: "#121212"}}
        whileHover={{backgroundColor: "#292929"}}
        whileTap={{scale: 0.95}}
        onClick={item.action}>
          <div className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center">
            {item.icon}
          </div>
          {item.id}
        </motion.button>
      ))}
    </div>
  )
}
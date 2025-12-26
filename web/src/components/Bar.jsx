import { motion } from "motion/react"

export default function Bar({pages}) {
  return (
    <>
    <div className="flex gap-5 p-2 w-fit border-2 border-gray-600 rounded-xl text-black bg-black">
      {pages.map((item) => (
        <motion.button 
          key={item.id}
          onClick={item.action}
          whileHover={{scale: 1.1}}
          whileTap={{scale: 0.95}}
          className="bg-white p-5 h-5 w-5 flex justify-center items-center hover:cursor-pointer rounded-lg"
        >
          {item.icon}
        </motion.button>
      ))}
    </div> 
    </>
  )
}
import { motion } from "motion/react"
import { INSTALLED_PAGES } from "../pages/registry"
import { usePage } from "../store/usePage"

export default function Bar() {
  const { openPage } = usePage()
  const installedPageList = Object.values(INSTALLED_PAGES)

  return (
    <>
    <div className="flex gap-5 p-2 w-fit border-2 border-gray-600 rounded-xl text-black bg-black absolute bottom-0 mb-10 left-[50%] translate-x-[-50%]">
      {installedPageList.map((page) => (
        <motion.button 
          key={page.id}
          onClick={() => openPage(page.id)}
          whileHover={{scale: 1.1}}
          whileTap={{scale: 0.95}}
          className="bg-white p-5 h-5 w-5 flex justify-center items-center hover:cursor-pointer rounded-lg"
        >
          {page.icon}
        </motion.button>
      ))}
    </div> 
    </>
  )
}
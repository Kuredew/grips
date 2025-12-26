import { useState } from "react";
import Sidebar from "./Sidebar";
import AppearanceMenu from "./AppearanceMenu";
import { motion, AnimatePresence } from "motion/react";
import VideoMenu from "./VideoMenu";
import AudioMenu from "./AudioMenu";
import Modal from "../../components/Modal";
import SparklesIcon from "../../components/icons/SparklesIcon";
import VideoIcon from "../../components/icons/VideoIcon";
import AudioIcon from "../../components/icons/AudioIcon";

export default function SettingsPage() {
  const [activeMenu, setActiveMenu] = useState(null)
  const closeMenu = () => setActiveMenu(null)

  const menus = [
    {
      id: "appearance", 
      menu: <AppearanceMenu/>,
      icon: <SparklesIcon/>, 
      action: () => setActiveMenu('appearance')
    },
    {
      id: "video", 
      menu: <VideoMenu/>,
      icon: <VideoIcon/>, 
      action: () => setActiveMenu('video')
    },
    {
      id: "audio", 
      menu: <AudioMenu/>,
      icon: <AudioIcon/>, 
      action: () => setActiveMenu('audio')
    },
  ]

  return (
    <>
    <div className="py-10">
      <p className="text-lg text-center mb-5">settings</p>
      <AnimatePresence mode="wait">
        {menus.map(item => (
          activeMenu == item.id && (
            <motion.div
              key={item.id}
              initial={{opacity: 0, left: 100}}
              animate={{opacity: 1, left: 0}}
              exit={{opacity: 0, left: 100}}
              className="fixed top-0 left-0 w-dvw h-dvh flex justify-center items-center p-5"
            >
              
              <Modal title={item.id} close={closeMenu}>
                {item.menu}
              </Modal>
            </motion.div>
          )
        ))}
      </AnimatePresence>

      <Sidebar menus={menus} />
    </div>
    </>
  )
}
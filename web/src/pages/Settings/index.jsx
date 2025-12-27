import { useState } from "react";
import Sidebar from "./Sidebar";
import AppearanceMenu from "./AppearanceMenu";
import { motion, AnimatePresence } from "motion/react";
import VideoMenu from "./VideoMenu";
import AudioMenu from "./AudioMenu";
import Window from "../../components/Window";
import SparklesIcon from "../../components/icons/SparklesIcon";
import VideoIcon from "../../components/icons/VideoIcon";
import AudioIcon from "../../components/icons/AudioIcon";
import { Rnd } from "react-rnd";

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
      <AnimatePresence mode="wait">
        {menus.map(item => (
          activeMenu == item.id && (
          <Window title={item.id} close={closeMenu}>
            {item.menu}
          </Window>
          )
        ))}
      </AnimatePresence>
    <div>
      <p className="text-lg text-center mb-5">settings</p>
      <Sidebar menus={menus} />
    </div>
    </>
  )
}
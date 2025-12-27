import { useState } from "react";
import SettingsNavigation from "./SettingsNavigation";
import AppearanceSettings from "./AppearanceSettings";
import { motion, AnimatePresence } from "motion/react";
import VideoSettings from "./VideoSettings";
import AudioSettings from "./AudioSettings";
import Window from "../../components/Window";
import SparklesIcon from "../../components/icons/SparklesIcon";
import VideoIcon from "../../components/icons/VideoIcon";
import AudioIcon from "../../components/icons/AudioIcon";
import { useWindow } from "../../store/useWindow";

export default function SettingsPage() {
  const [activeMenu, setActiveMenu] = useState([])
  const { openWindow } = useWindow()

  const closeMenu = (menu) => {
    setActiveMenu(prev => {return prev.filter(active => active != menu)})
  }

  const addActiveMenu = (menu) => {
    if (activeMenu.includes(menu)) return;

    setActiveMenu(prev => [...prev, menu])
  }

  const menus = [
    {
      id: "appearance", 
      icon: <SparklesIcon/>, 
      action: () => openWindow('appearanceSettings')
    },
    {
      id: "video", 
      icon: <VideoIcon/>, 
      action: () => openWindow('videoSettings')
    },
    {
      id: "audio", 
      icon: <AudioIcon/>, 
      action: () => openWindow('audioSettings')
    },
  ]

  return (
    <>
    <div>
      <p className="text-lg text-center mb-5">settings</p>
      <SettingsNavigation menus={menus} />
    </div>
    </>
  )
}
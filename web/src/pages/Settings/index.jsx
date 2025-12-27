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

export default function SettingsPage() {
  const [activeMenu, setActiveMenu] = useState([])

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
      menu: <AppearanceSettings/>,
      icon: <SparklesIcon/>, 
      action: () => addActiveMenu('appearance')
    },
    {
      id: "video", 
      menu: <VideoSettings/>,
      icon: <VideoIcon/>, 
      action: () => addActiveMenu('video')
    },
    {
      id: "audio", 
      menu: <AudioSettings/>,
      icon: <AudioIcon/>, 
      action: () => addActiveMenu('audio')
    },
  ]

  return (
    <>
      <AnimatePresence>
        {activeMenu.map((menuId) => {
          const menuData = menus.find((m) => m.id === menuId)
          if (!menuData) return
          
          return (
            <Window 
              key={menuId}
              title={menuId}
              close={() => closeMenu(menuId)}
            >
              {menuData.menu}
            </Window>
          )
        })}
      </AnimatePresence>
    <div>
      <p className="text-lg text-center mb-5">settings</p>
      <SettingsNavigation menus={menus} />
    </div>
    </>
  )
}
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
      menu: <AppearanceMenu/>,
      icon: <SparklesIcon/>, 
      action: () => addActiveMenu('appearance')
    },
    {
      id: "video", 
      menu: <VideoMenu/>,
      icon: <VideoIcon/>, 
      action: () => addActiveMenu('video')
    },
    {
      id: "audio", 
      menu: <AudioMenu/>,
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
      <Sidebar menus={menus} />
    </div>
    </>
  )
}
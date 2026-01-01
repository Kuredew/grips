import SettingsNavigation from "./SettingsNavigation";
import SparklesIcon from "../../components/icons/SparklesIcon";
import VideoIcon from "../../components/icons/VideoIcon";
import AudioIcon from "../../components/icons/AudioIcon";
import { useWindow } from "../../store/useWindow";

export default function SettingsPage() {
  const { openWindow } = useWindow()

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
      id: "audio (soon)", 
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
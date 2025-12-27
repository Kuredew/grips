import { useState } from "react"
import SettingsList from "../../components/SettingsList"

export default function VideoSettings() {
  const [resolution, setResolution] = useState("Best")

  const settingsList = [
    {
      id: "preferredResolution",
      name: "preferred resolution",
      desc: "choose resolution what you want. if resolution is not present, let grips download the best for you",
      type: "radio",
      choices: ["Best", "1080p", "720p", "480p"],
      state: {
        value: resolution,
        set: (resolution) => setResolution(resolution)
      }
    },
    {
      id: "reEncodeVideo",
      name: "reEncode video",
      desc: "reEncode video to h264, enhance support for editing apps!",
      type: "toggle",
    },
    {
      id: "mergeAudio",
      name: "merge video",
      desc: "by default, grips will merge audio file to video, if you dont want to, simply turn off this option",
      type: "toggle",
    },
  ]

  return (
    <div>
      <SettingsList settingsList={settingsList} />
    </div>
  )
}
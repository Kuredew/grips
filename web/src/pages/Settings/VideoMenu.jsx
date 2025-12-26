import { useState } from "react"
import Menu from "../../components/Menu"

export default function VideoMenu() {
  const [resolution, setResolution] = useState("Best")

  const options = [
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
      <Menu options={options} />
    </div>
  )
}
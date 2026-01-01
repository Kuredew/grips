import Markdown from "react-markdown"
import frame from "../../assets/frame.png"
import { useVersion } from "../../store/useVersion"

export default function AboutPage() {
  const { version } = useVersion()
  const about = `
  ### ${version}

  # about grips 

  hello griperss!!!

  grips is here to help you save the videos you like from the web. now you no longer need to download a client or downloader.

  open this website, paste the URL, and download!

  most videos from the internet are WebM. Sometimes editing applications like AfterEffect won't import them. That's why grips also offers conversion, powered by ffmpeg WASM.

  that's it, thanks for reading.

  oh yeah, almost forgot. grips is heavily relies on [yt-dlp](https://github.com/yt-dlp/yt-dlp) and ib from [cobalt](https://cobalt.tools)
  `

  const footer = `
  grips is unlicensed, see [unlicense.org](https://unlicense.org/)
  `
  return (
    <>
    <div className="w-full h-[99dvh] p-10 overflow-y-auto scrollbar bg-blue-800 ">
      <div className="prose prose-sm prose-invert text-white pb-50">
        <Markdown children={about}/>
        <img src={frame} alt="" />
        <Markdown children={footer}/>
      </div>
    </div> 
    </>
  )
}
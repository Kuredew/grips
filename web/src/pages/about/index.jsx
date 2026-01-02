import Markdown from "react-markdown"
import frame from "../../assets/frame.png"
import { useResource } from "../../store/useResource"

export default function AboutPage() {
  const { announcementMd } = useResource()
  const about = `
  # about grips

  grips is here to help you save the videos you like from the web. now you no longer need to download a client or downloader.

  open this website, paste the URL, and download!

  grips created by kureichi(Kuredew)

  have a problem, feature suggestion, or want to contribute? just let me know in the [grips repository](https://github.com/Kuredew/grips).

  # announcement
  
  ${announcementMd}
  `

  const footer = `
  grips is unlicensed, see [unlicense.org](https://unlicense.org/)
  `
  return (
    <>
    <div className="w-full h-dvh p-10 overflow-y-auto scrollbar">
      <div className="prose prose-sm prose-invert text-white pb-50">
        <Markdown children={about}/>
        <img src={frame} alt="" />
        <Markdown children={footer}/>
      </div>
    </div> 
    </>
  )
}
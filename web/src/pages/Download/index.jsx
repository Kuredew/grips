import { motion } from "motion/react"
import { useNotification } from "../../store/useNotification"
import { types } from "../../store/useNotification"
import DownloadIcon from "../../components/icons/DownloadIcon"
import { useWindow } from "../../store/useWindow"
import { useState } from "react"
import { runDownloadTask } from "../../services/download"
import { useSetting } from "../../store/useSetting"
import { AVALAIBLE_SETTINGS } from "../../settings/registry"
import { useFFmpeg } from "../../store/useFFmpeg"
import filenamify from "filenamify"

export default function DownloadPage() {
  const { addNotif, updateNotifFromId } = useNotification()
  const { settings, updateSetting } = useSetting()
  const [mediaUrl, setMediaUrl] = useState('')
  const { openWindow } = useWindow()
  const { mergeMedia } = useFFmpeg()
  const avalaibleSettings = AVALAIBLE_SETTINGS['download']
  const downloadSettings = settings['download']
  const updateDownloadSetting = (subKey, value) => {
    updateSetting('download', subKey, value)
  }

  const createNewBatch = async () => {
    if (!mediaUrl) return
    try {
      new URL(mediaUrl)
    } catch {
      addNotif("hold up", "url is not valid folks!", types.MESSAGE, true)
      return
    }

    console.log("[batch] batch created")

    const notifId = addNotif("getting url info", "waiting api response...", types.PROGRESS, false)

    console.log('[batch] notification created')
    console.log('[batch] starting download...')
    setMediaUrl('')

    try {
      const playlistDataList = await runDownloadTask({ 
        url: mediaUrl, 
        mode: settings.download.mode, 
        option: { preferredResolution: settings.video.preferredResolution.replace('p', '') } 
      }, (progress) => updateNotifFromId(notifId, {
        title: progress.title,
        message: progress.log,
        progress: progress.progress ? progress.progress : 0,
      }))

      for (const fileList of playlistDataList) {
        // add default filename if title is empty
        fileList.title ? fileList.title = filenamify(fileList.title) : fileList.title = 'no-title'

        updateNotifFromId(notifId, { title: fileList.title, message: "processing..." })

        switch (settings.download.mode) {
          case 'video': {
            const outputFileName = `${fileList.title}.mp4`

            if (settings.video.mergeAudio) {
              const outputData = await mergeMedia(notifId, fileList.fileDataList, outputFileName, settings.video.reEncodeVideo)
              downloadFileData(outputData, outputFileName)
            } else {
              fileList.fileDataList.forEach((value, index) => {
                const outputFileName = index === 0 ? `${fileList.title}.mp4` : `${fileList.title}.mp3`
                downloadFileData(value, outputFileName)
              })
            }
            break
          }
          case 'audio': {
            const outputFileName = `${fileList.title}.mp3`

            fileList.fileDataList.forEach((value) => {
              downloadFileData(value, outputFileName)
            })
          }
        }

        updateNotifFromId(notifId, {
          message: "download finished!!",
          canDelete: true,
        })
      }
    } catch (e) {
      updateNotifFromId(notifId, {
        title: `error downloading files`,
        message: e.message,
        canDelete: true
      })
      console.error(`[batch] ${e.message}`)
    }
  }

  const downloadFileData = (fileData, filename) => {
    const blobUrl = URL.createObjectURL(new Blob([fileData.buffer]))
    const link = document.createElement('a');
    link.href = blobUrl;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl); 
  };

  return (
    <>
    <motion.div 
      onClick={() => openWindow("notification")}
      initial={{backgroundColor: "#121212"}}
      whileHover={{backgroundColor: "#292929", scale: 1.1}}
      whileTap={{scale: 0.95}}
      id="notifIcon" 
      className="absolute top-0 mt-30 p-2 border-2 border-[#1f1f1f] rounded-full scale-90 cursor-pointer"
    >
      <DownloadIcon />
    </motion.div>

    <div className="text-3xl mb-5">
      grips
    </div>

    <div>
      <motion.div whileTap={{borderColor: "#ffffff"}} id="form" className="flex gap-3 border-2 border-[#1f1f1f] py-2 px-3 rounded-t-xl w-[500px] max-w-[90dvw]">
        <input value={mediaUrl} className="w-full outline-0 border-0 text-sm" placeholder="paste the url here yaps" type="text" onChange={(e) => setMediaUrl(e.target.value)} />

      </motion.div> 
      <div className="flex justify-between">
        <div className="flex border-2 border-[#1f1f1f] rounded-b-xl overflow-hidden">
        {avalaibleSettings['mode'].choices.map((choice) => (
            <div key={choice} onClick={() => {updateDownloadSetting('mode', choice)}} className={`cursor-pointer px-2 py-1 text-sm ${choice == downloadSettings['mode'] ? "bg-[#292929] text-white" : ""}`}>
              {choice}
            </div>  
        ))}
        </div>
        <motion.div
          onClick={createNewBatch} 
          whileTap={{scale: 0.95}} 
          className="px-2 flex items-center justify-center text-sm bg-white rounded-b-xl text-black cursor-pointer"
        >
          start!
        </motion.div>
      </div>
    </div>
    </>
  )
}
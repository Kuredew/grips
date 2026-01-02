const ANNOUNCEMENT_MD_URL = import.meta.env.VITE_ANNOUNCEMENT_MD_URL

export const getAnnouncementMd = async () => {
  try {
    const response = await fetch(ANNOUNCEMENT_MD_URL) 

    if (!response.ok) {
      throw new Error("announcement url response isn't ok")
    }
    const reader = response.body.getReader()
    const decoder = new TextDecoder('utf-8')

    const { value } = await reader.read()
    const announcementMd = decoder.decode(value)

    return announcementMd
  } catch (e) {
    throw new Error(`getAnnouncementMd: ${e.message}`)
  }
}
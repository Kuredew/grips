
import { create } from "zustand";
import { getLatestTagName } from "../services/githubService";
import { getAnnouncementMd } from "../services/resourceService";

export const useResource = create((set, get) => ({
  version: '',
  announcementMd: '',
  status: '',
  loadResource: async () => {
    const { status } = get()
    if (status == 'loading' || status == 'loaded') {
      console.warn('[useVersion] ignore load resource because version is loading')
      return
    }
    console.log('[useResource] loading resource')

    set(() => ({ status: 'loading' }))
    try {
      const latestVersion = await getLatestTagName()
      const announcementMd = await getAnnouncementMd()

      set(() => ({ 
        version: latestVersion, 
        announcementMd: announcementMd,
        status: 'loaded'
      }))
      console.log('[useResource] loaded resource')
    } catch (e) {
      console.error(`[useResource] ${e.message}`)
    }
  }
}))
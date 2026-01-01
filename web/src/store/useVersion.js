import { create } from "zustand";
import { getLatestTagName } from "../services/githubService";

export const useVersion = create((set, get) => ({
  version: '',
  status: '',
  loadVersion: async () => {
    const { status } = get()
    if (status == 'loading' || status == 'loaded') {
      console.warn('[useVersion] ignore load version because version is loading')
      return
    }
    set(() => ({ status: 'loading' }))

    try {
      const latestVersion = await getLatestTagName()
      set(() => ({ version: latestVersion, status: 'loaded' }))
    } catch (e) {
      console.error(`[useVersion] ${e.message}`)
    }
  }
}))
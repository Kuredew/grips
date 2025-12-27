import { create } from "zustand";

export const usePage = create((set) => {
  return {
    activePage: 'downloadPage',
    openPage: (pageId) => set(() => ({activePage: pageId}))
  }
})
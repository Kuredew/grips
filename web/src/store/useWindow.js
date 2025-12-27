import { create } from "zustand";

export const useWindow = create((set) => {
  return {
    activeWindows: [],
    openWindow: (id) => {set((state) => {
      if (state.activeWindows.includes(id)) return state
      console.log(`[useWindow/openWindow] Opening window (${id})`)

      return {
        activeWindows: [...state.activeWindows, id]
      }
    })},
    closeWindow: (id) => {set((state) => {
      console.log(`[useWindow/closeWindow] Closing window (${id})`)
      return {
        activeWindows: state.activeWindows.filter((activeWindowid) => activeWindowid != id)
      }
    })}
  }
})
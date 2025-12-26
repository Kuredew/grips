import { create } from "zustand";

export const types = {
  PROGRESS: "PROGRESS",
  MESSAGE: "MESSAGE"
}

const notification = create((set) => ({
  notifs: [],
  addNotif: (title, message, type, canDelete) => {
    const id = Date.now()
    set(state => ({
      notifs: [...state.notifs, {
        id: id,
        title: title,
        type: type,
        message: message,
        progress: 0,
        canDelete: canDelete
      }]
    }))

    return id
  },
  updateNotifFromId: (id, newNotif) => {
    // idk why but yeah
    set((state) => ({
      notifs: state.notifs.map(notif => {
          if(notif.id == id) {
            return {...notif, ...newNotif}
          } else {
            return notif
          }
      })
    }))

    return id
  },
  deleteNotifFromId: (id) => {
    set(state => ({
      notifs: state.notifs.filter(notif => notif.id != id)
    }))

    return id
  }
}))

// as a new React developer (really!), 
// it was too confusing for me to have everything in one place, 
// so I broke it down.
export const useNotification = notification
import { create } from "zustand";
import { AVALAIBLE_SETTINGS } from "../settings/registry";

export const useSetting = create((set) => {
  console.log('[useSetting] grips settings system initializing...')
  let settingsJSONString = localStorage.getItem('settings')
  if (!settingsJSONString) localStorage.setItem('settings', "{}")

  let previousSettingsObject
  try {
    previousSettingsObject = JSON.parse(localStorage.getItem('settings'))
  } catch {
    previousSettingsObject = {}
  }

  const newSettingsObject = {}
  // add new setting if present and remove setting if not avalaible
  for (const settingKey in AVALAIBLE_SETTINGS) {
    const previous = previousSettingsObject[settingKey]

    if (previous) {
      newSettingsObject[settingKey] = previous; 
      console.log(`[useSetting] Appended previous setting (${JSON.stringify(previous, {}, 2)}) to (${settingKey})`)
    }
    else {
      newSettingsObject[settingKey] = {}
      console.log(`[useSetting] Appended new empty setting to (${settingKey})`)
    }

    for (const subSettingKey in AVALAIBLE_SETTINGS[settingKey]) {
      try {
        const previous = previousSettingsObject[settingKey][subSettingKey]
        newSettingsObject[settingKey][subSettingKey] = previous
        console.log(`[useSetting] Appended previous subSetting (${previous}) to (${subSettingKey})`)
      }
      catch {
        newSettingsObject[settingKey][subSettingKey] = AVALAIBLE_SETTINGS[settingKey][subSettingKey].default
        console.log(`[useSetting] Appended new subSetting (${AVALAIBLE_SETTINGS[settingKey][subSettingKey].default}) to (${subSettingKey})`)
      }
    }
  }

  console.log(newSettingsObject)
  localStorage.setItem('settings', JSON.stringify(newSettingsObject))

  return {
    settings: newSettingsObject,
    updateSetting: (key, subKey, value) => {
      let isAvalaible
      for (const avalaibleKey in AVALAIBLE_SETTINGS) {
        if (avalaibleKey === key) {for (const avalaibleSubKey in AVALAIBLE_SETTINGS[key]) {
            if (avalaibleSubKey === subKey) {
              isAvalaible = true
            }
        }}
      }
      if (!isAvalaible) {
        console.error(`[useSetting] Rejected update setting request because ${key}.${subKey} is not avalaible`)
        return
      }

      set((state) => { 
        const newState = { 
          settings: {
            ...state.settings, 
            [key]: {
              ...state.settings[key], 
              [subKey]: value
            }
          } 
        }

        console.log(`[useSetting] Updated setting at ${key}.${subKey} -> ${value}`)

        localStorage.setItem('settings', JSON.stringify(newState))
        return newState
      })
    }
  }
})
import { useState } from "react"
import SettingsList from "../../components/SettingsList"

export default function AppearanceMenu() {
  const [mode, setMode] = useState('dark')
  const settingsList = [
    {
      "id": "darkLightMode",
      "name": "dark / light mode",
      "desc": "like always, every site must have this option.",
      "choices": ["dark", "light"],
      "state": {
        value: mode,
        set: (mode) => setMode(mode)
      },
      "type": "radio"
    },
    {
      "id": "reduceMotion",
      "name": "reduce motion",
      "desc": "turn on this option if you have a very potato hardware :)",
      "type": "toggle"
    }
  ]
  return (
    <div>
      <SettingsList settingsList={settingsList} />
    </div>
  )
}
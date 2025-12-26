import { useState } from "react"
import Menu from "../../components/Menu"

export default function AppearanceMenu() {
  const [mode, setMode] = useState('dark')
  const options = [
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
      <Menu options={options} />
    </div>
  )
}
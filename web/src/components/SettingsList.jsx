import ToggleSwitch from "./ToggleSwitch"
import { motion } from "motion/react"
import { AnimatePresence } from "motion/react"
import { AVALAIBLE_SETTINGS, SETTINGS_TYPES } from "../settings/registry"
import { useSetting } from "../store/useSetting"

export default function SettingsList({settingKey}) {
  const { settings, updateSetting } = useSetting()
  const avalaibleSubSettings = AVALAIBLE_SETTINGS[settingKey]

  return (
    <div>
      {Object.keys(avalaibleSubSettings).map((subKey, index) => (
        <div key={index} className={`${index != 0 ? "mt-5" : ""}`}>
          {avalaibleSubSettings[subKey].type == SETTINGS_TYPES.TOGGLE && (
            <div className="flex justify-between bg-[#121212] border-2 border-[#1f1f1f] py-2 items-center px-4 rounded-xl">
              <p>{avalaibleSubSettings[subKey].name}</p>
              <ToggleSwitch initialValue={settings[settingKey][subKey]} onToggle={(value) => {updateSetting(settingKey, subKey, value)}} />
            </div>
          )}

          {avalaibleSubSettings[subKey].type == SETTINGS_TYPES.RADIO && (
            <div>
              <p className="mb-1">{avalaibleSubSettings[subKey].name}</p>

              <div className="flex bg-[#121212] border-2 border-[#1f1f1f] w-full py-1 justify-between items-center px-4 rounded-xl">
                {avalaibleSubSettings[subKey].choices.map(choice => (
                  <div key={choice}>
                    <AnimatePresence mode="wait">
                      {settings[settingKey][subKey] == choice && (
                        <motion.div 
                          initial={{color: "#ffffff", backgroundColor: "#000000"}}
                          animate={{color: "#000000", backgroundColor: "#ffffff"}}
                          exit={{color: "#ffffff", backgroundColor: "#000000"}}
                          // onClick={() => updateSetting(key, choice)} 
                          className={`cursor-pointer p-1 px-3 rounded-lg`}
                        >
                          {choice}
                        </motion.div>
                      )}

                      {settings[settingKey][subKey] != choice && (
                        <motion.div 
                          initial={{color: "#000000", backgroundColor: "#ffffff"}}
                          animate={{color: "#ffffff", backgroundColor: "#000000"}}
                          exit={{color: "#000000", backgroundColor: "#ffffff"}}
                          onClick={() => updateSetting(settingKey, subKey, choice)} 
                          className={`cursor-pointer p-1 px-3 rounded-lg`}
                        >
                          {choice}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          )}
          <p className="text-sm px-3 text-[#aaaaaa] mt-2">{avalaibleSubSettings[subKey].description}</p>
        </div>
      ))}
    </div>
  )
}
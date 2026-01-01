import ToggleSwitch from "./ToggleSwitch"
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

              <div className="flex bg-[#121212] border-2 border-[#1f1f1f] w-full justify-between items-center rounded-xl overflow-auto scrollbar-hide">
                {avalaibleSubSettings[subKey].choices.map(choice => (
                  <div key={choice} className="flex-1">
                      <div 
                        className={`
                          flex 
                          items-center 
                          justify-center 
                          text-sm 
                          cursor-pointer 
                          p-2 
                          px-3 
                          rounded-lg ${settings[settingKey][subKey] == choice ? "bg-[#e2e2e2] text-black" : "bg-black hover:bg-[#292929]"}
                          transition-all
                        `}
                        onClick={() => updateSetting(settingKey, subKey, choice)}
                      >
                        {choice}
                      </div>
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
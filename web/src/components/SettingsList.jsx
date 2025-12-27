import ToggleSwitch from "./ToggleSwitch"
import { motion } from "motion/react"
import { AnimatePresence } from "motion/react"

export default function Menu({settingsList}) {
  return (
    <div>
      {settingsList.map((item, index) => (
        <div className={`${index != 0 ? "mt-5" : ""}`}>
          {item.type == "toggle" && (
            <div className="flex justify-between bg-[#121212] border-2 border-[#1f1f1f] py-2 items-center px-4 rounded-xl">
              <p>{item.name}</p>
              <ToggleSwitch />
            </div>
          )}

          {item.type == "radio" && (
            <div>
              <p className="mb-1">{item.name}</p>

              <div className="flex bg-[#121212] border-2 border-[#1f1f1f] w-full py-1 justify-between items-center px-4 rounded-xl">
                {item.choices.map(choice => (
                  <div>
                    <AnimatePresence mode="wait">
                      {item.state.value == choice && (
                        <motion.div 
                          initial={{color: "#ffffff", backgroundColor: "#000000"}}
                          animate={{color: "#000000", backgroundColor: "#ffffff"}}
                          exit={{color: "#ffffff", backgroundColor: "#000000"}}
                          onClick={() => item.state.set(choice)} 
                          className={`cursor-pointer p-1 px-3 rounded-lg`}
                        >
                          {choice}
                        </motion.div>
                      )}

                      {item.state.value != choice && (
                        <motion.div 
                          initial={{color: "#000000", backgroundColor: "#ffffff"}}
                          animate={{color: "#ffffff", backgroundColor: "#000000"}}
                          exit={{color: "#000000", backgroundColor: "#ffffff"}}
                          onClick={() => item.state.set(choice)} 
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
          <p className="text-sm px-3 text-[#aaaaaa] mt-2">{item.desc}</p>
        </div>
      ))}
    </div>
  )
}
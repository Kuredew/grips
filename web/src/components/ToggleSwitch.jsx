import { motion } from "motion/react";
import { useState } from "react";

export default function ToggleSwitch({ initialValue = false, onToggle }) {
  const [isOn, setIsOn] = useState(initialValue);

  const toggleSwitch = () => {
    setIsOn(!isOn);
    if (onToggle) {
      onToggle(!isOn); // Kirim status baru ke parent jika ada callback
    }
  };

  return (
    <div 
      className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer 
                  ${isOn ? 'bg-green-700 justify-end' : 'bg-gray-600 justify-start'}`}
      onClick={toggleSwitch}
      data-ison={isOn}
    >
      <motion.div 
        className="w-6 h-6 bg-white rounded-full shadow-md" 
        layout 
      />
    </div>
  );
}
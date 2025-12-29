import { motion } from "motion/react";
import BackIcon from "./icons/BackIcon";
import { Rnd } from "react-rnd";
import { useEffect } from "react";
import { useRef } from "react";

export default function Window({title, close, children})  {
  const rndRef = useRef(null)

  useEffect(() => {
      if (rndRef.current) {
        // Get the Rnd element and its container
        const element = rndRef.current.getSelfElement();
        const ownerDocument = element.ownerDocument;
        const window = ownerDocument.defaultView;

        // Calculate the center position
        const x = (window.innerWidth / 2) - (element.clientWidth / 2);
        const y = (window.innerHeight / 2) - (element.clientHeight / 2);

        // Update the position
        rndRef.current.updatePosition({ x, y });
      }
    }, []); // Run only once after initial render

  return (
    <Rnd ref={rndRef} default={{x:0, y:0, width: "50dvw" }} maxWidth={'90vw'} className="z-900" dragHandleClassName="handle">
      <motion.div
        initial={{opacity: 0, scaleY: 0.95}}
        animate={{opacity: 1, scaleY: 1}}
        exit={{opacity: 0, scaleY: 0.95}}
        className="h-full w-full"
      >
        <div className="h-full w-full border-2 rounded-xl border-[#1F1F1F] flex flex-col bg-[#1d1d1d] overflow-hidden">
          <div id="header" className="flex justify-between p-5 handle gap-5">
            <motion.button key={"back"} whileHover={{scale:1.1}} whileTap={{scale:0.95}} onTap={close} className="cursor-pointer scale-80">
              <BackIcon />
            </motion.button>
            <p>{title}</p>
          </div>

          <div className="p-5 flex-1 overflow-auto scrollbar">
            {children}
          </div>
        </div>
      </motion.div>
    </Rnd>
  )
}
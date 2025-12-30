import { AnimatePresence, motion } from "motion/react";
import { useFFmpeg } from "../store/useFFmpeg";

export default function Loading() {
  const { loaded } = useFFmpeg()

  return (
    <AnimatePresence>
      {!loaded && (
        <motion.div 
          initial={{opacity: 0, scale: 0.95}}
          animate={{opacity: 1, scale: 1}}
          exit={{opacity: 0, scale: 1.1}}
          className="fixed flex bg-black items-center justify-center flex-col w-dvw h-dvh"
        >
          <style>{`
.loader .circle {
  position: absolute;
  width: 38px;
  height: 38px;
  opacity: 0;
  transform: rotate(225deg);
  animation-iteration-count: infinite;
  animation-name: orbit;
  animation-duration: 5.5s;
}
.loader .circle:after {
  content: '';
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 5px;
  background: #fff;
  box-shadow: 0 0 9px rgba(255, 255, 255, .7);
}
.loader .circle:nth-child(2) {
  animation-delay: 240ms;
}
.loader .circle:nth-child(3) {
  animation-delay: 480ms;
}
.loader .circle:nth-child(4) {
  animation-delay: 720ms;
}
.loader .circle:nth-child(5) {
  animation-delay: 960ms;
}
.loader .bg {
  position: absolute;
  width: 70px;
  height: 70px;
  margin-left: -16px;
  margin-top: -16px;
  border-radius: 13px;
  background-color: rgba(0, 153, 255, 0.69);
  animation: bgg 16087ms ease-in alternate infinite;
}
@keyframes orbit {
  0% {
    transform: rotate(225deg);
    opacity: 1;
    animation-timing-function: ease-out;
  }
  7% {
    transform: rotate(345deg);
    animation-timing-function: linear;
  }
  30% {
    transform: rotate(455deg);
    animation-timing-function: ease-in-out;
  }
  39% {
    transform: rotate(690deg);
    animation-timing-function: linear;
  }
  70% {
    transform: rotate(815deg);
    opacity: 1;
    animation-timing-function: ease-out;
  }
  75% {
    transform: rotate(945deg);
    animation-timing-function: ease-out;
  }
  76% {
    transform: rotate(945deg);
    opacity: 0;
  }
  100% {
    transform: rotate(945deg);
    opacity: 0;
  }
}`}</style>
            <div
              className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-100px] text-3xl sm:text-5xl"
            >
            grips
            </div>
            <div className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[100px] lg:translate-y-[200px] flex items-center justify-center flex-col gap-3 lg:gap-5">
            <div className="text-sm lg:text-lg">loading ffmpeg</div>
            <div class='flex items-center justify-center loader w-20 h-20 scale-60 sm:scale-80'>
              <div class='circle'></div>
              <div class='circle'></div>
              <div class='circle'></div>
              <div class='circle'></div>
              <div class='circle'></div>
            </div>
            </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
export const SETTINGS_TYPES = {
  RADIO: "radio",
  TOGGLE: "toggle"
}

export const AVALAIBLE_SETTINGS = {
  appearance: {
    darkLightMode: {
      id: "darkLightMode",
      name: "theme",
      description: "like always, every site must have this option.",
      choices: ["dark", "light"],
      type: SETTINGS_TYPES.RADIO,
      default: "dark"
    },
    reduceMotion: {
      id: "reduceMotion",
      name: "reduce motion",
      description: "turn on this option if you have a very potato hardware :)",
      type: SETTINGS_TYPES.TOGGLE,
      default: false
    }
  },
  video: {
    preferredResolution: {
      id: "preferredResolution",
      name: "preferred resolution",
      description: "choose resolution what you want. if resolution is not present, let grips download the best for you",
      type: SETTINGS_TYPES.RADIO,
      choices: ["Best", "1080p", "720p", "480p"],
      default: "Best"
    },
    reEncodeVideo: {
      id: "reEncodeVideo",
      name: "reEncode video",
      description: "reEncode video to h264, enhance support for editing apps!",
      type: SETTINGS_TYPES.TOGGLE,
      default: false
    },
    mergeAudio: {
      id: "mergeAudio",
      name: "merge video",
      description: "by default, grips will merge audio file to video, if you dont want to, simply turn off this option",
      type: SETTINGS_TYPES.TOGGLE,
      default: true
    }
  }
}
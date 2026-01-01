export const SETTINGS_TYPES = {
  RADIO: "radio",
  TOGGLE: "toggle"
}

export const AVALAIBLE_SETTINGS = {
  download: {
    mode: {
      id: 'mode',
      name: 'mode',
      description: 'select download mode',
      choices: ['video', 'audio'],
      type: SETTINGS_TYPES.RADIO,
      default: 'video'
    }
  },
  appearance: {
    darkLightMode: {
      id: "darkLightMode",
      name: "theme (soon)",
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
      description: "choose resolution what you want. grips will pick the best closest to the resolution you choose if the resolution isn't available",
      type: SETTINGS_TYPES.RADIO,
      choices: ["best", "1440p", "1080p", "720p", "480p", "360p", "240p", "144p"],
      default: "best"
    },
    reEncodeVideo: {
      id: "reEncodeVideo",
      name: "reEncode video (experimental)",
      description: "reEncode video to h264, enhance support for editing apps! (this settings only effect with merge audio enabled)",
      type: SETTINGS_TYPES.TOGGLE,
      default: false
    },
    mergeAudio: {
      id: "mergeAudio",
      name: "merge audio",
      description: "some video providers separate their video and audio. by default, grips will merge audio file to video, if you dont want to, simply turn off this option",
      type: SETTINGS_TYPES.TOGGLE,
      default: true
    }
  }
}
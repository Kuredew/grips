import { create } from "zustand";

type SettingType = {
  id: string;
  type: "switch" | "radio";
  title: string;
  description: string;
  radioContent?: {
    id: string;
    field: string;
    value: string;
  }[];
  defaultValue: string | boolean;
  onChange?: (value: string | boolean) => void;
};

type SettingsCategoryType = {
  id: string;
  title: string;
  settings: SettingType[];
};

const appearanceSettings: SettingType[] = [
  {
    id: "light-mode-switch",
    type: "switch",
    title: "Light Mode",
    description: "Turn on light mode for grips theme",
    defaultValue: false,
  },
];

const videoSettings: SettingType[] = [
  {
    id: "preferred-video-quality",
    type: "radio",
    title: "Preferred Quality",
    description: "Grips will try to find the quality set here",
    radioContent: [
      {
        id: "best",
        field: "Best",
        value: "best",
      },
      {
        id: "full-hd",
        field: "Full HD",
        value: "1080",
      },
      {
        id: "hd",
        field: "HD",
        value: "720",
      },
      {
        id: "sd",
        field: "SD",
        value: "480",
      },
      {
        id: "low",
        field: "Low",
        value: "360",
      },
    ],
    defaultValue: "best",
  },
  {
    id: "video-container",
    type: "radio",
    title: "Choose MP4 container",
    description: "Choose container for video file, like .mp4, .mkv etc",
    radioContent: [
      {
        id: "default",
        field: "Default",
        value: "default",
      },
      {
        id: "mp4",
        field: "MP4",
        value: "mp4",
      },
      {
        id: "mkv",
        field: "MKV",
        value: "mkv",
      },
      {
        id: "avi",
        field: "AVI",
        value: "avi",
      },
      {
        id: "mov",
        field: "MOV",
        value: "mov",
      },
    ],
    defaultValue: "default",
  },
  {
    id: "video-codec",
    type: "radio",
    title: "Choose MP4 codec (beta)",
    description:
      "Choose codec for video file, this will slow the process in potato hardware",
    radioContent: [
      {
        id: "default",
        field: "Default",
        value: "default",
      },
      {
        id: "h264",
        field: "H264",
        value: "h264",
      },
      {
        id: "h265",
        field: "H265",
        value: "h265",
      },
      {
        id: "av1",
        field: "AV1",
        value: "av1",
      },
      {
        id: "vp9",
        field: "VP9",
        value: "vp9",
      },
    ],
    defaultValue: "default",
  },
  {
    id: "notify-noaudio-switch",
    type: "switch",
    title: "Notify non-audio video",
    description:
      "Grips will notify if detected an non-audio video downloaded ( not implemented yet sorry :3 )",
    defaultValue: false,
  },
];

const audioSettings: SettingType[] = [
  {
    id: "audio-container",
    type: "radio",
    title: "Choose MP3 container",
    description: "Choose container for audio file, like .mp3, .aac etc",
    radioContent: [
      {
        id: "default",
        field: "Default",
        value: "default",
      },
      {
        id: "mp3",
        field: "MP3",
        value: "mp3",
      },
      {
        id: "wav",
        field: "WAV",
        value: "wav",
      },
      {
        id: "aac",
        field: "AAC",
        value: "aac",
      },
      {
        id: "flac",
        field: "FLAC",
        value: "flac",
      },
    ],
    defaultValue: "default",
  },
];

export const settingsManifest: SettingsCategoryType[] = [
  {
    id: "appearance",
    title: "Appearance",
    settings: appearanceSettings,
  },
  {
    id: "video",
    title: "Video",
    settings: videoSettings,
  },
  {
    id: "audio",
    title: "Audio",
    settings: audioSettings,
  },
];

type settingStoreProps = {
  settingsValues: Record<string, string | boolean>;
  loadStorage: () => void;
  setValue: (id: string, value: string | boolean) => void;
};

export const useSettingStore = create<settingStoreProps>((set) => ({
  settingsValues: {},
  loadStorage: () => {
    const defaultSettingsValues: Record<string, string | boolean> = {};

    settingsManifest.forEach((settingsCategory) => {
      settingsCategory.settings.forEach((setting) => {
        defaultSettingsValues[setting.id] = setting.defaultValue;
      });
    });

    const settingsValues = JSON.parse(
      localStorage.getItem("settingsValues") ?? "{}",
    );
    set(() => ({
      settingsValues: { ...defaultSettingsValues, ...settingsValues },
    }));

    console.log("[settings] Settings loaded");
  },
  setValue: (id, value) => {
    set((state) => {
      const newSettingsValues = { ...state.settingsValues, [id]: value };

      localStorage.setItem("settingsValues", JSON.stringify(newSettingsValues));
      return { settingsValues: newSettingsValues };
    });
  },
}));

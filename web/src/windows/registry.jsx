import Notification from "../components/Notification";
import AppearanceSettings from "../pages/settings/AppearanceSettings";
import AudioSettings from "../pages/settings/AudioSettings";
import VideoSettings from "../pages/settings/VideoSettings";

export const INSTALLED_WINDOWS = {
  notification: {
    id: 'notification',
    title: "notification history",
    component: <Notification autoHide={false} />
  },
  appearanceSettings: {
    id: 'appearanceSettings',
    title: "appearance settings",
    component: <AppearanceSettings />
  },
  videoSettings: {
    id: 'videoSettings',
    title: "video settings",
    component: <VideoSettings />
  },
  audioSettings: {
    id: 'audioSettings',
    title: "audio Settings",
    component: <AudioSettings />
  }
}
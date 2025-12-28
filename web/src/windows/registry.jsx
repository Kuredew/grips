import Notification from "../components/Notification";
import SettingsList from "../components/SettingsList";

export const INSTALLED_WINDOWS = {
  notification: {
    id: 'notification',
    title: "notification history",
    component: <Notification autoHide={false} />
  },
  appearanceSettings: {
    id: 'appearanceSettings',
    title: "appearance settings",
    component: <SettingsList settingKey={'appearance'} />
  },
  videoSettings: {
    id: 'videoSettings',
    title: "video settings",
    component: <SettingsList settingKey={'video'} />
  },
  audioSettings: {
    id: 'audioSettings',
    title: "audio Settings",
    component: <SettingsList settingKey={'audio'} />
  }
}
import AboutIcon from "../components/icons/AboutIcon";
import DownloadIcon from "../components/icons/DownloadIcon";
import SettingsIcon from "../components/icons/SettingsIcon";
import AboutPage from "./about";
import DownloadPage from "./download";
import SettingsPage from "./settings";

export const INSTALLED_PAGES = {
  aboutPage: {
    id: 'aboutPage',
    title: 'about page',
    icon: <AboutIcon />,
    component: <AboutPage />
  },
  downloadPage: {
    id: 'downloadPage',
    title: 'download page',
    icon: <DownloadIcon />,
    component: <DownloadPage />
  },
  settingsPage: {
    id: 'settingsPage',
    title: 'settings page',
    icon: <SettingsIcon />,
    component: <SettingsPage />
  }
}
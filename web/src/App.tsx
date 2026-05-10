/* eslint-disable react-hooks/exhaustive-deps */
import Navbar from "@/components/elements/Navbar";
import DownloadSection from "@/components/sections/DownloadSection";
import LoadingSection from "@/components/sections/LoadingSection";
import { useTheme } from "@/components/theme-provider";
import { useFFmpegStore } from "@/store/useFfmpegStore";
import { useSettingStore } from "@/store/useSettingStore";
import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";

const App = () => {
  const { setTheme } = useTheme();
  const { settingsValues, loadStorage } = useSettingStore();
  const { loadFFmpeg, status } = useFFmpegStore();

  useEffect(() => {
    loadStorage();
  }, []);

  useEffect(() => {
    const status = useFFmpegStore.getState().status;
    if (status === "ready") loadFFmpeg();
  }, []);

  useEffect(() => {
    const theme = settingsValues["light-mode-switch"] ? "light" : "dark";

    setTheme(theme);
  }, [settingsValues]);

  return (
    <>
      <Navbar />

      <AnimatePresence mode="wait">
        {status === "loaded" ? (
          <motion.div
            key={"download"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <DownloadSection />
          </motion.div>
        ) : (
          <motion.div
            key={"loading"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <LoadingSection />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default App;

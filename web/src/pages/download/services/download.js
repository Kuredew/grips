export const runDownloadTask = async (updateProgress) => {

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  let i = 0
  const startDelayedLoop = async () => {

    while (i < 100) {
      i += 10
      updateProgress(i)

      // Wait for 1 second before the next iteration
      await delay(1000); 
    }
  };

  await startDelayedLoop()

}
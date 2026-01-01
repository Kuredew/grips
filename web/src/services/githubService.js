const GITHUB_REPO_API_URL = "https://api.github.com/repos/Kuredew/grips"

export const getLatestReleaseInfo = async () => {
  try {
    const response = await fetch(GITHUB_REPO_API_URL) 

    if (!response.ok) {
      throw new Error("github response isn't ok")
    }

    return await response.json()
  } catch (e) {
    throw new Error(`getLatestReleseInfo: ${e.message}`)
  }
}

export const getLatestTagName = async () => {
  try {
    const latestReleaseInfo = await getLatestReleaseInfo()

    const latestTagName = latestReleaseInfo.tag_name
    if (!latestTagName) {
      throw new Error(`tag is not present`)
    }
    return latestReleaseInfo.tag_name
  } catch (e) {
    throw new Error(`getLatestTagName: ${e.message}`)
  }
}
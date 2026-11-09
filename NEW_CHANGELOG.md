## Update 0.2.0

### Api

- Fixed
  - Put the name of the api function into the error object


### Component

- Fixed
  - Add handle if announcement env variable does not exist
  - Add a max width to the components inside the error dialog


### Release

- Fixed
  - Force root version to 0.1.0


### Ytdlp

- Fixed
  - Remove the recode video argument when downloading to audio only mode


### General

- Added
  - [**breaking**] Add support if the submitted URL is a playlist
  - Add a step to remux all downloaded videos to mp4

- Fixed
  - Change the property attribute to name in the description meta tag
  - Add height to the gradient background element

## Update 0.1.0

### General

- Added
  - [**breaking**] Add sveltekit minimal project
  - [**breaking**] Add final grips landing page
  - Setup menubar and input field in grips dashboard
  - Add persistent input and media type radio input
  - Add settings menubar
  - Add settings menu ui and add new settings in settingsSchema
  - Add border-radius settings and improve settings state data
  - Implement all features until completion.
  - Add meta tags for seo and add grips logo and banner
  - Check backend health and send result to home page
  - Add dimmed whole screen if page loading takes up to 300ms
  - Add announcement in home page
  - Implement an announcement that rotates every 3 seconds
  - Automate delete media files after 4 hours
  - Add sitemap.xml route and use super-sitemap to generate sitemap

- Fixed
  - Change as: 'raw' to query: '?raw' in import.meta.glob
  - Correct insert the file_ext obtained from the backend
  - Fix wrong twitter meta tag in seo components
  - Home navigation bar overlapped
  - Check whether the media link is a video to ensure consitent formatting

## Update 2.2.0

### General

- Added
  - Add recode video to mp4 (h264) feature after media downloaded

- Fixed
  - Add web_embedded youtube player client to --extractor-args yt-dlp arguments
  - Add bgutil-ytdlp-pot-provider yt-dlp plugin

## Update 2.1.0

### General

- Added
  - Open the url and check the information first before adding it to the download queue
  - Add a click animation to the button component
  - Add file_ext to stream done event so frontend can use it
  - Add the auto mediaType to the download processing and integrate it into the UI so that user can select it
  - Add a modal dialog if the server doesn't response
  - Add click to copy error detail if queue is failed

- Fixed
  - Change the duration type from int to float64 because yt-dlp most returns float values for duration
  - Replace the fetch to EventSource to read log stream

## Update 2.0.0

### General

- Added
  - [**breaking**] Refactor the entire grips api source code to transition to a new download method
  - [**breaking**] Setup minimal sveltekit project for creating a new grips web
  - Add cors middleware to entire web endpoint
  - Add web download and get info functionality
  - Bind the mediatype state to getVideoUrl and downloadMedia func
  - Add download queue logic to queue system
  - Complete the queue feature so that it works perfectly
  - Add cookies.txt file path to yt-dlp arguments to reduce errors related to cookies
  - Add fetch github api in page header to display the latest version and commit hash

- Fixed
  - Disable error and warning yt-dlp output to prevent parsing yt-dlp output error
  - Add -print after_move:pathfile in yt-dlp argument to getting filepath after merge
  - Remove middleware in /stream endpoint so that the streams works properly
  - Remove and fix code syntax for eslint
  - Fix the incorrect css syntax in the border section that is causing a build error
  - Change fatal to regular log in the error log when .env is not found
  - Add --cookies argument to the getinfo function in yt-dlp service

- Docs
  - Replace the old README with the new, clearer one

## Update 1.2.0

### General

- Added
  - [**breaking**] Add improved grips web implementation
  - Add disable audio encode toggle

- Fixed
  - Urls separator not working
  - Encode audio error because ext file is not valid
  - Url validation not working properly

## Update 1.1.0

### General

- Added
  - Add ffmpeg loading information while hovered loading element
  - Add resourceService to get grips resource
  - Add useResource hooks to get grips resource
  - Add announcement and contribute info in about page

- Fixed
  - GithubService function always return undefined
  - Json unmarshall error because title sometimes returned invalid json string
  - Window overflow on mobile browser
  - Weird black bar on about page
  - API crash if .env is not present
  - Download error because urls doesnt separate

## Update 1.0.0

### General

- Added
  - Add API folder structure for grips
  - Add GetTitle function for getinfo endpoint
  - Add GetInfo handler to return video info
  - Assamble downloader and handler
  - Execute init in main function
  - Listen and Serve API
  - Add extractvideo function for extractvideo endpoint
  - Add extractvideo handler for extractvideo request
  - Add endpoint for extractvideo
  - Import new react vite project to web folder
  - Import unfinished react grips website
  - Add Notification state
  - Add delete notification function
  - Add notification daemon to app comp
  - Add close icon
  - Add tailwind-scrollbar plugin
  - Add notification daemon
  - Add base for download function using notification daemon
  - Add default string if notification is empty
  - Add custom hooks for page and window
  - Add manager for notification, pages, and window for maintain consistently
  - Add down icon
  - Add base ffmpeg custom hook system
  - Add grips settings system
  - Add ffmpeg loading because many grips function dependent on ffmpeg
  - Add unfinished basic download function
  - Add verbose and no playlist to display log more
  - Add proxy handler and endpoint to download from server
  - Add sleep helper function
  - Add cookies to yt-dlp argument to prevent ip blocked error
  - Add tailwind-scrollbar-hide plugin to index.css
  - Add spinner icon to display loading
  - Add github service for get latest tag and relese info
  - Add useVersion hook to check version
  - Load version in startup to check version
  - Add changelog for track changes

- Fixed
  - BinaryPath doesn't found ytdlp binary (this is for development)
  - Barcode not showing in about page
  - Notification cannot be deleted
  - Progress not working
  - Change function name to maintain consistently
  - Window overflow issue
  - Make body overflow hidden
  - Key not present
  - Save settings not working
  - Overflow issue
  - CORS problem with the dfferent localhost port
  - Make sure only add setTimeout after notification created
  - Import not resolve error
  - Ambigous variable name
  - Validate response and options is not working
  - Progress bug
  - Notification overflow if text is too many
  - Window overflow if content is too many
  - Progress bug
  - Concatenated Json error because api sometimes sending 2 chunks
  - Progress bugs and fix uncaught error
  - Error log is empty, change to return last obj
  - Some formats not found because args is wrong
  - Window is too small on mobile
  - Forgot to add ```!``` to loading check
  - Fix build error due to \ character at the end of command
  - Download progress over 100% because contentLength is not valid after resuming download
  - Support confinue checking not working

- Other
  - Change license from MIT to Unlicense
  - Fix eslint gave error to motion framer-motion

- Docs
  - Create README.md for grips project
  - Provide grips web information


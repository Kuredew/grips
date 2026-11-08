## Update 0.2.1

### Changelog

* Refactor
  - Remove seitokai anime image in repository and use ibb co for alt
  - Add 0.2.0 changelog version to web


### Config/cliff

* Misc
  - Customize changelog template

## Update 0.2.0

### Api

* Fixes
  - Put the name of the api function into the error object

* Refactor
  - Add latest log to queue error detail


### Component

* Fixes
  - Add handle if announcement env variable does not exist
  - Add a max width to the components inside the error dialog


### Config

* Misc
  - Add packages and schema in json
  - Add cliff config file for bump with git-cliff


### Readme

* Misc
  - Clarify required environment variables in README


### Release

* Fixes
  - Force root version to 0.1.0

* Misc
  - Add release please configuration for v0
  - Add release please manifest config
  - Add bootstrap-sha
  - Bump version to 0.2.0


### Taskfile

* Misc
  - Add a task file to quickly build and run the project


### Variable

* Refactor
  - Add schema to allow empty ANNOUNCEMENT_TSV_URL


### Workflow

* Misc
  - Remove release-type and add config file path to release-please step
  - Completly remove release-please workflows


### Ytdlp

* Fixes
  - Remove the recode video argument when downloading to audio only mode


### General

* Added
  - [**breaking**] Add support if the submitted URL is a playlist
  - Add a step to remux all downloaded videos to mp4

* Fixes
  - Change the property attribute to name in the description meta tag
  - Add height to the gradient background element

* Refactor
  - Replace the incorrect html tags with the recommended for seo
  - Add more descriptive icons and icon tags
  - Change the location for the <main> tag in the changelog page
  - Add json-ld into html head tag in seo component
  - Add transition class to element that needs animation

## Update 0.1.0

### Main

* Misc
  - Release 0.1.0


### General

* Added
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

* Fixes
  - Change as: 'raw' to query: '?raw' in import.meta.glob
  - Correct insert the file_ext obtained from the backend
  - Fix wrong twitter meta tag in seo components
  - Home navigation bar overlapped
  - Check whether the media link is a video to ensure consitent formatting

* Refactor
  - Disable input and add queue button if ready state is false
  - Move input value, media type value, and ready state to global state
  - [**breaking**] Remove v2 grips web source code
  - Setup directory for app page
  - Add bg-black to menubar item
  - Restructure the compoonents folder
  - Change page title to all page
  - Add markdown content to changelog object with content_raw key
  - Change video codec setting description
  - Make the page redirect button in the menu bar an anchor element
  - Print queue item error to console and improve queue item style component
  - Change queue icon to video if mediaType is video
  - Change z-index home navigation bar
  - Change changelogs title page
  - Provide an explanation in the status section on the home page

* Misc
  - Change default svelte readme to grips-web readme
  - Force next release version
  - Change date in 0.1.0 changelog markdown file
  - Fix image paths and update SvelteKit capitalization
  - Add google site verification for grips.vercel.app
  - Add image to readme in grips project
  - Change release date to Oct 15, 2026
  - Bump version from 0.0.1 to 0.1.0

## Update 2.2.0

### Main

* Misc
  - Release 2.2.0 (#76)


### General

* Added
  - Add recode video to mp4 (h264) feature after media downloaded

* Fixes
  - Add web_embedded youtube player client to --extractor-args yt-dlp arguments
  - Add bgutil-ytdlp-pot-provider yt-dlp plugin

* Refactor
  - Move required arguments to ytdlp struct
  - Add bgutil base url to --extractor-args yt-dlp arguments
  - Add `--js-runtimes node` to yt-dlp arguments
  - Move `-v` argument to only download yt-dlp argument

* Misc
  - Change yt-dlp plugin directory to /etc/yt-dlp-plugins
  - Fix not found bgutil yt-dlp zip file
  - Unzip cannot create directories in /etc/yt-dlp-plugins
  - Change regular alpine base image to node:26-alpine base image
  - Update grips download test file

## Update 2.1.0

### Main

* Misc
  - Release 2.1.0 (#63)


### General

* Added
  - Open the url and check the information first before adding it to the download queue
  - Add a click animation to the button component
  - Add file_ext to stream done event so frontend can use it
  - Add the auto mediaType to the download processing and integrate it into the UI so that user can select it
  - Add a modal dialog if the server doesn't response
  - Add click to copy error detail if queue is failed

* Fixes
  - Change the duration type from int to float64 because yt-dlp most returns float values for duration
  - Replace the fetch to EventSource to read log stream

* Refactor
  - Set the default font weight to 500
  - Move fetch version from lib to +layout.server.ts so the version data is immediately avalaible
  - Add sparkle icon if queue media type is auto
  - Change default queue title to media title instead of media url
  - Add setItem function to explicitly set queue detail
  - Add padding-inline to modal-content and transition fade to background
  - Change the error message to make it more user-friendly
  - Dont remove input.value if error occured
  - Enable cors in /health endpoint backend

* Misc
  - Remove unused dependency via go mod tidy
  - Use 1.27.1 go version and set alpine in stage 2 to make the build smaller
  - Add @zerodevx/svelte-toast libary

## Update 2.0.0

### Main

* Misc
  - Release 2.0.0 (#60)


### General

* Added
  - [**breaking**] Refactor the entire grips api source code to transition to a new download method
  - [**breaking**] Setup minimal sveltekit project for creating a new grips web
  - Add cors middleware to entire web endpoint
  - Add web download and get info functionality
  - Bind the mediatype state to getVideoUrl and downloadMedia func
  - Add download queue logic to queue system
  - Complete the queue feature so that it works perfectly
  - Add cookies.txt file path to yt-dlp arguments to reduce errors related to cookies
  - Add fetch github api in page header to display the latest version and commit hash

* Fixes
  - Disable error and warning yt-dlp output to prevent parsing yt-dlp output error
  - Add -print after_move:pathfile in yt-dlp argument to getting filepath after merge
  - Remove middleware in /stream endpoint so that the streams works properly
  - Remove and fix code syntax for eslint
  - Fix the incorrect css syntax in the border section that is causing a build error
  - Change fatal to regular log in the error log when .env is not found
  - Add --cookies argument to the getinfo function in yt-dlp service

* Refactor
  - [**breaking**] Delete the entire grips web source code to transition to the new web
  - Change font to ibm plex mono for web ui
  - Remove progress percent in progressEventData and leave log only
  - Fix the syntax that is causing the ESLint error
  - Simplfy ui design
  - Move the icons to a separate component file
  - Remove few words on the title home page
  - Change favicon icon to default grips web favicon

* Docs
  - Replace the old README with the new, clearer one

* Misc
  - Change semantic-release to release-please to release grips
  - Add test file to test all grips api endpoints
  - Add test javascript file to test grips download
  - Add storage and tmp folder to gitignore

## Update 1.2.0

### Release

* Misc
  - 1.2.0 [skip ci]


### General

* Added
  - [**breaking**] Add improved grips web implementation
  - Add disable audio encode toggle

* Fixes
  - Urls separator not working
  - Encode audio error because ext file is not valid
  - Url validation not working properly

* Refactor
  - [**breaking**] Delete all web project
  - Setup icon and banner for grips web
  - Improve toast position and information
  - Use base64 cookies from url instead of env

## Update 1.1.0

### Release

* Misc
  - 1.1.0 [skip ci]


### General

* Added
  - Add ffmpeg loading information while hovered loading element
  - Add resourceService to get grips resource
  - Add useResource hooks to get grips resource
  - Add announcement and contribute info in about page

* Fixes
  - GithubService function always return undefined
  - Json unmarshall error because title sometimes returned invalid json string
  - Window overflow on mobile browser
  - Weird black bar on about page
  - API crash if .env is not present
  - Download error because urls doesnt separate

* Refactor
  - Load .env environment variable and insert to variable
  - Load resource with useResource on startup

* Misc
  - Add google site verification for google search console
  - Remove unused folder and cleanup
  - Add godotenv to load .env file
  - Ignore .env file from git commit
  - Bring back loading element if ffmpeg is loading

## Update 1.0.0

### Release

* Misc
  - 1.0.0 [skip ci]


### General

* Added
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

* Fixes
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

* Other
  - Change license from MIT to Unlicense
  - Fix eslint gave error to motion framer-motion

* Refactor
  - Dont return json object if yt-dlp was error
  - Change logger to logrus
  - Inject logrus logger to struct
  - Implement the urlInfo object to maintain consistency
  - Implement response object for consistently
  - Extract title and video in single command
  - Remove gettitle call line because extractvideo can extract title and video at the same time
  - Implement Options struct
  - Use Options struct to communicate with worker
  - Change ```/extractvideo``` to ```/extract``` because handler can extract both video and audio
  - Add isValid function to check if some options is empty
  - Validate received options
  - Change default width to dvw
  - Improve settings menu UX
  - Use modal scrollbar to use tailwind-scrollbar
  - Change Modal to Window because this component is used to create floating window
  - Improve window UX
  - Use new window component
  - Add window manager for multiple window
  - Make file and component name right and not ambigous
  - Change folder name to lower case
  - Move pages and windows information to registry
  - Use manager to display component
  - Change folder name to lower case
  - Add base download page UI
  - Change to flex-col to use column mode
  - Collect all settings into one registry
  - Implement useSetting custom hook on component
  - Make window can drag to outside viewport
  - Implement ffmpeg load on web startup
  - Implement basic download
  - Implement queue system for FFmpeg hooks
  - Implement settings hook for download page
  - Separate responsibility to make maintain easily
  - Use new download function (unfinished)
  - Add necesarry options to ```runDownloadTask``` parameter
  - Throw an error if api status is ```ERROR```
  - Change struct object to follow grips client
  - Remove ```/getInfo``` endpoint because we'll not use it anymore
  - Change urlInfo object to list to fix ytdlp returned playlist
  - Change validator urlInfo object to array
  - Add more log and made mergeMedia function support reEncode
  - Implement basic download function
  - Override notification info if ffmpeg ```processInfo.processId``` is same as notifId
  - Use new download function and add basic download trigger
  - Add continue download support if connection closed and fix log
  - Use rs/cors to handle cors request
  - Add function name on log and remove mutable obj
  - Change loading page to windows 10 style
  - Use yt-dlp which is obtained from the python command
  - Revert to calling ytdlp from binarypath rather than from python module
  - Remove cookies from exec arguments
  - Pass cookies.txt path to YtDlpDownloader struct
  - Add prepare cookies to temporary folder to fix read only filesystem
  - Pass temporary folder path to ytdlpdownloader struct
  - Change temp folder to use ```createTemp()```
  - Remove unused variables
  - Return ```PrepareCookies()``` tempfile path and remove unused function
  - Remove deprecated handler
  - Prioritize non m3u8/hls formats because grips not yet support it
  - Proiritize https formats instead of m3u8
  - Sanitize media title using filenamify
  - Move the cookie source to the environment variable
  - Insert cookies from environment variables into ytdldownloader struct
  - Change icon to grips icon and change title to ```media``` instead of ```video```
  - Remove loading page and add motionConfig to handle reduceMotion setting option
  - Add loading spinner to download input
  - Change videoicon to downloadicon
  - Change motion.div to regular div to improve performance
  - Use overflow-hidden instead of checking index manually to round the border
  - Add scrollbar to about page
  - Implement version info dynamically by using useVersion hooks

* Docs
  - Create README.md for grips project
  - Provide grips web information

* Misc
  - Install tailwindcss for web
  - Install ibm plex mono font
  - Install motion for animation
  - Install tailwindcss/typography
  - Add zustand library for global state
  - Add eslint for development
  - Install tailwind-scrollbar
  - Install react-rnd
  - Add ffmpeg.wasm to grips web
  - Backups
  - Cleanup
  - Install nanoid
  - Add zod for parsing and validate object
  - Remove unnecessary comment
  - Install rs/cors to handle cors
  - Log a function caller to notification
  - Change responseHandler to LogHandler because exractUrlInfo must send log, not full obj
  - Ignore cookies txt from git commit
  - Add prepare cookies log to console
  - Add filenamify dependency to sanitize media title
  - Add dockerfile to simplify build configuration
  - Change golang version to 1.25.5-bookworm
  - Add log every response api received
  - Add tailwind-scrollbar-hide to dependency
  - Add soon information
  - Add soon information to theme setting
  - Remove unnecessary component
  - Add release ci for grips release
  - Add semantic-release configuration
  - Fix typo on ```permissions```
  - Fix some plugin not found by semantic-release
  - Refactor Semantic Release command in workflow
  - Update release workflow with checkout options


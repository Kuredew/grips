# Changelog

## [2.0.0](https://github.com/Kuredew/grips/compare/v1.2.0...v2.0.0) (2026-09-26)


### ⚠ BREAKING CHANGES

* setup minimal sveltekit project for creating a new grips web
* delete the entire grips web source code to transition to the new web
* refactor the entire grips api source code to transition to a new download method

### Features

* add cookies.txt file path to yt-dlp arguments to reduce errors related to cookies ([7c5f236](https://github.com/Kuredew/grips/commit/7c5f236f83e103dcc5e6d7c1234e59c0261b1c0d))
* add cookies.txt file path to yt-dlp arguments to reduce errors related to cookies ([a8cad7a](https://github.com/Kuredew/grips/commit/a8cad7a48add2937705722ffa4b6d5b15008f3e0))
* add cors middleware to entire web endpoint ([893d2ba](https://github.com/Kuredew/grips/commit/893d2baf2d8c7bad90f1a161007dbaea1e76182f))
* add download queue logic to queue system ([6a92eb4](https://github.com/Kuredew/grips/commit/6a92eb48fd45d49fadb0e2bc1e3c49459d4b71de))
* add fetch github api in page header to display the latest version and commit hash ([04355c4](https://github.com/Kuredew/grips/commit/04355c4610ad14db90eca8d14ba0d90903f70997))
* add more detailed error log information if the job actually fails ([6096e68](https://github.com/Kuredew/grips/commit/6096e68abadd534c39be728e1f793ccb62d2abe5))
* add page settings, a page navigation bar, and cleaned up all the ([d4fbeb3](https://github.com/Kuredew/grips/commit/d4fbeb39bc74acb813d6507dc178605183586b01))
* add web download and get info functionality ([3bc1281](https://github.com/Kuredew/grips/commit/3bc1281281f7b3608e53f936d1fa77c9671585f3))
* bind the mediatype state to getVideoUrl and downloadMedia func ([28ac6bb](https://github.com/Kuredew/grips/commit/28ac6bbb3cdd1398d38baba1ca91321d637ce346))
* complete the queue feature so that it works perfectly ([19557ff](https://github.com/Kuredew/grips/commit/19557ff08fe172a0423a3b790088473fba425d3a))
* refactor the entire grips api source code to transition to a new download method ([2b0112b](https://github.com/Kuredew/grips/commit/2b0112b536c0c0b53529a9b3ae62550b91dfcd07))
* setup minimal sveltekit project for creating a new grips web ([9a56ffc](https://github.com/Kuredew/grips/commit/9a56ffc1542ac1131446d3a1c008bf335a52dad1))


### Bug Fixes

* add --cookies argument to the getinfo function in yt-dlp service ([f6d6a6f](https://github.com/Kuredew/grips/commit/f6d6a6fe3a796d756bfd40903629938cf8e5dc75))
* add -print after_move:pathfile in yt-dlp argument to getting filepath after merge ([78030f7](https://github.com/Kuredew/grips/commit/78030f783a3cf48e57e585a2845b28d59e868f13))
* change fatal to regular log in the error log when .env is not found ([b867f29](https://github.com/Kuredew/grips/commit/b867f2990b4a4a1880fbcfba3f74ea28947091cb))
* context cancelled after /download endpoint finished ([7edfb5d](https://github.com/Kuredew/grips/commit/7edfb5d77e99ab05c69dcdd5bb7dceccecd91381))
* disable error and warning yt-dlp output to prevent parsing yt-dlp output error ([9552b60](https://github.com/Kuredew/grips/commit/9552b608bdad4b8d14da8828d14cfd0603fbde31))
* fix the incorrect css syntax in the border section that is causing a build error ([2cb514c](https://github.com/Kuredew/grips/commit/2cb514ca56b4e962c9f8f010350d4cf212cd5bdf))
* fix the incorrect css syntax in the border section that is causing a build error ([f05262a](https://github.com/Kuredew/grips/commit/f05262a0c0bcfc570288eeb908dd491a73210a04))
* remove and fix code syntax for eslint ([ac75b4a](https://github.com/Kuredew/grips/commit/ac75b4aa4854770874282b40241e3dc21bdaa131))
* remove middleware in /stream endpoint so that the streams works properly ([dd68083](https://github.com/Kuredew/grips/commit/dd68083a38431c33daa0f5537599b8f60b28c7ab))


### Code Refactoring

* delete the entire grips web source code to transition to the new web ([0b78fa4](https://github.com/Kuredew/grips/commit/0b78fa4ddd63d6ebce52326a9ba3f690e25d6408))

## [1.2.0](https://github.com/Kuredew/grips/compare/v1.1.0...v1.2.0) (2026-09-23)


### Bug Fixes

* Encode audio error because ext file is not valid ([ffdce1c](https://github.com/Kuredew/grips/commit/ffdce1c815c2b0948c35a2576c935f8d968ff2a2))
* url validation not working properly ([7fc8de4](https://github.com/Kuredew/grips/commit/7fc8de4f2f1ac9e5720b7534fb26fe67c0b7f677))
* urls separator not working ([370da99](https://github.com/Kuredew/grips/commit/370da991fb9e39be388f7a768c31572631f98193))


### Features

* add disable audio encode toggle ([abdf8f8](https://github.com/Kuredew/grips/commit/abdf8f8d72de322942ee19b0a36eac47e12b7b7c))

## [1.1.0](https://github.com/Kuredew/grips/compare/v1.0.0...v1.1.0) (2026-01-02)


### Bug Fixes

* API crash if .env is not present ([3c3f376](https://github.com/Kuredew/grips/commit/3c3f376f1647b9d5506c63ca68ca0accee31a556))
* Download error because urls doesnt separate ([9b0d0bc](https://github.com/Kuredew/grips/commit/9b0d0bc47a5bd4b4257061f635fbbb7f65d4fd53))
* githubService function always return undefined ([763f9b7](https://github.com/Kuredew/grips/commit/763f9b79fb0fda069270813c95dc14c32c230883))
* Json unmarshall error because title sometimes returned invalid json string ([3d0c4bf](https://github.com/Kuredew/grips/commit/3d0c4bf8be65055c9d84063f792445cbe454ae90))
* Weird black bar on about page ([7737eed](https://github.com/Kuredew/grips/commit/7737eed369cf6fa83fcbddc95d82646374e34755))
* Window overflow on mobile browser ([8f6e356](https://github.com/Kuredew/grips/commit/8f6e356144eca2a382363092a4069e09664706eb))


### Features

* Add announcement and contribute info in about page ([9496ccd](https://github.com/Kuredew/grips/commit/9496ccd9e49fb5827280ff44eefdfcaac352e69b))
* Add ffmpeg loading information while hovered loading element ([3ffd755](https://github.com/Kuredew/grips/commit/3ffd75543a6441c9ec9787c555ed26f13cfdb177))
* Add resourceService to get grips resource ([3e2b6b5](https://github.com/Kuredew/grips/commit/3e2b6b5e7d79f2df266cdef2928a7cb46d3e19aa))
* Add useResource hooks to get grips resource ([b11a4de](https://github.com/Kuredew/grips/commit/b11a4debe29f257123b9c226d82f71e9e064f4d9))

## 1.0.0 (2026-01-01)


### Bug Fixes

* Ambigous variable name ([d7afed9](https://github.com/Kuredew/grips/commit/d7afed9b639ab3bd08ac49e0376777e502498d55))
* Barcode not showing in about page ([b7b216b](https://github.com/Kuredew/grips/commit/b7b216b06974d795754f1a28bf83a2a95062a952))
* BinaryPath doesn't found ytdlp binary (this is for development) ([d6bff03](https://github.com/Kuredew/grips/commit/d6bff032dbe1797b12cc20566626cc92aa3d63cd))
* Change function name to maintain consistently ([59d9884](https://github.com/Kuredew/grips/commit/59d988460548b3699c11b9cd95dda148ecdb18ad))
* Concatenated Json error because api sometimes sending 2 chunks ([bed1e55](https://github.com/Kuredew/grips/commit/bed1e5521daf074f5b3c754c19024effd3a901f1))
* CORS problem with the dfferent localhost port ([a2dadf8](https://github.com/Kuredew/grips/commit/a2dadf84025b67c61e7a78c18d01fff1cb8b0154))
* Download progress over 100% because contentLength is not valid after resuming download ([f2ce543](https://github.com/Kuredew/grips/commit/f2ce543b012af69502f6286d42010b1db58e05f8))
* Error log is empty, change to return last obj ([e2a9e91](https://github.com/Kuredew/grips/commit/e2a9e91b75effca63db236fc239198722dc4aa99))
* Fix build error due to \ character at the end of command ([c36f985](https://github.com/Kuredew/grips/commit/c36f98599edbed895088320b6f630c3ed3e2fde8))
* Forgot to add ```!``` to loading check ([8c5c65a](https://github.com/Kuredew/grips/commit/8c5c65a67719de5a0a4022fa8920930dbb910957))
* Import not resolve error ([c6bc6b8](https://github.com/Kuredew/grips/commit/c6bc6b86b787789c346d80e0147df73c8fd3974d))
* Key not present ([9ec1e36](https://github.com/Kuredew/grips/commit/9ec1e3684c1dfcc5d65ba84d00147be423e90f16))
* Make body overflow hidden ([bab63b6](https://github.com/Kuredew/grips/commit/bab63b64d631745ec082c419b79180ab65686cba))
* Make sure only add setTimeout after notification created ([97fac57](https://github.com/Kuredew/grips/commit/97fac57123336d698d13af90306c70bb20e00260))
* Notification cannot be deleted ([c35969b](https://github.com/Kuredew/grips/commit/c35969b9f35566030573560f039589620093f57f))
* Notification overflow if text is too many ([c9bb95f](https://github.com/Kuredew/grips/commit/c9bb95fa5fa18e05b71d351d9a64c27649c886fb))
* Overflow issue ([92ceceb](https://github.com/Kuredew/grips/commit/92cecebad6069819a8e7540a95a3d2cf01fbe040))
* Progress bug ([2c2b8ec](https://github.com/Kuredew/grips/commit/2c2b8ece075294246a55b8afaac2deac8ab40c72))
* Progress bug ([53a23d2](https://github.com/Kuredew/grips/commit/53a23d2b06839c554c53bb32f815f522cea5adc9))
* Progress bugs and fix uncaught error ([79474dc](https://github.com/Kuredew/grips/commit/79474dcbb525ff14625e9772dd8d2170dd6f443f))
* Progress not working ([0f58366](https://github.com/Kuredew/grips/commit/0f58366a1f00d624e51c12f822b01d9d47daa1c2))
* Save settings not working ([4534a6d](https://github.com/Kuredew/grips/commit/4534a6de90478dfe18c0b957cf50b8eae5f4475b))
* Some formats not found because args is wrong ([83e5b51](https://github.com/Kuredew/grips/commit/83e5b51db4055fb42c71d6348821674a86ffe078))
* Support confinue checking not working ([5207ff2](https://github.com/Kuredew/grips/commit/5207ff2cb038eb6a612515c5fc5a83e2aac9a9fb))
* Validate response and options is not working ([6fc70ee](https://github.com/Kuredew/grips/commit/6fc70ee4168fb7a2a4de375a30d006ef4bad14c9))
* Window is too small on mobile ([cc253f8](https://github.com/Kuredew/grips/commit/cc253f882264e5a231b126716c761c9476e02028))
* Window overflow if content is too many ([ae261f5](https://github.com/Kuredew/grips/commit/ae261f50adfed270f99ab1e1b7a5d53148e40296))
* Window overflow issue ([6737ce3](https://github.com/Kuredew/grips/commit/6737ce30a1790e7a695156944ee1f20e94572ebb))


### Features

* Add API folder structure for grips ([ec38ac7](https://github.com/Kuredew/grips/commit/ec38ac788b3c80c6c9421a9f70945ebb884dcbcd))
* Add base ffmpeg custom hook system ([b532f42](https://github.com/Kuredew/grips/commit/b532f421713154bd5fb29965bac283df55e755e0))
* Add base for download function using notification daemon ([49717f2](https://github.com/Kuredew/grips/commit/49717f2a0099088e682db31b0b3cf389e0605383))
* Add changelog for track changes ([26a9cfe](https://github.com/Kuredew/grips/commit/26a9cfe5962fc1d5c98782ea3b137c29611bd6c1))
* Add close icon ([cdfe7ed](https://github.com/Kuredew/grips/commit/cdfe7ed4bbd28a4a3d48beef25db228653255648))
* Add cookies to yt-dlp argument to prevent ip blocked error ([6e23566](https://github.com/Kuredew/grips/commit/6e23566015f5ff50e361eaf345721a76b3313e22))
* Add custom hooks for page and window ([18a165b](https://github.com/Kuredew/grips/commit/18a165bf900686dce3b227e07f52f60568978767))
* Add default string if notification is empty ([9f13234](https://github.com/Kuredew/grips/commit/9f13234f3197cf89ddb2261cfd87e1c99147fbe4))
* Add delete notification function ([2848b8d](https://github.com/Kuredew/grips/commit/2848b8da91e525b97650d930faab2a9e92f82923))
* Add down icon ([19f4172](https://github.com/Kuredew/grips/commit/19f4172ae243c083e49f5e6bc6d6f9721caba836))
* Add endpoint for extractvideo ([23fa6ea](https://github.com/Kuredew/grips/commit/23fa6ea735416adcea0b7d61331adc4fd21dd388))
* Add extractvideo function for extractvideo endpoint ([e873318](https://github.com/Kuredew/grips/commit/e873318c5ecb6ab38fceb9f722892b00174ef637))
* Add extractvideo handler for extractvideo request ([5759e08](https://github.com/Kuredew/grips/commit/5759e08a1b29f1156c37da6f53fd39eef25d5782))
* Add ffmpeg loading because many grips function dependent on ffmpeg ([a9cb961](https://github.com/Kuredew/grips/commit/a9cb9611b656e52b21e29a75810731b93cbb9f6b))
* Add GetInfo handler to return video info ([a6351db](https://github.com/Kuredew/grips/commit/a6351db9b5cee0a5c0316ddb85bc93661053956b))
* Add GetTitle function for getinfo endpoint ([1f4e8e8](https://github.com/Kuredew/grips/commit/1f4e8e81d10292ef35ef142bb1e732f66146461b))
* Add github service for get latest tag and relese info ([4d60c1a](https://github.com/Kuredew/grips/commit/4d60c1a80de9aef816e98cb40028df84df12a1cb))
* Add grips settings system ([40eef62](https://github.com/Kuredew/grips/commit/40eef62e8a3d4b7f3cc810bfdf0098d20991d888))
* Add manager for notification, pages, and window for maintain consistently ([e104a3e](https://github.com/Kuredew/grips/commit/e104a3ec8431af07d28053ee1cf27b40fdf4b946))
* Add notification daemon ([16fd587](https://github.com/Kuredew/grips/commit/16fd5879103cbc1cdc07b421b37083b285b5e6f9))
* Add notification daemon to app comp ([f900e61](https://github.com/Kuredew/grips/commit/f900e616912e5e6107730939ad21d7a9ce0ea526))
* Add Notification state ([92db1b0](https://github.com/Kuredew/grips/commit/92db1b068791f036d0a490f4d0aeebf7604c5f4a))
* Add proxy handler and endpoint to download from server ([5736c9e](https://github.com/Kuredew/grips/commit/5736c9efbf0fba415ff13067cedda06ee221a633))
* Add sleep helper function ([e0fe0a3](https://github.com/Kuredew/grips/commit/e0fe0a38f0725b4fee814a58753d128aec71e708))
* Add spinner icon to display loading ([910e517](https://github.com/Kuredew/grips/commit/910e517362952a27a3a61a4b5ba7838a920ed056))
* Add tailwind-scrollbar plugin ([9ac416b](https://github.com/Kuredew/grips/commit/9ac416b11025620d4ebabb30a45f3ea4b50b9ec5))
* Add tailwind-scrollbar-hide plugin to index.css ([4b98b05](https://github.com/Kuredew/grips/commit/4b98b05cfb8034c63fddfa4f573edd011c4c334d))
* Add unfinished basic download function ([7f78da4](https://github.com/Kuredew/grips/commit/7f78da43f49366f6c8fdd3491897881e31f48a80))
* Add useVersion hook to check version ([67199f8](https://github.com/Kuredew/grips/commit/67199f85404ed244d4c2581b0709c57fea958ff6))
* Add verbose and no playlist to display log more ([ea68745](https://github.com/Kuredew/grips/commit/ea6874586b84bdb877115da60741cef88bf526cc))
* Assamble downloader and handler ([29b5387](https://github.com/Kuredew/grips/commit/29b53872ac22449de242a9daa806d598215f7614))
* Execute init in main function ([052b1bc](https://github.com/Kuredew/grips/commit/052b1bcc09ad3c1f499709bf758f57a851c68270))
* Import new react vite project to web folder ([5f1db42](https://github.com/Kuredew/grips/commit/5f1db42c870252bdfe01ac2c28123d16aae097ad))
* Import unfinished react grips website ([a81947c](https://github.com/Kuredew/grips/commit/a81947c2082cabd526cc5a1cb884ae599ed14a68))
* Listen and Serve API ([763bfe0](https://github.com/Kuredew/grips/commit/763bfe078c3e305ec7763e566362b6b8d4a0b98d))
* Load version in startup to check version ([3f6b085](https://github.com/Kuredew/grips/commit/3f6b085f42f466bf61cf177d022b39447e0fa568))

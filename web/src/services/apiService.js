import z from "zod"
const API_URL = import.meta.env.VITE_API_URL

const responseSchema = z.object({
  status: z.string(),
  description: z.string(),
  log: z.string(),
  info: z.array(
    z.object({
      title: z.string(),
      url: z.string()
    })
  ).nullable()
})

const optionsSchema = z.object({
  url: z.url(),
  mode: z.string(),
  option: z.object({
    preferredResolution: z.string().default('')
  })
})

const validateOptions = (options) => {
  try {
    return optionsSchema.parse(options)
  } catch (e) {
    console.warn(`[${validateOptions.name}] options is not valid: ${e}`)
    throw new Error('options object is not valid')
  }
}

const validateResponse = (responseObj) => {
  try {
    return responseSchema.parse(responseObj)
  } catch (e) {
    console.log(`[${validateResponse.name}] response is not valid: ${e}`)
    throw new Error('response object is not valid')
  }
}

export const extractUrlInfo = async (options, responseHandler) => {
  const requestUrl = `${API_URL}/extract`

  try {
    const validatedOptions = validateOptions(options)
    const optionsString = JSON.stringify(validatedOptions, {}, 2)
    console.log(`[${extractUrlInfo.name}] processing request that have options: ${optionsString}`)

    const response = await fetch(requestUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(validatedOptions)
    })

    if (!response.ok) {
      throw new Error(`response http (${response.status})`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');

    let lastResponseObj
    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      const chunkJsonString = decoder.decode(value)
      const fixedJsonString = chunkJsonString.replace(/}{/g, '},{')
      const jsonList = JSON.parse(`[${fixedJsonString}]`)

      const validatedResponse = validateResponse(jsonList[jsonList.length - 1])
      console.log(validatedResponse)

      responseHandler(validatedResponse)
      lastResponseObj = validatedResponse
    } 

    console.log(`[${extractUrlInfo.name}] stream finished`)
    console.log(`[${extractUrlInfo.name}] request finished that have options: ${optionsString}`)
    
    if (lastResponseObj.status === "ERROR") {
      throw new Error(lastResponseObj.log)
    }

    return lastResponseObj
  } catch (error) {
    console.warn(`[${extractUrlInfo.name}] error occured! : ${error}`)
    // console.warn(`[${extractUrlInfo.name}] aborted request that have option: ${optionsString}`)

    throw error
  }
}
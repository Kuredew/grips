const API_URL = import.meta.env.VITE_API_URL

const validateResponse = (jsonObj) => {
  try {
    return {
      status: jsonObj.Status,
      description: jsonObj.Description,
      log: jsonObj.Log,
      info: {
        title: jsonObj.Info.title,
        url: jsonObj.Info.url
      }
    }
  } catch (e) {
    console.warn(`[${validateResponse.name}] response is not valid: ${e}`)
    throw e
  }
}

const validateOptions = (options) => {
  try {
    return {
      url: options.url,
      mode: options.mode,
      option: {
        preferredResolution: options.preferredResolution
      }
    }
  } catch (e) {
    console.warn(`[${validateOptions.name}] options is not valid: ${e}`)
    throw e
  }
}

export const extractUrlInfo = async (options, responseHandler) => {
  const requestUrl = `${API_URL}/extract`
  const validatedOptions = validateOptions(options)
  const optionsString = JSON.stringify(validatedOptions, {}, 2)

  console.log(`[${extractUrlInfo.name}] processing request that have options: ${optionsString}`)

  try {
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
      const jsonObj = JSON.parse(chunkJsonString)

      const validatedResponse = validateResponse(jsonObj)

      responseHandler(validatedResponse)
      lastResponseObj = validatedResponse
    } 

    console.log(`[${extractUrlInfo.name}] stream finished`)
    console.log(`[${extractUrlInfo.name}] request finished that have options: ${optionsString}`)
    return lastResponseObj
  } catch (error) {
    console.warn(`[${extractUrlInfo.name}] error occured! : ${error}`)
    console.warn(`[${extractUrlInfo.name}] aborted request that have option: ${optionsString}`)

    throw error
  }
}
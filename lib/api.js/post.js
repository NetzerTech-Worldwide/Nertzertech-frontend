export const postData = async(url, options, answers) => {
    const response = await fetch(url, options)
    if (!response) {
        throw new Error(`HTTP Error: ${response.status}`)
    }
    const data = await response.json()
    return data
}

export const postSupportData = async (endPoint, rawData) => {
    const response = await fetch(endPoint, {
        method: "POST",
        body: rawData
    })
    if (!response.ok) {
        throw new Error("Failed")
    }
    return await response.json()
}
export const postData = async(url, options, answers) => {
    const response = await fetch(url, options)
    if (!response) {
        throw new Error(`HTTP Error: ${response.status}`)
    }
    const data = await response.json()
    return data
}
export const fetchData = async(url, options) => {
    const response = await fetch(url, options)
    if (!response) {
        throw new Error(`HTTP Error: ${response.status}`)
    }
    const data = await response.json()
    console.log(data)
    return data
}
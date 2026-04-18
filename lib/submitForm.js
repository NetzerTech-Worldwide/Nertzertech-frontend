export const submitForm = async(url, options) => {
    try {
        const response = await fetch(url, options)
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}` + `${response.message}`)
        }
        const result = await response.json()
        console.log(result)

    } catch (error) {
        console.log(error.message)
    }
}
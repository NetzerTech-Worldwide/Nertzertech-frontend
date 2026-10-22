export const options = (data) => {
    return {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phoneNumber: data.phone,
            message: data.message
        })
    }
}

// The /api proxy routes attach the auth token from the httpOnly cookie
export const getOptions = () => {
    return {
        method: "GET",
        headers: {
            "Content-Type" : "application/json"
        }
    }
}

export const postOptions = (data) => {
    return {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(data)
    }
}

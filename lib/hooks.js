"use client"

import { useMutation, useQuery } from "@tanstack/react-query"
import { fetchData } from "./api.js/fetch"
import { postData } from "./api.js/post"
import { useContext } from "react"
import { examContext } from "./context/examContext"

export const useFetchData = (url, options, cacheId) => {
    return useQuery({
        queryKey: [cacheId],
        queryFn: () => fetchData(url, options)
    })
}

export const useFetchDataWithId = (url, options, id, cacheId) => {
    return useQuery({
        queryKey: [cacheId, id],
        queryFn: () => fetchData(url, options)
    })
}

export const usePostData = (url, options, data) => {
    const { setSuccessModal } = useContext(examContext)
    return useMutation({
        mutationFn: () => postData(url, options, data),
        onSuccess: () => {
            setSuccessModal(true)
        },
        OnError: () => {
            setSuccessModal(false)
            alert('Something went wrong') 
        }
    })
}
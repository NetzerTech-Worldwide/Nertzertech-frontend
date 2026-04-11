"use client"

import { createContext, useState } from "react"

export const supportContext = createContext(null)

export const SupportProvider = ({ children }) => {
    const [supportModal, setSupportModal] = useState(false)

    const contextValues = {
        supportModal,
        setSupportModal
    }
    
    return (
        <supportContext.Provider value={contextValues}>
            {children}
        </supportContext.Provider>
    )
}
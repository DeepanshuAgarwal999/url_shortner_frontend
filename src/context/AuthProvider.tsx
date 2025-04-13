'use client'

import { makeRequest } from '@/apis/makeRequest'
import { createContext, useContext, useEffect, useState } from 'react'

export interface AuthContextProps {
    isLoggedIn: boolean
    setIsLoggedIn: (isLoggedIn: boolean) => void
    user: any
    setUser: (user: any) => void
}

const AuthContext = createContext<AuthContextProps>({
    isLoggedIn: false,
    setIsLoggedIn: () => { },
    user: null,
    setUser: () => { },
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState<any>(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            setIsLoggedIn(false)
            setUser(null)
        }
        else {
            (async () => {
                try {
                    setIsLoading(true)
                    const response = await makeRequest('/auth/me')
                    if (response) {
                        setIsLoggedIn(true)
                        setUser(response)
                    }
                } catch (error: any) {
                    localStorage.removeItem('token')
                    setIsLoggedIn(false)
                    setUser(null)

                } finally {
                    setIsLoading(false)
                }
            })()
        }
    }, [])


    const value = {
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        isLoading,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error('useAuth must be used within a AuthProvider')
    }

    return context
}



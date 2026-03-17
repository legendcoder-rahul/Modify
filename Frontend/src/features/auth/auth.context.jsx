import { createContext, useEffect, useState } from 'react'
import { getMe } from './services/auth.api'

export const AuthContext = createContext()

export const AuthProvider = ({children})=>{
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    async function handleGetMe() {
        try {
            setLoading(true)
            const data = await getMe()
            setUser(data.user)
            setLoading(false)
        } catch (error) {
            setUser(null)
            setLoading(false)
        }
    }

    useEffect(()=>{
        handleGetMe()
    },[])

    return (
        <AuthContext.Provider value={{user, setUser, loading, setLoading, handleGetMe}}>
            {children}
        </AuthContext.Provider>
    )
}
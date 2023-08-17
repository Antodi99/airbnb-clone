import axios from "axios"
import React, { createContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

type User = {
    name: string
    email: string
    password: string
}

type UserContextType = {
    user: User | undefined
    setUser: (user: User | undefined) => void
    ready: boolean
}

export const UserContext = createContext<UserContextType>({} as UserContextType)

type UserContextProvider = {
    children: React.ReactNode
}


export function UserContextProvider({ children }: UserContextProvider) {
    const navigate = useNavigate()
    const [user, setUser] = useState(undefined)
    const [ready, setReady] = useState(false)
    useEffect(() => {
        axios.get('/profile').then(({ data }) => {
            setUser(data)
            setReady(true)
        }).catch(() => {
            navigate('/login')
        })
    }, [])
    return (
        <UserContext.Provider value={{ user, ready, setUser: setUser as unknown as UserContextType['setUser'] }}>
            {children}
        </UserContext.Provider>
    )
}

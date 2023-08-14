import axios from "axios"
import React, { createContext, useEffect, useState } from "react"

type User = {
    name: string
    email: string
    password: string
}

type UserContextType = {
    user: User | undefined
    setUser: (user: User) => void
}

export const UserContext = createContext<UserContextType>({} as UserContextType)

type UserContextProvider = {
    children: React.ReactNode
}

export function UserContextProvider({ children }: UserContextProvider) {
    const [user, setUser] = useState(undefined)
    useEffect(() => {
        axios.get('/profile').then(({ data }) => {
            setUser(data)
        })
    }, [])
    return (
        <UserContext.Provider value={{ user, setUser: setUser as unknown as UserContextType['setUser'] }}>
            {children}
        </UserContext.Provider>
    )
}

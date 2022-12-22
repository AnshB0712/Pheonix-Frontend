import { useMemo } from "react";
import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

const AuthProvider = ({children}) => {
    const [user,setUser] = useState("")
    const memoisedValue = useMemo(() => ({user,setUser}))
    return(
        <AuthContext.Provider value={memoisedValue}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
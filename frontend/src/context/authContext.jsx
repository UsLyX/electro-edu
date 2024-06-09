import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(
        {
            email: '',
            lastName: '',
            firstName: '',
            password: '',
            role: '',
        }
    )
    return <AuthContext.Provider value={{user, setUser}}>{children}</AuthContext.Provider>;
};

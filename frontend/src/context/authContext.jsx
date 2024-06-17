import { createContext, useEffect, useState } from "react";
import axios from 'axios'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => localStorage.getItem('token') || null)
    const [user, setUser] = useState(null)

    useEffect(() => {
        const getUser = async () => {
            const config = {
                Authorization: "Bearer " + token
            }
            await axios.get(`${process.env.REACT_APP_API_URL}/user/info`, {headers: config})
            .then(res => {
                setToken(res.data.token)
                setUser(res.data.role == 'Ученик' ? {...res.data.student, role: 'Ученик'} : res.data.role == 'Учитель' ? {...res.data.teacher, role: 'Учитель'} : {...res.data.admin, role: 'Администратор'})
            })
            .catch(e => console.log('Ошибка при получении пользователя' + e))
        }
        if(token !== null){
            localStorage.setItem('token', token);
            getUser();
        } else{
            setUser(null)
            localStorage.removeItem('token')
        }
    }, [token])
    
    useEffect(() => {
        const getUser = async () => {
            const config = {
                Authorization: "Bearer " + token
            }
            await axios.get(`${process.env.REACT_APP_API_URL}/user/info`, {headers: config})
            .then(res => {
                setToken(res.data.token)
                setUser(res.data.role == 'Ученик' ? {...res.data.student, role: 'Ученик'} : res.data.role == 'Учитель' ? {...res.data.teacher, role: 'Учитель'} : {...res.data.admin, role: 'Администратор'})
            })
            .catch(e => console.log('Ошибка при получении пользователя' + e))
        }
        if(token !== null){
            localStorage.setItem('token', token);
            getUser();
        } else{
            setUser(null)
            localStorage.removeItem('token')
        }
    }, [])

    const login = (token) => {
        setToken(token)
    }

    const exit = () => {
        setToken(null)
    }

    return <AuthContext.Provider value={{token, setToken, user, setUser, exit, login}}>{children}</AuthContext.Provider>;
};

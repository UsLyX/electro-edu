import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const PredmetsContext = createContext();

export const PredmetsProvider = ({ children }) => {

    const [classId, setClassId] = useState()
    const [predmets, setPredmets] = useState()

    useEffect(() => {
        const getPredmets = async (studentClass) => {
            const data = {
              classId: Number(studentClass)
            }
            await axios.post(`${process.env.REACT_APP_API_URL}/student/predmets`, data)
            .then(res => {
              setPredmets(res.data)
            })
            .catch(e => console.log(e))
          }
          getPredmets(classId)  
    }, [classId])

    return <PredmetsContext.Provider value={{predmets, setPredmets, classId, setClassId}}>{children}</PredmetsContext.Provider>;
};

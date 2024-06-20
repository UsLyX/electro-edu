import React, { useContext, useEffect, useState } from 'react'
import style from './myPredmets.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../context/authContext'
import { PredmetsContext } from '../../../context/predmetsContext'
import axios from 'axios'

const MyPredmets = () => {
  const navigete = useNavigate()

  const { user } = useContext(AuthContext)
  const { predmets, setClassId } = useContext(PredmetsContext)

  const [currentPredmets, setCurrentPredmets] = useState()

  const getPredmets = async (studentClass) => {
    const data = {
      classId: studentClass
    }
    await axios.post(`${process.env.REACT_APP_API_URL}/student/predmets`, data)
    .then(res => {
      setCurrentPredmets(res.data)
    })
    .catch(e => console.log(e))
  }

  const changeUrl = (e) => {
    const predmet = e.target.offsetParent.childNodes[0].innerHTML;
    const selectPredmet = predmets.ClassLessons.find(item => item.lessonName === predmet)
    navigete(`${selectPredmet.id}/questions`)
  }

  useEffect(() => {
    setClassId(user.classId)
    getPredmets(user.classId)
  }, [])

  return (
    <div className={style.wrapper}>
      <h1 className={style.title}>Мои предметы</h1>
      {currentPredmets && currentPredmets.ClassLessons.length ? 
        (
          <>
            <div className={style.category}>
              <p>Название предмета</p>
            </div>
            <div className={style.predmets}>
            {currentPredmets.ClassLessons.map((predmet, index) => {
              return (
                <div className={style.predmet} key={index}>
                  <p className={style.predmet__name}>{predmet.lessonName}</p>
                  <button onClick={changeUrl} className={style.questions__btn}>Задания</button>
                </div>
              )
            })}
            </div>
          </>
        )
        :
        (
          <p className={style.not__found}>В вашем классе пока нет предметов</p>
        )
      }

    </div>
  )
}

export default MyPredmets

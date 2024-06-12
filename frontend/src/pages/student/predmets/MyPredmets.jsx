import React, { useContext, useEffect, useState } from 'react'
import style from './myPredmets.module.scss'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../../context/authContext'
import axios from 'axios'

const MyPredmets = () => {

  const { user } = useContext(AuthContext)

  const [predmets, setPredmets] = useState()

  const getPredmets = async (studentClass) => {
    const data = {
      classId: studentClass
    }
    await axios.post(`${process.env.REACT_APP_API_URL}/student/predmets`, data)
    .then(res => {
      setPredmets(res.data)
    })
    .catch(e => console.log(e))
  }

  useEffect(() => {
    getPredmets(user.classId)
  }, [])

  return (
    <div className={style.wrapper}>
      <h1 className={style.title}>Мои предметы</h1>
      {predmets && predmets.ClassLessons.length ? 
        (
          <>
            <div className={style.category}>
              <p>Название предмета</p>
              <p>Текущая оценка</p>
            </div>
            <div className={style.predmets}>
            {predmets.ClassLessons.map((predmet, index) => {
              return (
                <div className={style.predmet} key={index}>
                  <p className={style.predmet__name}>{predmet.lessonName}</p>
                  <p className={style.predmet__score}>5</p>
                  <div className={style.btn__container}>
                    <Link className={style.questions__btn}>Задания</Link>
                  </div>
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

import React, { useContext, useEffect, useState } from 'react'
import style from './predmets.module.scss'
import { useParams, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { PredmetsContext } from '../../../../context/predmetsContext'

const Predmets = () => {

  const params = useParams()
  const navigete = useNavigate()
  
  const { predmets, setClassId } = useContext(PredmetsContext)

  const urlJournal = (e) => {
    const predmet = e.target.offsetParent.childNodes[0].innerHTML;
    const selectPredmet = predmets.ClassLessons.find(item => item.lessonName === predmet)
    navigete(`/teacher/journal/${params.class}/viewJournal/${selectPredmet.id}`)
  }

  const urlLink = (e) => {
    const predmet = e.target.offsetParent.childNodes[0].innerHTML;
    const selectPredmet = predmets.ClassLessons.find(item => item.lessonName === predmet)
    navigete(`/teacher/journal/${params.class}/questions/${selectPredmet.id}`)
  }

  useEffect(() => {
    setClassId(params.class)
  }, [])

  return (
    <div className={style.wrapper}>
      <h1 className={style.title}>Предметы</h1>
      <p className={style.class}>{params.class} Класс</p>
      {predmets && predmets.ClassLessons.length ?
      (
        <>
          <div className={style.categoty}>
            <p>Название предмета</p>
          </div>
          <div className={style.predmets}>
            {predmets.ClassLessons.map((item, index) => {
             return (
              <div className={style.predmet} key={index}>
                <p>{item.lessonName}</p>
                <div className={style.btn__container}>
                  <button onClick={urlJournal} className={style.link__btn}>Посмотреть журнал</button>
                  <button onClick={urlLink} className={style.link__btn}>Задания</button>
                </div>
              </div>
            )   
            })}
          </div>
        </>
      )
      :
      (
        <p className={style.not__found}>В классе пока нет предметов</p>
      )}
    </div>
  )
}

export default Predmets

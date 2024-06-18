import React, { useContext, useEffect, useState } from 'react'
import style from './myScores.module.scss'
import { AuthContext } from '../../../context/authContext'
import axios from 'axios'

const validateDate = (date) => {
  const months = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря',]
  const arrDate = date.slice(0, 10).split('-');
  const month = arrDate[1][0] == '0' ? arrDate[1].slice(1) : arrDate[1];
  const validateDate = `${arrDate[2]} ${months[month]} ${arrDate[0]} Года`;
  return validateDate;
}

const MyScores = () => {

  const { user } = useContext(AuthContext)
  
  const [predmets, setPredmets] = useState([])
  const [scores, setScores] = useState([])

  const getPredmets = async (classId) => {
    const data = {
      classId: classId
    }
    await axios.post(`${process.env.REACT_APP_API_URL}/student/predmets`, data)
    .then(res => {
      console.log(res)
      setPredmets(res.data)
    })
    .catch(e => console.log(e))
  }

  const middleScore = (questions) => {
    if(questions.length > 0){
      console.log(questions)
      const arr = []
      questions.map(question => {
        const answer = question.answers.find(answer => answer.studentId == user.id)
        if(answer) {
          switch (answer.score) {
            case 'PERFECT':
              arr.push(5)
              break;
            case 'GOOD':
              arr.push(4)
              break;
            case 'SATISFACTORY':
              arr.push(3)
              break;
            case 'BAD':
              arr.push(2)
              break;
          }
        }
      })
      return arr.reduce((acc, item) => acc + item, 0) / arr.length;
    }
  }

  useEffect(() => {
    getPredmets(user.classId)
  }, [])

  return (
    <div className={style.wrapper}>
      <h1 className={style.title}>Мои Оценки</h1>
      <div className={style.category}>
        <p>Название предмета</p>
        <p>Оценки</p>
        <p>Ср. балл</p>
        <p>Итог</p>
      </div>
      <div className={style.predmets}>
        {predmets.ClassLessons && predmets.ClassLessons.map((predmet, index) => {  
          return (
            <div className={style.predmet} key={index}>
              <p className={style.predmet__name}>{predmet.lessonName}</p>
              <div className={style.predmet__scores}>
                {predmet.questions.length > 0 ? predmet.questions.map((question, index) => {
                  const answer = question.answers.find(answer => answer.studentId == user.id);
                  return answer && answer.score == 'PERFECT' ? 
                  (<p className={`${style.score}`} key={index}>
                    5
                    <span className={style.tooltiptext}>Ответ за {validateDate(answer.dateAnswer)}</span>
                  </p>)
                  :
                  answer.score == 'GOOD' ?
                  (<p className={`${style.score}`} key={index}>
                    4
                    <span className={style.tooltiptext}>Ответ за {validateDate(answer.dateAnswer)}</span>
                  </p>)
                  :
                  answer.score == 'SATISFACTORY' ?
                  (<p className={`${style.score} ${style.yellow}`} key={index}>
                    3
                    <span className={style.tooltiptext}>Ответ за {validateDate(answer.dateAnswer)}</span>
                  </p>)
                  :
                  (<p className={`${style.score} ${style.red}`} key={index}>
                    2
                    <span className={style.tooltiptext}>Ответ за {validateDate(answer.dateAnswer)}</span>
                  </p>)
                })
                :
                (
                  <p className={style.no__score}>Оценок по данному предмету пока нет</p>
                )}
              </div>
              <div className={style.middle__score__box}>
                {predmet.questions.length > 0 && (
                  <p className={style.middle__score}>
                    {middleScore(predmet.questions).toFixed(2)}
                  </p>
                )}
              </div>
              <div className={style.score__result__box}>
                {predmet.questions.length > 0 && (
                  <p className={style.score__result}>
                    {Math.round(middleScore(predmet.questions))}
                  </p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MyScores

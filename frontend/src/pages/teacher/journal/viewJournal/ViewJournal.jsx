import React, { useContext, useEffect, useState } from 'react'
import style from './viewJournal.module.scss'
import { useParams } from 'react-router-dom'
import { PredmetsContext } from '../../../../context/predmetsContext'
import axios from 'axios'

const validateDate = (date) => {
  const months = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря',]
  const arrDate = date.slice(0, 10).split('-');
  const month = arrDate[1][0] == '0' ? arrDate[1].slice(1) : arrDate[1];
  const validateDate = `${arrDate[2]} ${months[month]} ${arrDate[0]} Года`;
  return validateDate;
}

const scoreSwitch = (score) => {
  switch (score) {
    case 'PERFECT':
      return (
        <p className={`${style.score}`}>
          5
        </p>
      )
      break;
    case 'GOOD':
      return (
        <p className={`${style.score}`}>
          4
        </p>
      )
      break;
    case 'SATISFACTORY':
      return (
        <p className={`${style.score} ${style.yellow}`}>
          3
        </p>
      )
      break;
    case 'BAD':
      return (
        <p className={`${style.score} ${style.red}`}>
          2
        </p>
      )
      break;
  }
}

const noScore = (questions, studentId) => {
  if(questions.length > 0){
    const arr = []
    questions.map(question => {
      const answer = question.answers.find(answer => answer.studentId == studentId)
      answer && arr.push(answer.score)
    })
    if(arr.length > 0) {
      return true
    }
  }  
}

const middleScore = (questions, studentId) => {
  if(questions.length > 0){
    const arr = []
    questions.map(question => {
      const answer = question.answers.find(answer => answer.studentId == studentId)
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
    if(arr.length == 0) {
      return <p>У ученика нет оценгок по данному предмету</p>
    }
    return arr.reduce((acc, item) => acc + item, 0) / arr.length;
  }
}

const ViewJournal = () => {

  const params = useParams()

  const { predmets, setClassId } = useContext(PredmetsContext);

  const [currentLesson, setCurrentLesson] = useState()
  const [students, setStudents] = useState([])


  const getStudents = async () => {
    const data = {
      studentClass: Number(params.class)
    }
    await axios.post(`${process.env.REACT_APP_API_URL}/student/students`, data)
    .then(res => {
      setStudents(res.data)
    })
    .catch(e => console.log(e))
  }

  useEffect(() => {
    getStudents()
    setClassId(params.class)
  }, [])

  useEffect(() => {
    predmets && setCurrentLesson(predmets.ClassLessons.find(item => item.id == params.lesson))
  }, [predmets])

  return (
    <div className={style.wrapper}>
      <h1 className={style.title}>Журнал: {currentLesson && currentLesson.lessonName}</h1>
      <p className={style.class}>{params.class} Класс</p>
      <p className={style.count__students}>Количество учеников: {students && students.length}</p>
      <div className={style.category}>
        <p>Ученик</p>
        <p>Оценки</p>
        <p>Ср. балл</p>
        <p>Итог</p>
      </div>
      <div className={style.students}>
        {students && students.map((student, index) => {
          return (
            <div className={style.student} key={index}>
              <p className={style.student__name}>{student.lastName} {student.firstName}</p>
              <div className={style.student__scores}>
                {currentLesson && noScore(currentLesson.questions, student.id) ? currentLesson.questions.map((question, index) => {
                  const answer = question.answers.find(answer => answer.studentId == student.id)
                  return answer && ( 
                    <div key={index}>
                      {scoreSwitch(answer.score)}
                      <span className={style.tooltiptext}>Ответ за {validateDate(answer.dateAnswer)}</span>
                    </div> 
                  )})
                  :
                  (
                    <p>У ученика нет оценок по данному предмету</p>
                  )
                }
              </div>
              <div className={style.middle__score__box}>
                {currentLesson && noScore(currentLesson.questions, student.id) && (
                  <p className={style.middle__score}>
                    {middleScore(currentLesson.questions, student.id)}
                  </p>
                )}
              </div>
              <div className={style.score__result__box}>
                {currentLesson && noScore(currentLesson.questions, student.id) && (
                  <p className={style.score__result}>
                    {Math.round(middleScore(currentLesson.questions, student.id))}
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

export default ViewJournal

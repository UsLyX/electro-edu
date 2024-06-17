import React, { useContext, useEffect, useState } from 'react'
import style from './questions.module.scss'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { PredmetsContext } from '../../../../context/predmetsContext'
import axios from 'axios'

const Questions = () => {

  const { predmets, setClassId } = useContext(PredmetsContext)  

  const navigate = useNavigate()

  const params = useParams()  

  const [questions, setQuestions] = useState([])

    const validateDateRegistration = (date) => {
    const months = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря',]
    const arrDate = date.slice(0, 10).split('-');
    const month = arrDate[1][0] == '0' ? arrDate[1].slice(1) : arrDate[1];
    const validateDate = `${arrDate[2]} ${months[month]} ${arrDate[0]}`;
    return validateDate;
  }

  const getQuestions = async (id) => {
    await axios.get(`${process.env.REACT_APP_API_URL}/teacher/questions/${id}`)
    .then(res => {
        setQuestions(res.data.questions)
    })
    .catch(e => console.log(e))
  }

  useEffect(() => {
    setClassId(params.class)
  }, [])

  useEffect(() => {
    if(predmets) {
        const id = predmets.ClassLessons.find(item => item.id == params.lesson).id
        getQuestions(id)
    }
  }, [predmets])

  const linkUrl = (questionId) => {
    navigate(`viewQuestion/${questionId}`)
  }


  return (
    <div className={style.wrapper}>
        <h1 className={style.title}>
            {predmets && predmets.ClassLessons.find(item => item.id == params.lesson).lessonName}
        </h1>
        <p className={style.class}>{params.class} Класс</p>
        <Link to='addQuestion' className={style.btn__add}>Добавить задание</Link>
        {questions.length ? (
            <>
                <div className={style.category}>
                    <p>Описание задания</p>
                    <p>Дата</p>
                    <p>Файлы</p>
                </div>
                <div className={style.questions}>
                    {questions.map((question, index) => {
                        return (
                            <div className={style.question} key={index}>
                                <p className={style.quest__description}>{question.questionDescription}</p>
                                <p className={style.quest__date}>{validateDateRegistration(question.dateCreate)}</p>
                                <p className={style.quest__files}>{question.files.length}</p>
                                <button onClick={() => linkUrl(question.id)} className={style.btn__view}>Посмотреть</button>
                            </div>
                        ) 
                    })}
                </div>
            </>
        )
        :
        (
            <p className={style.not__found}>Заданий по предмету пока нет</p>
        )}
    </div>
  )
}

export default Questions

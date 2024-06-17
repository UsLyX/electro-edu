import React, { useContext, useEffect, useState } from "react";
import style from "./studentQuestions.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { PredmetsContext } from "../../../context/predmetsContext";
import { AuthContext } from "../../../context/authContext";

const StudentQuestions = () => {
  const navigate = useNavigate()
  const params = useParams();

  const { user } = useContext(AuthContext);
  const { predmets, setClassId } = useContext(PredmetsContext);

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
      console.log(res.data)
        setQuestions(res.data.questions)
    })
    .catch(e => console.log(e))
  }

  const viewAnswerUrl = (index) => {
    const id = questions[index].id
    navigate(`viewAnswer/${id}`)
  }

  const addAnswerUrl = (index) => {
    const id = questions[index].id
    navigate(`addAnswer/${id}`)
  }

  useEffect(() => {
    if(predmets) {
        const id = predmets.ClassLessons.find(item => item.id == params.id).id
        getQuestions(id)
    }
  }, [predmets])

  useEffect(() => {
    setClassId(user.classId);
  }, []);

  return (
    <div className={style.wrapper}>
      <h1 className={style.title}>
        {predmets && predmets.ClassLessons.find((item) => item.id == params.id).lessonName}
      </h1>
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
                                {question.answers.find(item => item.studentId == user.id) ? 
                                (
                                  <button onClick={() => viewAnswerUrl(index)} className={style.btn__view}>Посмотреть</button>
                                )
                                :
                                (
                                  <button onClick={() => addAnswerUrl(index)} className={style.btn__view}>Прикрепить задание</button>
                                )}
                                
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
  );
};

export default StudentQuestions;

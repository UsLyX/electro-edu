import React, { useState, useEffect, useContext } from "react";
import style from "./viewQuestion.module.scss";
import { useParams } from "react-router-dom";
import Select from "react-select";
import { storage } from '../../../../firebase/firebase'
import { ref, listAll, getDownloadURL } from 'firebase/storage'
import { toast } from 'react-toastify'

import { PredmetsContext } from "../../../../context/predmetsContext";

import { ReactComponent as ImgInLink } from "../../../../assets/imgInLink.svg";
import { ReactComponent as WordInLink } from "../../../../assets/wordInLink.svg";
import { ReactComponent as PpInLink } from "../../../../assets/ppInLink.svg";
import { ReactComponent as Arrow } from "../../../../assets/arrow.svg";
import userPhoto from "../../../../assets/userPhoto.png";
import axios from "axios";

const scores = [
  { value: "Отлично", label: "Отлично" },
  { value: "Хорошо", label: "Хорошо" },
  { value: "Удовлетворительно", label: "Удовлетворительно" },
  { value: "Плохо", label: "Плохо" },
];

const validateDateRegistration = (date) => {
    const months = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря',]
    const arrDate = date.slice(0, 10).split('-');
    const month = arrDate[1][0] == '0' ? arrDate[1].slice(1) : arrDate[1];
    const validateDate = `${arrDate[2]} ${months[month]} ${arrDate[0]} Года`;
    return validateDate;
  }

const ViewQuestion = () => {
  const params = useParams();

  const { predmets, setClassId } = useContext(PredmetsContext);

  const [open, setOpen] = useState([]);

  const [files, setFiles] = useState([])
  const [score, setScore] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState();
  const [currentLesson, setCurrentLesson] = useState();
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    setClassId(params.class);
  }, []);

  useEffect(() => {
    if (predmets) {
      setCurrentLesson(
        predmets.ClassLessons.find((item) => item.id == params.lesson)
      );
    }
  }, [predmets]);

  useEffect(() => {
    if (currentLesson) {
      setCurrentQuestion(
        currentLesson.questions.find(
          (question) => question.id == params.question
        )
      );
    }
  }, [currentLesson]);

  const getFiles = (classId, lastName, firstName, id) => {
    const filesRef = ref(storage, `${classId}/${currentLesson.lessonName}/question${currentQuestion.id}/answers/${lastName}_${firstName}`)
    listAll(filesRef).then(res => {
        res.items.forEach(value => {
            const name = value.fullPath.split('__').pop()
            getDownloadURL(value).then( url => setFiles(prev => [...prev, [url, name, id]]) )
        })
    })
  }

  useEffect(() => {
    if(currentLesson && currentQuestion){
        currentQuestion.answers.forEach(item => {
           getFiles(item.student.classId, item.student.lastName, item.student.firstName, item.student.id)
        })
    }
  }, [currentQuestion])

  const opened = (id) => {
    if(open.length > 0 && open.includes(id)){
       const index = open.findIndex(item => item == id)
       console.log(index)
       setOpen(open.filter(item => item !== id))
    } else {
        setOpen(prev => [...prev, id])
    }
  }

  const updateScore = async (studentId, questionId) => {
    if(score == null){
        toast.error('Вы не поставили оценку')
        return
    }
    const data = {
        studentId,
        questionId,
        score: score
    }
    await axios.patch(`${process.env.REACT_APP_API_URL}/teacher/updateScore`, data)
    .then(res => {
        console.log(res)
        toast.success(res.data.message)
        return new Promise((resolve, reject) => {
          setTimeout(resolve, 3500)
        })
    })
    .then( _ => window.location.reload())
    .catch(e => console.log(e))
  }



  return (
    <div className={style.wrapper}>
      <h1 className={style.title}>
        {currentLesson && currentLesson.lessonName}
      </h1>
      <p className={style.class}>
        {currentLesson && currentLesson.classId} Класс
      </p>
      <p className={style.subtitle}>
        {currentQuestion && currentQuestion.questionDescription}
      </p>
      <div className={style.files}>
        <p className={style.files__title}>Файлы</p>
        <p className={style.files__subtitle}>
          Всего файлов приложено:{" "}
          {currentQuestion && currentQuestion.files.length}
        </p>
        <div className={style.download__container}>
          {currentQuestion &&
            currentQuestion.files.map((file, index) => {
              if (file.split(".").pop() == "pptx") {
                return (
                  <a
                    target="_blank"
                    key={index}
                    href={file.split("::")[0]}
                    download={true}
                    className={style.download}
                  >
                    <PpInLink className={style.link__img} />
                    <button className={style.download__btn}>
                      {file.split("::").pop()}
                    </button>
                  </a>
                );
              } else if (file.split(".").pop() == "docx") {
                return (
                  <a
                    target="_blank"
                    key={index}
                    href={file.split("::")[0]}
                    download={true}
                    className={style.download}
                  >
                    <WordInLink className={style.link__img} />
                    <button className={style.download__btn}>
                      {file.split("::").pop()}
                    </button>
                  </a>
                );
              } else {
                return (
                  <a
                    target="_blank"
                    key={index}
                    href={file.split("::")[0]}
                    download={true}
                    className={style.download}
                  >
                    <ImgInLink className={style.link__img} />
                    <button className={style.download__btn}>
                      {file.split("::").pop()}
                    </button>
                  </a>
                );
              }
            })}
        </div>
      </div>
      {currentQuestion && currentQuestion.answers.length > 0 ? (
        <>
          <div className={style.category}>
            <p>Пользователь</p>
            <p>Дата</p>
            <p>Класс</p>
          </div>
          <div className={style.answers}>
            {currentQuestion.answers.map(function (item, index) {
              return (
                <div className={style.answer} key={index}>
                  <div onClick={() => opened(item.student.id)} className={`${style.wrapper__answer} ${open.includes(item.student.id) && style.enable}`}>
                    <div className={style.answer__box}>
                      <img src={userPhoto} />
                      <p className={style.answer__name}>{item.student.lastName} {item.student.firstName}</p>
                    </div>
                    <p className={style.answer__date}>{validateDateRegistration(item.dateAnswer)}</p>
                    <p className={style.answer__role}>Ученик {item.student.classId} класса</p>
                    <Arrow className={style.arrow} />
                  </div>
                  <div className={`${style.open__answer} ${open.includes(item.student.id) && style.open}`}>
                    <div className={style.enter__score}>
                        {item.score == 'NOSCORE' ?
                        (
                          <>
                            <div className={style.select__wrapper}>
                              <label htmlFor="teach_select" className={style.label}>Оценка</label>
                              <Select
                                  onChange={(e) => setScore(e.value)}
                                  closeMenuOnSelect={false}
                                  className={style.select}
                                  options={scores}
                                  placeholder="Оцените работу..."
                                  id="teach_select"
                              />
                            </div>
                            <button onClick={() => updateScore(item.student.id, currentQuestion.id)} className={`${style.btn__score} ${score && style.btn__enable}`}>
                                Оценить
                            </button>
                          </>
                        )
                        :
                        (
                            <div className={style.exist__score}>
                              <div className={style.status__box}>
                                  <p className={style.status}>Статус:</p>
                                  <p className={style.current__status}>Оценено</p>
                              </div>
                              <div className={style.score__box}>
                                  <p className={style.score}>Оценка:</p>
                                  <p className={style.current__score}>{item.score == 'PERFECT' ? 'Отлично' : item.score == 'GOOD' ? 'Хорошо' : item.score == 'SATISFACTORY' ? 'Удовлетворительно' : 'Плохо'}</p>
                              </div>
                            </div>
                        )}
                    </div>
                    <div className={style.files}>
                      <p className={style.files__title}>Файлы</p>
                      <p className={style.files__subtitle}>
                        Всего файлов приложено:{ files.filter(file => file[2] == item.student.id).length }
                      </p>
                      <div className={style.download__container}>
                        {files.length > 0 &&
                          files.filter(element => element[2] == item.student.id).map((file, index) => {
                            if (file[1].split(".").pop() == "pptx") {
                              return (
                                <a
                                  target="_blank"
                                  key={index}
                                  href={file[0]}
                                  download={true}
                                  className={style.download}
                                >
                                  <PpInLink className={style.link__img} />
                                  <button className={style.download__btn}>
                                    {file[1].split("::").pop()}
                                  </button>
                                </a>
                              );
                            } else if (file[1].split(".").pop() == "docx") {
                              return (
                                <a
                                  target="_blank"
                                  key={index}
                                  href={file[0]}
                                  download={true}
                                  className={style.download}
                                >
                                  <WordInLink className={style.link__img} />
                                  <button className={style.download__btn}>
                                    {file[1]}
                                  </button>
                                </a>
                              );
                            } else {
                              return (
                                <a
                                  target="_blank"
                                  key={index}
                                  href={file[0]}
                                  download={true}
                                  className={style.download}
                                >
                                  <ImgInLink className={style.link__img} />
                                  <button className={style.download__btn}>
                                    {file[1]}
                                  </button>
                                </a>
                              );
                            }
                          })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <p className={style.not__found}>Ответов на задание пока нет</p>
      )}
    </div>
  );
};

export default ViewQuestion;

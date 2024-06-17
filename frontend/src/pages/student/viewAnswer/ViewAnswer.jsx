import React, { useContext, useEffect, useState } from "react";
import style from "./viewAnswer.module.scss";
import { useParams } from "react-router-dom";
import { storage } from '../../../firebase/firebase'
import { listAll, ref, getDownloadURL } from "firebase/storage";
import Select from "react-select";

import { PredmetsContext } from '../../../context/predmetsContext'
import { AuthContext } from '../../../context/authContext'

import { ReactComponent as ImgInLink } from '../../../assets/imgInLink.svg'
import { ReactComponent as WordInLink } from '../../../assets/wordInLink.svg'
import { ReactComponent as PpInLink } from '../../../assets/ppInLink.svg'

const ViewAnswer = () => {
    
  const params = useParams()

  const { user } = useContext(AuthContext)
  const { predmets, setClassId } = useContext(PredmetsContext)

  const [currentQuestion, setCurrentQuestion] = useState()
  const [currentLesson, setCurrentLesson] = useState()
  const [currentAnswer, setCurrentAnswer] = useState()
  const [files, setFiles] = useState([])

  useEffect(() => {
    setClassId(user.classId);
  }, []);

  useEffect(() => {
    if (predmets) {
      setCurrentLesson(predmets.ClassLessons.find((item) => item.id == params.id));
    }
  }, [predmets]);

  useEffect(() => {
    if (currentLesson) {
      setCurrentQuestion(currentLesson.questions.find((question) => question.id == params.question));
    }
  }, [currentLesson]);

  useEffect(() => {
    if(currentQuestion){
        setCurrentAnswer(currentQuestion.answers.find(item => item.studentId == user.id))
    }
  }, [currentQuestion])

  useEffect(() => {
    if(currentAnswer){
        listAll(ref(storage, `${user.classId}/${currentLesson.lessonName}/question${currentQuestion.id}/answers/${user.lastName}_${user.firstName}`))
        .then(files => {
            console.log(files)
            files.items.forEach(item => {
                const name = item.fullPath.split('__').pop()
                getDownloadURL(item).then(url => setFiles(data => [...data, {url: url, value: <a href={url} download={true}>{name}</a>, label: <a href={url} download={true}>{name}</a>}]))
            })
        })
    }
  }, [currentAnswer])

  const switchScore = (score) => {
    switch (score) {
        case 'PERFECT':
            return 'Отлично'
            break;
        case 'GOOD':
            return 'Хорошо'
            break;
        case 'SATISFACTORY':
            return 'Удовлетворительно'
            break;
        case 'BAD':
            return 'Плохо'
            break;
        case 'NOSCORE':
            return 'Не оценено'
            break;
    }
  }

  const validateDateRegistration = (date) => {
    const months = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря',]
    const arrDate = date.slice(0, 10).split('-');
    const month = arrDate[1][0] == '0' ? arrDate[1].slice(1) : arrDate[1];
    const validateDate = `${arrDate[2]} ${months[month]} ${arrDate[0]} Года`;
    return validateDate;
  }

  return (
    <div className={style.wrapper}>
      <h1 className={style.title}>{currentLesson && currentLesson.lessonName}</h1>
      <p className={style.subtitle}>Задание: {currentQuestion && currentQuestion.questionDescription}</p>
      <div className={style.files}>
            <p className={style.files__title}>Файлы</p>
            <p className={style.files__subtitle}>Всего файлов приложено: {currentQuestion && currentQuestion.files.length}</p>
            <div className={style.download__container}>
                {currentQuestion && currentQuestion.files.map((file, index) => {
                    if(file.split('.').pop() == 'pptx'){
                        return (
                            <a target="_blank" key={index} href={file.split('::')[0]} download={true} className={style.download}>
                                <PpInLink className={style.link__img}/>
                                <button className={style.download__btn}>{file.split('::').pop()}</button>
                            </a>
                        )
                    } 
                    else if(file.split('.').pop() == 'docx'){
                        return (
                            <a target="_blank" key={index} href={file.split('::')[0]} download={true} className={style.download}>
                                <WordInLink className={style.link__img}/>
                                <button className={style.download__btn}>{file.split('::').pop()}</button>
                            </a>
                        )
                    } 
                    else {
                        return (
                            <a target="_blank" key={index} href={file.split('::')[0]} download={true} className={style.download}>
                                <ImgInLink className={style.link__img}/>
                                <button className={style.download__btn}>{file.split('::').pop()}</button>
                            </a>
                        )
                    } 
                })}
            </div>
        </div>
        <div className={style.info__container}>
            <p className={style.info__title}>Состояние задания</p>
            <div className={style.info__score_box}>
                <p>Оценка:</p>
                <p>{currentAnswer && switchScore(currentAnswer.score)}</p>
            </div>
            <div className={style.info__files_box}>
                <p>Файлы</p>
                <Select className={style.select} options={files}/>
            </div>
            <div className={style.info__date_box}>
                <p>Дата отправки</p>
                <p>{currentAnswer && validateDateRegistration(currentAnswer.dateAnswer)}</p>
            </div>
        </div>
    </div>
  );
};

export default ViewAnswer;

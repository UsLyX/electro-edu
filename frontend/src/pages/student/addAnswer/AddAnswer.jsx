import React, { useContext, useEffect, useState } from 'react'
import style from './addAnswer.module.scss'
import { useNavigate, useParams } from 'react-router-dom'
import { storage } from '../../../firebase/firebase'
import { ref, uploadBytesResumable } from 'firebase/storage'
import { v1 } from 'uuid'

import { PredmetsContext } from '../../../context/predmetsContext'
import { AuthContext } from '../../../context/authContext'

import { ReactComponent as ImgInLink } from '../../../assets/imgInLink.svg'
import { ReactComponent as WordInLink } from '../../../assets/wordInLink.svg'
import { ReactComponent as PpInLink } from '../../../assets/ppInLink.svg'
import {ReactComponent as PhotoUpload} from '../../../assets/photoUpload.svg'

import ButtonFulsize from '../../../elements/buttonFullsize/ButtonFullsize'
import axios from 'axios'
import { toast } from 'react-toastify'


const AddAnswer = () => {
  const navigate = useNavigate()  

  const params = useParams()   

  const { user } = useContext(AuthContext)
  const { predmets, setClassId } = useContext(PredmetsContext)

  const [progressItem, setProgressItem] = useState([])
  const [files, setFiles] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState()
  const [currentLesson, setCurrentLesson] = useState()


  useEffect(() => {
    setClassId(user.classId)
  }, [])

  useEffect(() => {
    if(predmets) {
        setCurrentLesson(predmets.ClassLessons.find(item => item.id == params.id))
    }
  }, [predmets])

  useEffect(() => {
    if(currentLesson){
        setCurrentQuestion(currentLesson.questions.find(question => question.id == params.question))
    }
  }, [currentLesson])

  useEffect(() => {
    if(currentQuestion){
        const exist = currentQuestion.answers.find(item => item.studentId == user.id)
        if(exist){
            toast.error('Вы уже добавили ответ на это задание')
            navigate(`/student/predmets/${params.id}/questions`)
        }
    }
  }, [currentQuestion])

  const addAnswer = async () => {

    if(files.length == 0){
        toast.warning('Добавьте файлы с ответами на задание')
        return
    }

    Array.from(files).forEach((file, index) => {
        toast.warning(`Файлы загружаются, подождите...`, { autoClose: 1000 })

        uploadFile(file, index)
    });
    setFiles([])

    const data = {
        userId: user.id,
        questionId: currentQuestion.id
    }
    await axios.post(`${process.env.REACT_APP_API_URL}/student/addAnswer`, data)
    .then(res => {
        toast.success(res.data.message)
    })
    .catch(e => console.log(e))
  }

  const uploadFile = async (file, i) => {
      const fileRef = ref(storage, `${user.classId}/${currentLesson.lessonName}/question${currentQuestion.id}/answers/${user.lastName}_${user.firstName}/${v1()}__${file.name}`)
      const upload = uploadBytesResumable(fileRef, file);

      upload.on('state_changed',
          function progress(snapshot){
              var percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100;
          },
          function error(err){
            console.log(err)
          },
          function complete(){
                toast.success(`Файл ${file.name} загружен`)
          }
      );
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
        <p className={style.files__label}>Прикрепите файл</p>
        <label htmlFor='file' className={style.files__box}>
            <PhotoUpload className={style.file__img}/>
            <input onChange={e => setFiles(e.target.files)} multiple accept='.pdf, .png, .jpg, .jpeg, .docx, .pptx' type="file" id="file" className={style.file}/>
        </label>
        <ButtonFulsize onClick={addAnswer}>Отправить на проверку</ButtonFulsize>
    </div>
  )
}

export default AddAnswer

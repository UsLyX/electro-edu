import React, { useContext, useEffect, useState } from 'react'
import style from './addQuestion.module.scss'
import { useParams } from 'react-router-dom'
import { PredmetsContext } from '../../../../context/predmetsContext'
import { storage } from '../../../../firebase/firebase'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { v4 } from 'uuid'
import { toast } from 'react-toastify'

import Input from '../../../../elements/input/Input'

import {ReactComponent as BookIcon} from '../../../../assets/bookIcon.svg'
import {ReactComponent as PhotoUpload} from '../../../../assets/photoUpload.svg'
import axios from 'axios'

let arrFiles = [];

const AddQuestion = () => {

  const { predmets, setClassId } = useContext(PredmetsContext)  

  const [progressItem, setProgressItem] = useState([])
  const [files, setFiles] = useState([])
  const [description, setDescription] = useState('')

  const params = useParams()


  const returnFiles = (e) => {
   console.log(e.target.files)
    if(e.target.files) {
      toast.warning(`Файлы загружаются, подождите...`, { autoClose: 1000 })
      if(arrFiles.length > 0) arrFiles = []

      Array.from(e.target.files).forEach((file, index) => {
        uploadFile(file, index)
      });
    }
  }

  const addQuestion = async () => {

    if(files.length > 0) {
      const itemInProgress = progressItem.find(item => item < 100)
      if(itemInProgress){
        toast.error('Дождитесь загрузки файлов')
        return;
      }
    }
   
    if(!description){
      toast.error('Опишите задание')
      return;
    }

    const data = {
      id: predmets.ClassLessons.find(item => item.lessonName == predmets.ClassLessons.find(item => item.id == params.lesson).lessonName && item.classId == params.class).id,
      description: description,
      files: Array.from(files).map(item => item)
    }
    await axios.post(`${process.env.REACT_APP_API_URL}/teacher/addQuestion`, data)
    .then(res => {
      toast.success(res.data.message)
    })
    .catch(e => console.log(e))

    setDescription('')
  }

  const uploadFile = (file, i) => {
    return new Promise(function (resolve, reject) {

      const fileRef = ref(storage, `${params.class}/${predmets.ClassLessons.find(item => item.id == params.lesson).lessonName}/question${predmets.ClassLessons.find(item => item.id == params.lesson).questions.length > 0 ? predmets.ClassLessons.find(item => item.id == params.lesson).questions[predmets.ClassLessons.find(item => item.id == params.lesson).questions.length - 1].id + 1 : '1'}/${v4()}__${file.name}`)
      const upload = uploadBytesResumable(fileRef, file);

      upload.on('state_changed',
          function progress(snapshot){
              var percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100;
              setProgressItem((prevProgress) => {
                const newProgress = [...prevProgress];
                newProgress[i] = percentage.toFixed(2);
                return newProgress;
              });
          },
          function error(err){
            console.log(err)
          },
          function complete(){
            getDownloadURL(upload.snapshot.ref).then(downloadURL => {
              arrFiles.push(`${downloadURL}::${file.name}`)
              setFiles(arrFiles)
              toast.success(`Файл ${file.name} загружен`)
            });
          }
      );
    });
  }

  useEffect(() => {
    setClassId(params.class)
  }, [])

  return (
    <div className={style.wrapper}>
        <h1 className={style.title}>
            {predmets && predmets.ClassLessons.find(item => item.id == params.lesson).lessonName}
        </h1>
        <p className={style.class}>{params.class} Класс</p>
        <Input value={description} onChange={e => setDescription(e.target.value)} label='Описание задания' placeholder='Опишите задание...' svg={<BookIcon />} className={style.quest__description}/>
        <p className={style.files__label}>Прикрепите файл</p>
        <label htmlFor='file' className={style.files__box}>
            <PhotoUpload className={style.file__img}/>
            <input onChange={e => returnFiles(e)} multiple accept='.pdf, .png, .jpg, .jpeg, .docx, .pptx' type="file" id="file" className={style.file}/>
        </label>
        <button onClick={addQuestion} className={style.btn__add}>Добавить задание</button>

    </div>
  )
}

export default AddQuestion

import React, { useEffect, useState } from 'react'
import style from './editPredmets.module.scss'
import Select from "react-select";
import makeAnimated from 'react-select/animated'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

const animatedComponents = makeAnimated();

const schoolPredmets = [
  { value: "Русский язык", label: "Русский язык" },
  { value: "Математика", label: "Математика" },
  { value: "Обществознание", label: "Обществознание" },
  { value: "История", label: "История" },
  { value: "Физ. культура", label: "Физ. культура" },
  { value: "Биология", label: "Биология" },
  { value: "Физика", label: "Физика" },
  { value: "Литература", label: "Литература" },
  { value: "Астрономия", label: "Астрономия" },
  { value: "Информатика", label: "Информатика" },
  { value: "Иностранный язык", label: "Иностранный язык" },
  { value: "Химия", label: "Химия" }
];

const EditPredmets = () => {

  const params = useParams()
  
  //хранит состояние выбранных предметов
  const [selectedPredmets, setSelectedPredmets] = useState([])
  //хранит состояние полученных предметов
  const [predmets, setPredmets] = useState([])
  //хранит состояние текущих предметов
  const [currentPredmets, setCurrentPredmets] = useState([])
   //хранит состояние предметов, которые еще не были добавлены(котрых нет у класса)
  const [notCurrentPredmets, setNotCurrentPredmets] = useState([])

  const [modal, setModal] = useState('')

  //получение текущих предметов класса и предметов, которых нет у класса
  useEffect(() => {
    const currentPredmets = schoolPredmets.filter(predmet => predmets.some(item => item.lessonName === predmet.value)).map(element => element);
    setCurrentPredmets(currentPredmets)
    const notCurrentPredmets = schoolPredmets.filter(predmet => predmets.filter(item => item.lessonName == predmet.value).length == 0);
    setNotCurrentPredmets(notCurrentPredmets)
  }, [predmets])


  //функция изменения предметов у селекта
  const changePredmets = (e) => {
    e = e.map(item => item.value)
    setSelectedPredmets(e)
  }

  //функция закрытия модального окна
  const closeWindow = (e) => {
    e.preventDefault();
    if(e.target === e.currentTarget) {
       setSelectedPredmets([])
       setModal('')
    }
  }

  //функция получения предметов класса
  const getPredmets = async () => {
    await axios.get(`${process.env.REACT_APP_API_URL}/admin/predmets/${params.class}`)
    .then(res => {
      setPredmets(res.data)
    })
    .catch(e => console.log(e))
  }

  //функция добавления предметов классу
  const addPredmets = async () => {
    await axios.patch(`${process.env.REACT_APP_API_URL}/admin/predmets/${params.class}`, selectedPredmets)
    .then(res => {
      toast.success(res.data.message)
      setSelectedPredmets([])
      getPredmets()
    })
    .catch(e => console.log(e))
  }

  //функция удаления предметов у класса
  const deletePredmets = async () => {
    await axios.post(`${process.env.REACT_APP_API_URL}/admin/predmets/${params.class}`, selectedPredmets)
    .then(res => {
      toast.success(res.data.message)
      setSelectedPredmets([])
      getPredmets()
    })
    .catch(e => console.log(e))
  }

  //получение предметов класса
  useEffect(() => {
    getPredmets()
  }, [])

  //блокировка прокрутки при открытии модального окна
  useEffect(() => {
    if(modal !== ''){
      document.body.style.overflow = 'hidden';
    } else{
      document.body.style.overflow = 'unset';
    }
  }, [modal])

  return (
    <>
      <div className={style.wrapper}>
        <h1 className={style.title}>Администрирование предметов</h1>
        <p className={style.subtitle}>{params.class} класс</p>
        <div className={style.button__container}>
          <button onClick={() => setModal('1')} className={`${style.btn} ${style.btn__add}`}>Добавить предмет</button>
          <button onClick={() => setModal('0')} className={`${style.btn} ${style.btn__remove}`}>Удалить предмет</button>
        </div>
        <p className={style.category}>Текущие предметы</p>
        <div className={style.predmets}>
          {predmets.length ?
          (
            predmets.map((predmet, index) => {
              return (
                <div className={style.predmet} key={index}>
                  <p>{predmet.lessonName}</p>
                </div>
              )
            })
          )
          :
          (
            <p className={style.no__predmets}>В классе нет предметов</p>
          )}
        </div>
      </div>
      <div onClick={closeWindow} className={`${style.modal__add} ${modal === '1' && style.open}`}>
          <div className={style.add}>
            <p className={style.add__title}>Добавление предметов</p>
            <div className={style.select__wrapper}>
              <label htmlFor="add_select" className={style.label}>Предметы</label>
              <Select value={selectedPredmets.map(value => ({ label: value, value}))} onChange={changePredmets} isMulti closeMenuOnSelect={false} components={animatedComponents} className={style.select} options={notCurrentPredmets} placeholder='Выберите предметы' inputId="add_select" />
            </div> 
            <button onClick={addPredmets} className={style.add__btn}>Добавление предметов</button>
          </div>
      </div>
      <div onClick={closeWindow} className={`${style.modal__remove} ${modal === '0' && style.open}`}>
          <div className={style.remove}>
            <p className={style.remove__title}>Удаление предметов</p>
            <div className={style.select__wrapper}>
              <label htmlFor="remove_select" className={style.label}>Предметы</label>
              <Select value={selectedPredmets.map(value => ({ label: value, value}))} onChange={changePredmets} isMulti closeMenuOnSelect={false} components={animatedComponents} className={style.select} options={currentPredmets} placeholder='Выберите предметы' inputId="remove_select" />
            </div> 
            <button onClick={deletePredmets} className={style.remove__btn}>Удалить предметы</button>
          </div>
      </div>
    </>
  )
}

export default EditPredmets

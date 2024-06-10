import React, { useEffect, useState } from "react";
import style from "./teachers.module.scss";
import axios from 'axios'

import userPhoto from '../../../assets/userPhoto.png'


const predmets = {
  'Обществознание': "Обществознания",
  'Физика': "Физики",
  'Математика': "Математики",
  'Русский язык': "Русского языка",
  'Обществознание': "Обществознания",
  'История': "Истории",
  'Физ. культура': "Физ. культуры",
  'Биология': "Биологии",
  'Литература': "Литературы",
  'Астрономия': "Астрономии",
  'Информатика': "Информатики",
  'Иностранный язык': "Иностранного языка",
  'Химия': "Химии",
}

const Teachers = () => {

  const [teachers, setTeachers] = useState([]);

  const findTeachers = async () => {
    await axios.get(`${process.env.REACT_APP_API_URL}/student/getTeachers`)
    .then(res => {
      console.log(res.data)
      setTeachers(res.data)
    })
    .catch(e => console.log(e))
  }

  useEffect(() => {
    findTeachers()
  }, [])

  return (
    <div className={style.wrapper}>
      <h1 className={style.title}>Учителя</h1>
      <p className={style.count__teachers}>Всего учителей: {teachers.length}</p>
      <div className={style.teachers__container}>
        <div className={style.category}>
          <p>Имя учителя</p>
          <p>Квалификация</p>
        </div>
        <div className={style.teachers}>
          {teachers.map((teacher, index) => {
            return (
              <div className={style.teacher} key={index}>
                <div className={style.main__info}>
                  <img src={userPhoto} alt="аватар" />
                  <span>{teacher.lastName} {teacher.firstName}</span>
                </div>
                <p className={style.role}>Учитель {teacher.predmets.map((predmet, index) => index !== teacher.predmets.length - 1 ? `${predmets[predmet.lessonName]}, ` : `${predmets[predmet.lessonName]}`)}</p>
              </div>
            )
          })}
        </div>
      </div> 
    </div>
  );
};

export default Teachers;

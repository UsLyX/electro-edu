import React, { useContext, useEffect, useState } from 'react'
import style from './myClass.module.scss'
import { AuthContext } from '../../../context/authContext'

import userPhoto from '../../../assets/userPhoto.png'
import axios from 'axios'

const MyClass = () => {

  const { user } = useContext(AuthContext)

  const [students, setStudents] = useState([])

  const findStudents = async (studentClass) => {
    const data = {
        studentClass: studentClass
    }
    await axios.post(`${process.env.REACT_APP_API_URL}/student/students`, data)
    .then(res => setStudents(res.data))
    .catch(e => console.log(e))
  }

  useEffect(() => {
    findStudents(user.classId)
  }, [])

  return (
    <div className={style.wrapper}>
      <h1 className={style.title}>Мой класс</h1>
      <p className={style.class}>{user.classId} Класс</p>
      <div className={style.students__container}>
        <p className={style.students__title}>Ученики</p>
        <p className={style.stud__count}>Всего учеников: {students.length}</p>
        <div className={style.students}>
            {students.map((student, index) => {
                return (
                    <div className={style.student} key={index}>
                        <div className={style.main__info}>
                            <img src={userPhoto} alt="аватар" />
                            <span>{student.lastName} {student.firstName}</span>
                        </div>
                        <p className={style.role}>Ученик {student.classId} Класса</p>
                    </div>
                )
            })}
        </div>
      </div>
    </div>
  )
}

export default MyClass

import React, { useEffect, useState } from 'react'
import style from './adminStatement.module.scss'
import axios from 'axios'
import { toast } from 'react-toastify'

const AdminStatement = () => {

  const [statements, setStatements] = useState([])
  const [teachPredmets, setTeachPredmets] = useState([])

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

  const changeStatus = async (e, status, role) => {
    const data = {
      id: statements[e].id,
      status: status,
      role: role
    }
    await axios.patch(`${process.env.REACT_APP_API_URL}/admin/statements/change`, data)
    .then(res => {
      console.log(res)
      toast.success(res.data.message)
      getStatements()
    })
    .catch(e => console.log(e))
  }

  const getStatements = async () => {
    await axios.get(`${process.env.REACT_APP_API_URL}/admin/statements`)
    .then(res => {
      console.log(res)
      setStatements(res.data.statements)
      setTeachPredmets(res.data.teachPredmets)
    })
    .catch(res => toast.error(res.response.data.message))
  }

  useEffect(() => {
    getStatements()
  }, [])

  return (
    <div className={style.wrapper}>
      <h1 className={style.title}>Приём заявок</h1>
      <div className={style.category}>
        <p>Имя пользователя</p>
        <p>Роль</p>
      </div>
      <div className={style.statements__container}>
        {statements.map((item, key) => (
          <div key={key} className={style.statement}>
            <span className={style.name}>{item.lastName} {item.firstName}</span>
          <span className={style.role}>
            {item.classId 
            ? 
            (
              `Ученик ${item.classId} класса` 
            )
              
            : 
            (
              `Учитель ${teachPredmets.filter(predmets => predmets.teacherID == item.id).map(predmet => predmets[predmet.lessonName])}`
            )}
          </span>


          <div className={style.btn__box}>
            {item.status == 'PROCESSING' ? 
            (
              <>
                <button onClick={e => changeStatus(key, e.target.innerHTML, item.role)} className={style.button}>Принять</button>
                <button onClick={e => changeStatus(key, e.target.innerHTML, item.role)} className={style.button}>Отклонить</button>
              </>
            )
            : item.status == 'ACCEPTED' ?
            (
              <button className={`${style.accept}`}>Принято</button>
            )
            :
            (
              <button className={`${style.reject}`}>Отклонено</button>
            )}
          </div>
        </div>
        ))}
      </div>
    </div>
  )
}

export default AdminStatement

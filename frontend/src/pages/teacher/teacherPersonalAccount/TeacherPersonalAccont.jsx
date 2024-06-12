import React, { useContext, useEffect, useState } from 'react'
import style from './teacherPersonalAccount.module.scss'
import { AuthContext } from '../../../context/authContext'
import axios from 'axios'
import { toast } from 'react-toastify'

import Input from '../../../elements/input/Input'

import {ReactComponent as Mail}  from '../../../assets/mail.svg'
import {ReactComponent as UserIcon}  from '../../../assets/userIcon.svg'
import {ReactComponent as Phone}  from '../../../assets/phoneForInput.svg'
import {ReactComponent as Calendar}  from '../../../assets/calendar.svg'
import {ReactComponent as Book}  from '../../../assets/bookIcon.svg'

const TeacherPersonalAccont = () => {
  const { user, setUser } = useContext(AuthContext)

  const [currentUser, setCurrentUser] = useState(user)
  const [change, setChange] = useState()

  const submitData = async () => {
    const data = {
      change: {...change},
      user: user
    }
    if(JSON.stringify(currentUser) != JSON.stringify(user)) {
      await axios.patch(`${process.env.REACT_APP_API_URL}/user/update`, data)
      .then(res => {
        setChange(null)
        setUser(currentUser)
        toast.success(res.data.message)
      })
      .catch(res => toast.error(res.response.data.message))
    } else{
      toast.warning("Нет данных для изменения")
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
      <h1 className={style.title}>Личный кабинет</h1>
      <form className={style.info__box}>
        <Input
          min='10'
          type="email"
          value={user.email}
          placeholder="Не указано"
          label="Эл. почта"
          svg={<Mail />}
          className={style.input}
          readOnly
        />
        <Input
          type="text"
          value={user.middleName}
          placeholder="Не указано"
          label="Отчество"
          onChange={e => {
            setCurrentUser({...currentUser, middleName: e.target.value})
            setChange({...change, middleName: e.target.value})
          }}
          svg={<UserIcon />}
          className={style.input}
          readOnly={user.middleName != null ? true : false}
        />
        <Input
          type="text"
          value={user.lastName}
          placeholder="Не указано"
          label="Фамилия"
          svg={<UserIcon />}
          className={style.input}
          readOnly
        />
        <Input
          min='11'
          type="tel"
          value={user.phone}
          label="Телефон"
          onChange={e => {
            setCurrentUser({...currentUser, phone: e.target.value})
            setChange({...change, phone: e.target.value})
          }}
          svg={<Phone />}
          className={style.input}
          readOnly={user.phone != null ? true : false}
        />
        <Input
          type="text"
          value={user.firstName}
          placeholder="Не указано"
          label="Имя"
          svg={<UserIcon />}
          className={style.input}
          readOnly
        />
        <Input
          type="date"
          value={user.dateOfBirth && user.dateOfBirth.slice(0, 10)}
          placeholder="Не указано"
          onChange={e => {
            setCurrentUser({...currentUser, dateOfBirth: e.target.value})
            setChange({...change, dateOfBirth: e.target.value})
          }}
          label="Дата рождения"
          svg={<Calendar />}
          className={style.input}
          readOnly={user.dateOfBirth != null ? true : false}
        />
        <Input
          type="text"
          value={user.predmets && user.predmets.map((item, index) => index != user.predmets.length - 1 ? `${item.lessonName}` : ` ${item.lessonName}`)}
          placeholder="Не указано"
          label="Предметы"
          svg={<Book />}
          className={`${style.input} ${style.maxLength}`}
          readOnly
        />
      </form>
      <p className={style.dateReg}>Дата регистрации аккаунта: {user.dateRegister && validateDateRegistration(user.dateRegister)}</p>
      <button onClick={submitData} className={style.btn__submit}>Сохранить изменения</button>
    </div>
  )
}

export default TeacherPersonalAccont

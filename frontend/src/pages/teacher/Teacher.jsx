import React, { useState, useEffect, useContext } from 'react'
import style from './teacher.module.scss'
import { AuthContext } from '../../context/authContext'
import { useLocation, Link, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';

import userPhoto from '../../assets/userPhoto.png'
import { ReactComponent as ExitIcon} from '../../assets/exit.svg'

const Teacher = () => {

  const location = useLocation();

  const [url, setUrl] = useState(window.location.href.split('/'))

  useEffect(() => {
    setUrl(window.location.href.split('/'))
  }, [location])

  const { exit, user } = useContext(AuthContext)

  const exitFunc = () => {
    exit();
    toast.success("Вы вышли из аккаунта")
  }

  return (
    <div className={style.wrapper}>
    <div className={style.navbar}>
      <p className={style.logo}>GoLearn</p>
      <div className={style.nav__wrapper}>
          <div className={style.nav__box}>
              <div className={style.user_nav__info}>
                  <img src={userPhoto} alt="фото пользователя" />
                  <p>{user.lastName} {user.firstName}</p>
              </div>
              <nav className={style.nav}>
                  <Link to="/teacher/personalAccount" className={`${style.link} ${url.includes('personalAccount') && style.active}`}>Личный кабинет</Link>
                  <Link to="/teacher/journal/classes" className={`${style.link} ${url.includes('journal') && style.active}`}>Классы</Link>
              </nav>
          </div> 
          <Link to="/authorization" onClick={exitFunc} className={style.exit}><ExitIcon /> Выйти</Link> 
      </div>
    </div>
    <div style={{flex: 1, marginLeft: '285px'}}>
      <Outlet />
    </div>
  </div>
  )
}

export default Teacher

import style from './student.module.scss'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'
import { toast } from 'react-toastify'
import { useContext, useEffect, useState } from 'react'
import { PredmetsProvider } from '../../context/predmetsContext';

import userPhoto from '../../assets/userPhoto.png'
import { ReactComponent as ExitIcon} from '../../assets/exit.svg'

const Student = () => { 

  const location = useLocation();

  const [url, setUrl] = useState(window.location.href.split('/'))

  useEffect(() => {
    setUrl(window.location.href.split('/'))
  }, [location])

  const { exit, user, setToken } = useContext(AuthContext)

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
                    <Link to="/student/personalAccount" className={`${style.link} ${url.includes('personalAccount') && style.active}`}>Личный кабинет</Link>
                    <Link to="/student/predmets" className={`${style.link} ${url.includes('predmets') && style.active}`}>Мои предметы</Link>
                    <Link to="/student/scores" className={`${style.link} ${url.includes('scores') && style.active}`}>Мои оценки</Link>
                    <Link to="/student/class" className={`${style.link} ${url.includes('class') && style.active}`}>Мой класс</Link>
                    <Link to="/student/teachers" className={`${style.link} ${url.includes('teachers') && style.active}`}>Учителя</Link>
                </nav>
            </div> 
            <Link to="/authorization" onClick={exitFunc} className={style.exit}><ExitIcon /> Выйти</Link> 
        </div>
      </div>
      <PredmetsProvider>
        <div style={{flex: 1, marginLeft: '285px'}}>
          <Outlet />
        </div>
      </PredmetsProvider>
    </div>
  )
}

export default Student

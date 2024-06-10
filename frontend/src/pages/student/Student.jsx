import style from './student.module.scss'
import { Link, Outlet } from 'react-router-dom'

import userPhoto from '../../assets/userPhoto.png'
import { ReactComponent as ExitIcon} from '../../assets/exit.svg'
import { useEffect } from 'react'

const Student = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.navbar}>
        <p className={style.logo}>GoLearn</p>
        <div className={style.nav__wrapper}>
            <div className={style.nav__box}>
                <div className={style.user_nav__info}>
                    <img src={userPhoto} alt="фото пользователя" />
                    <p>Администратор</p>
                </div>
                <nav className={style.nav}>
                    <Link to="/student/personalAccount" className={`${style.link} ${style.active}`}>Личный кабинет</Link>
                    <Link to="/student/predmets" className={style.link}>Мои предметы</Link>
                    <Link to="/student/score" className={style.link}>Мои оценки</Link>
                    <Link to="/student/class" className={style.link}>Мой класс</Link>
                    <Link to="/student/teachers" className={style.link}>Учителя</Link>
                </nav>
            </div> 
            <Link className={style.exit}><ExitIcon /> Выйти</Link> 
        </div>
      </div>
      <div style={{flex: 1, marginLeft: '285px'}}>
        <Outlet />
      </div>
    </div>
  )
}

export default Student

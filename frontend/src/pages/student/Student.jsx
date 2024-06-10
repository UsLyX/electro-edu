import style from './student.module.scss'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'
import { toast } from 'react-toastify'
import { useContext, useEffect, useState } from 'react'

import userPhoto from '../../assets/userPhoto.png'
import { ReactComponent as ExitIcon} from '../../assets/exit.svg'

const Student = () => { 

  const [url, setUrl] = useState(window.location.href.substring(window.location.href.lastIndexOf('/')))

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
                    <Link onClick={_ => setUrl('/personalAccount')} to="/student/personalAccount" className={`${style.link} ${url === '/personalAccount' && style.active}`}>Личный кабинет</Link>
                    <Link onClick={_ => setUrl('/predmets')} to="/student/predmets" className={`${style.link} ${url === '/predmets' && style.active}`}>Мои предметы</Link>
                    <Link onClick={_ => setUrl('/score')} to="/student/score" className={`${style.link} ${url === '/score' && style.active}`}>Мои оценки</Link>
                    <Link onClick={_ => setUrl('/class')} to="/student/class" className={`${style.link} ${url === '/class' && style.active}`}>Мой класс</Link>
                    <Link onClick={_ => setUrl('/teachers')} to="/student/teachers" className={`${style.link} ${url === '/teachers' && style.active}`}>Учителя</Link>
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

export default Student

import style from './admin.module.scss'
import { Link, Outlet } from 'react-router-dom'

import userPhoto from '../../assets/userPhoto.png'
import { ReactComponent as ExitIcon} from '../../assets/exit.svg'

const Admin = () => {
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
                    <Link to="/admin/statements" className={`${style.link} ${style.active}`}>Приём заявок</Link>
                    <Link to="/admin/predmets" className={style.link}>Администррирование предметов</Link>
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

export default Admin

import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "./role.module.scss";

import ButtonFullsize from "../../../../elements/buttonFullsize/ButtonFullsize";

import { ReactComponent as RoleStudent } from "../../../../assets/roleStudent.svg";
import { ReactComponent as RoleTeacther } from "../../../../assets/roleTeacher.svg";
import { ReactComponent as BackArrow } from "../../../../assets/back.svg";
import { ReactComponent as Phone } from "../../../../assets/phone.svg";
import banner2 from "../../../../assets/banner2.png";
import { AuthContext } from "../../../../context/authContext";

const Role = () => {

  const navigate = useNavigate();

  const [focusBtn, setFocusBtn] = useState(null);
  const [role, setRole] = useState('');

  const { user, setUser } = useContext(AuthContext)

  const submit = (e) => {
    e.preventDefault()
    if(role === ''){
      return
    } else{
        setUser({...user, role: role})
        navigate('/registration/info')
    }
  }



  return (
    <div className={style.wrapper}>
      <div className={style.register}>
        <span className={style.logo}>GoLearn</span>
        <form onSubmit={submit} className={style.form}>
          <h1 className={style.h1}>Кто вы в GoLearn?</h1>
          <div className={style.role__box}>
            <button type="button" onFocus={() => {setFocusBtn(1); setRole('Ученик')}} className={focusBtn === 1 ? `${style.btn__role} ${style.active}` : `${style.btn__role}`}>
              <RoleStudent className={style.role__img} />
              Ученик
            </button>
            <button type="button" onFocus={() => {setFocusBtn(2); setRole('Учитель')}} className={focusBtn === 2 ? `${style.btn__role} ${style.active}` : `${style.btn__role}`}>
              <RoleTeacther className={style.role__img} />
              Учитель
            </button>
          </div>
          <ButtonFullsize className={style.button}>Продолжить</ButtonFullsize>
          <Link to='/registration'>
            <ButtonFullsize className={style.button__back}>
              <BackArrow className={style.back__arrow} /> Назад
            </ButtonFullsize>
          </Link>
        </form>
      </div>
      <div className={style.banner}>
        <div className={style.phone__box}>
          <Phone />
          <span className={style.phone}>+7 (900) 999-99-99</span>
        </div>
        <div className={style.banner__main}>
          <img src={banner2} className={style.banner__img} />
          <div className={style.banner__text}>
            <p className={style.banner__title}>Выберите роль</p>
            <p className={style.banner__description}>
              Электронная образовательная среда
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Role;

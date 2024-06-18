import React, { useContext, useState } from "react";
import style from "./authorization.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

import Input from "../../../elements/input/Input";
import ButtonFullsize from "../../../elements/buttonFullsize/ButtonFullsize";
import { AuthContext } from "../../../context/authContext";

import { ReactComponent as Mail } from "../../../assets/mail.svg";
import { ReactComponent as PassIcon } from "../../../assets/passIcon.svg";
import { ReactComponent as Mailru } from "../../../assets/mailRu.svg";
import { ReactComponent as Vk } from "../../../assets/vk.svg";
import { ReactComponent as Phone } from "../../../assets/phone.svg";
import banner1 from "../../../assets/banner1.png";

const Authorization = () => {
  const navigate = useNavigate();

  const { user, setUser, login } = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    const data = {email, password}
    await axios.post(`${process.env.REACT_APP_API_URL}/user/login`, data)
    .then(res => {
      localStorage.setItem('token', res.data.token)
      login(res.data.token)
      toast.success(res.data.message)
      switch (res.data.role) {
        case 'Администратор':
          setUser({...user, role: 'Администратор'})
          navigate('/admin/statements')
          break;
        case 'Учитель':
          setUser({...user, role: 'Учитель'})
          navigate('/teacher')
          break;
        case 'Ученик':
          setUser({...user, role: 'Ученик'})
          navigate('/student')
          break;    
      }
      login(res.data.token)
    })
    .catch(res => toast.error(res.response.data.message))
  }

  return (
    <div className={style.wrapper}>
      <div className={style.register}>
        <span className={style.logo}>GoLearn</span>
        <form onSubmit={submit} className={style.form}>
          <h1 className={style.h1}>Авторизация</h1>
          <Input
            min='10'
            type="email"
            label="Эл. почта"
            placeholder="Введите свой Emal адрес"
            onChange={e => setEmail(e.target.value)}
            className={style.input}
            svg={<Mail />}
          />
          <Input
            min='6'
            type="password"
            label="Пароль"
            placeholder="Введите ваш пароль"
            onChange={e => setPassword(e.target.value)}
            className={style.input}
            svg={<PassIcon />}
          />
          <ButtonFullsize className={style.button}>
            Войти
          </ButtonFullsize>
        </form>
        <div className={style.another}>
          <p className={style.link__text}>
            У вас нет аккаунта? {" "}
            <Link to="/registration" className={style.link}>
            Зарегистрироваться
            </Link>
          </p>
        </div>
      </div>
      <div className={style.banner}>
        <div className={style.phone__box}>
          <Phone />
          <span className={style.phone}>+7 (800) 200-01-22</span>
        </div>
        <div className={style.banner__main}>
          <img src={banner1} className={style.banner__img} />
          <div className={style.banner__text}>
            <p className={style.banner__title}>Авторизируйтесь</p>
            <p className={style.banner__description}>
              Электронная образовательная среда
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authorization;

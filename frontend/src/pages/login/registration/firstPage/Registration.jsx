import React, { useContext, useState } from "react";
import style from "./registration.module.scss";
import { Link, useNavigate } from "react-router-dom";

import Input from "../../../../elements/input/Input";
import ButtonFullsize from "../../../../elements/buttonFullsize/ButtonFullsize";

import { ReactComponent as Mail } from "../../../../assets/mail.svg";
import { ReactComponent as Mailru } from "../../../../assets/mailRu.svg";
import { ReactComponent as Vk } from "../../../../assets/vk.svg";
import { ReactComponent as Phone } from "../../../../assets/phone.svg";
import banner1 from "../../../../assets/banner1.png";
import { AuthContext } from "../../../../context/authContext";

const Registration = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext)

  const submit = (e) => {
    e.preventDefault();
    navigate('/registration/role')
  }

  return (
    <div className={style.wrapper}>
      <div className={style.register}>
        <span className={style.logo}>GoLearn</span>
        <form onSubmit={submit} className={style.form}>
          <h1 className={style.h1}>Регистрация</h1>
          <Input
            min="10"
            type="email"
            label="Эл. почта"
            placeholder="Введите свой Emal адрес"
            onChange={(e) => setUser({...user, email: e.target.value})}
            className={style.input}
            svg={<Mail />}
          />
          <ButtonFullsize className={style.button}>
            Зарегистрироваться
          </ButtonFullsize>
        </form>
        <div className={style.another}>
          <p className={style.link__text}>
            Уже есть аккаунт?{" "}
            <Link to="/authorization" className={style.link}>
              Войти
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
            <p className={style.banner__title}>Начните регистрацию</p>
            <p className={style.banner__description}>
              Электронная образовательная среда
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;

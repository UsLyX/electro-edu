import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "./userInfo.module.scss";
import Select from "react-select";
import makeAnimated from 'react-select/animated'
import axios from 'axios'
import { toast } from "react-toastify";

import ButtonFullsize from "../../../../elements/buttonFullsize/ButtonFullsize";
import Input from "../../../../elements/input/Input";
import { AuthContext } from "../../../../context/authContext";

import { ReactComponent as Mail } from "../../../../assets/mail.svg";
import { ReactComponent as UserIcon } from "../../../../assets/userIcon.svg";
import { ReactComponent as PassIcon } from "../../../../assets/passIcon.svg";
import { ReactComponent as BackArrow } from "../../../../assets/back.svg";
import { ReactComponent as Phone } from "../../../../assets/phone.svg";
import banner3 from "../../../../assets/banner3.png";

const animatedComponents = makeAnimated();

const items = [
  { value: "1 Класс", label: "1 Класс" },
  { value: "2 Класс", label: "2 Класс" },
  { value: "3 Класс", label: "3 Класс" },
  { value: "4 Класс", label: "4 Класс" },
  { value: "5 Класс", label: "5 Класс" },
  { value: "6 Класс", label: "6 Класс" },
  { value: "7 Класс", label: "7 Класс" },
  { value: "8 Класс", label: "8 Класс" },
  { value: "9 Класс", label: "9 Класс" },
  { value: "10 Класс", label: "10 Класс" },
  { value: "11 Класс", label: "11 Класс" },
];

const predmets = [
  { value: "Русский язык", label: "Русский язык" },
  { value: "Математика", label: "Математика" },
  { value: "Обществознание", label: "Обществознание" },
  { value: "История", label: "История" },
  { value: "Физ. культура", label: "Физ. культура" },
  { value: "Биология", label: "Биология" },
  { value: "Физика", label: "Физика" },
  { value: "Литература", label: "Литература" },
  { value: "Астрономия", label: "Астрономия" },
  { value: "Информатика", label: "Информатика" },
  { value: "Иностранный язык", label: "Иностранный язык" },
  { value: "Химия", label: "Химия" }
];

const UserInfo = () => {
  const navigate = useNavigate();

  const { user, setUser } = useContext(AuthContext);
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [studClass, setStudClass] = useState('');
  const [teachPredmets, setTeachPredmets] = useState([]);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const changeMail = (e) => {
    setUser({ ...user, email: e.target.value });
  };
  const changeLastName = (e) => {
    setLastName(e.target.value);
  };
  const changeFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const changeClass = (e) => {
    setStudClass(e.value);
  };
  const changePredmets = (e) => {
    e = e.map(item => item.value)
    setTeachPredmets(e);
  };
  const changePassword = (e) => {
    setPassword(e.target.value);
  };
  const changeConfirm = (e) => {
    setPasswordConfirm(e.target.value);
  };
  const submit = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      return;
    } else {
      const data = {
        role: user.role,
        email: user.email,
        lastName: lastName,
        firstName: firstName,
        studClass: studClass,
        teachPredmets: teachPredmets,
        password: password
      }
      await axios.post(`${process.env.REACT_APP_API_URL}/user/registration`, data)
      .then(res => {
        toast.success(res.data.message)
        navigate('/authorization')
      })
      .catch(res => toast.error(res.response.data.message))
    }
  };

  useEffect(() => {
    if (user.role === "") {
      navigate("/registration/role");
    }
  }, []);

  return (
    <div className={style.wrapper}>
      <div className={style.register}>
        <span className={style.logo}>GoLearn</span>
        <form onSubmit={submit} className={style.form}>
          <h1 className={style.h1}>Личные данные</h1>
          <Input
            min='10'
            type="email"
            value={user.email}
            onChange={changeMail}
            placeholder="Введите свой Emal адрес"
            label="Эл. почта"
            svg={<Mail />}
            className={style.input}
          />
          <Input
            type="text"
            onChange={changeLastName}
            placeholder="Введите фамилию"
            label="Фамилия"
            svg={<UserIcon />}
            className={style.input}
          />
          <Input
            type="text"
            onChange={changeFirstName}
            placeholder="Введите имя"
            label="Имя"
            svg={<UserIcon />}
            className={style.input}
          />
          {user.role === "Ученик" ? (
            <div className={style.select__wrapper}>
              <label htmlFor="stud_select" className={style.label}>Класс</label>
              <Select onChange={changeClass} className={style.select} options={items} placeholder='Выберите класс' id="stud_select" />
            </div> 
          ) : (
            <div className={style.select__wrapper}>
              <label htmlFor="teach_select" className={style.label}>Предметы</label>
              <Select onChange={changePredmets} isMulti closeMenuOnSelect={false} components={animatedComponents} className={style.select} options={predmets} placeholder='Выберите преподаваемые предметы' id="teach_select" />
            </div> 
          )}
          <Input
            min='6'
            onChange={changePassword}
            type="password"
            placeholder="Придумайте пароль"
            label="Пароль"
            svg={<PassIcon />}
            className={style.input}
          />
          <Input
            min='6'
            onChange={changeConfirm}
            type="password"
            placeholder="Повторите пароль"
            label="Повтор пароля"
            svg={<PassIcon />}
            className={style.input}
          />
          <ButtonFullsize className={style.button}>Закончить регистрацию</ButtonFullsize>
          <Link to="/registration/role">
            <ButtonFullsize className={style.button__back}>
              <BackArrow className={style.back__arrow} /> Назад к выбору роли
            </ButtonFullsize>
          </Link>
        </form>
      </div>
      <div className={style.banner}>
        <div className={style.phone__box}>
          <Phone />
          <span className={style.phone}>+7 (800) 200-01-22</span>
        </div>
        <div className={style.banner__main}>
          <img src={banner3} className={style.banner__img} />
          <div className={style.banner__text}>
            <p className={style.banner__title}>Зарегистрируйтесь</p>
            <p className={style.banner__description}>
              Электронная образовательная среда
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;

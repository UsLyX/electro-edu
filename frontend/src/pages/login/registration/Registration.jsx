import React from 'react'
import style from './registration.module.scss'
import {Link} from 'react-router-dom'

import Input from '../../../elements/input/Input'
import ButtonFullsize from '../../../elements/buttonFullsize/ButtonFullsize'

import {ReactComponent as Mail} from '../../../assets/mail.svg'
import {ReactComponent as Mailru} from '../../../assets/mailRu.svg'
import {ReactComponent as Vk} from '../../../assets/vk.svg'
import {ReactComponent as Phone} from '../../../assets/phone.svg'
import banner1 from '../../../assets/banner1.png'

const Registration = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.register}>
        <span className={style.logo}>GoLearn</span>
        <form className={style.form}>
          <h1 className={style.h1}>Регистрация</h1>
          <Input type='email' label='Эл. почта' placeholder='Введите свой Emal адрес' className={style.input} svg={<Mail />}/>
          <ButtonFullsize className={style.button}>Зарегистрироваться</ButtonFullsize>
        </form>
        <div className={style.another}>
          <div className={style.another__header}>
            <hr />
            <span>Другие способы регистрации</span>
            <hr />
          </div>
          <div className={style.btns}>
            <button className={style.btn__mailru}>
              <Mailru />
              <span>Mail.ru</span>
            </button>
            <button className={style.btn__vk}>
              <Vk />
              <span>Вконтакте</span>
            </button>
          </div>
          <p className={style.link__text}>Уже есть аккаунт? <Link to='/authorization' className={style.link}>Войти</Link></p>
        </div>
      </div>
      <div className={style.banner}>
        <div className={style.phone__box}>
          <Phone />
          <span className={style.phone}>+7 (900) 999-99-99</span>
        </div>
        <div className={style.banner__main}>
          <img src={banner1} className={style.banner__img}/>
          <div className={style.banner__text}>
            <p className={style.banner__title}>Начните регистрацию</p>
            <p className={style.banner__description}>Электронная образовательная среда</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Registration

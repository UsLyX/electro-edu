import React from 'react'
import style from './input.module.scss'


const Input = ({type, placeholder, label, svg, className}) => {
  return( 
    <div className={`${style.wrapper} ${className}`}>
        <label className={style.label} htmlFor="input">{label}</label>
        <div className={style.input_wrapper}>
          <input className={style.input} id='input' type={type} placeholder={placeholder} />
          <div className={style.svg}>{svg}</div>
        </div>
    </div>
  )
}

export default Input

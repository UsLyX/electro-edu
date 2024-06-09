import React from 'react'
import style from './input.module.scss'


const Input = ({type, placeholder, label, svg, className, onChange, value}) => {
  return( 
    <div className={`${style.wrapper} ${className}`}>
        <label className={style.label} htmlFor={`input ${placeholder}`}>{label}</label>
        <div className={style.input_wrapper}>
          <input minLength='6' value={value} className={style.input} id={`input ${placeholder}`} onChange={onChange} type={type} placeholder={placeholder} required/>
          <div className={style.svg}>{svg}</div>
        </div>
    </div>
  )
}

export default Input

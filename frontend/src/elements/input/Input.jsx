import React from 'react'
import InputMask from 'react-input-mask'
import style from './input.module.scss'


const Input = ({type, placeholder, label, svg, className, onChange, value, min, readOnly, multiple, defaultValue}) => {
  return( 
    <div className={`${style.wrapper} ${className}`}>
      {type == 'tel' ?
      (
        <>
        <label className={style.label} htmlFor={`input ${label}`}>
          {label}
        </label>
        
        <div className={style.input_wrapper}>
        <InputMask
            className={style.input}
            mask="+ 7 (999) 999-99-99"
            id={`input ${label}`}
            defaultValue={value}
            key={value}
            alwaysShowMask={true}
            onChange={onChange}
            readOnly={readOnly}
          ></InputMask>
          <div className={style.svg}>{svg}</div>
        </div>
      </>
      )
      :
      (
        <>
          <label className={style.label} htmlFor={`input ${label}`}>{label}</label>
          <div className={style.input_wrapper}>
            <input multiple={multiple} minLength={min} defaultValue={defaultValue} value={value} className={style.input} id={`input ${label}`} onChange={onChange} type={type} placeholder={placeholder} readOnly={readOnly} required/>
            <div className={style.svg}>{svg}</div>
          </div>
        </>
      )}
    </div>
  )
}

export default Input

import React from 'react'
import style from './buttonFullsize.module.scss'

const ButtonFullsize = ({children, className}) => {
  return <button type='button' className={`${style.btn} ${className}`}>{children}</button>
}

export default ButtonFullsize

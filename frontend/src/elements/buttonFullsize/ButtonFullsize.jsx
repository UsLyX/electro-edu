import React from 'react'
import style from './buttonFullsize.module.scss'

const ButtonFullsize = ({children, className, onClick}) => {
  return <button onClick={onClick} className={`${style.btn} ${className}`}>{children}</button>
}

export default ButtonFullsize

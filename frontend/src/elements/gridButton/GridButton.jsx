import React from 'react'
import { Link } from 'react-router-dom'
import style from './gridButton.module.scss'

const GridButton = ({children, number, className, svg, path}) => {
  return (
    <Link to={path} className={`${style.btn} ${className}`}>
        {children ?
        (
            <div className={style.wrapper}>
                <span>{svg}</span>
                <span>{children}</span>
            </div>
        )
        :
        (
            <>
                <p>{number}</p>
                <p>Класс</p>
            </>
        )}
    </Link>
  )
}

export default GridButton

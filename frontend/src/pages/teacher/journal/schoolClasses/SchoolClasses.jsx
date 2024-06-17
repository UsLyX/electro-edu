import React from 'react'
import style from './schoolClasses.module.scss'

import GridButton from '../../../../elements/gridButton/GridButton'

import {ReactComponent as BackIcon} from '../../../../assets/back.svg'

const SchoolClasses = () => {
  return (
    <div className={style.wrapper}>
      <h1 className={style.title}>Классы</h1>
      <div className={style.classes}>
        <GridButton number="1" path="/teacher/journal/predmets/1" className={style.button}></GridButton>
        <GridButton number="2" path="/teacher/journal/predmets/2" className={style.button}></GridButton>
        <GridButton number="3" path="/teacher/journal/predmets/3" className={style.button}></GridButton>
        <GridButton number="4" path="/teacher/journal/predmets/4" className={style.button}></GridButton>
        <GridButton number="5" path="/teacher/journal/predmets/5" className={style.button}></GridButton>
        <GridButton number="6" path="/teacher/journal/predmets/6" className={style.button}></GridButton>
        <GridButton number="7" path="/teacher/journal/predmets/7" className={style.button}></GridButton>
        <GridButton number="8" path="/teacher/journal/predmets/8" className={style.button}></GridButton>
        <GridButton number="9" path="/teacher/journal/predmets/9" className={style.button}></GridButton>
        <GridButton number="10" path="/teacher/journal/predmets/10" className={style.button}></GridButton>
        <GridButton number="11" path="/teacher/journal/predmets/11" className={style.button}></GridButton>
        <GridButton svg={<BackIcon />} path="/teacher" className={style.button}>Назад</GridButton>
      </div>
    </div>
  )
}

export default SchoolClasses

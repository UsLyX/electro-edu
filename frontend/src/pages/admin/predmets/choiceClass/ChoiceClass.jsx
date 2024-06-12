import React from 'react'
import style from './choiceClass.module.scss'

import GridButton from '../../../../elements/gridButton/GridButton'

import {ReactComponent as BackIcon} from '../../../../assets/back.svg'

const ChoiceClass = () => {
  return (
    <div className={style.wrapper}>
      <h1 className={style.title}>Администрирование предметов</h1>
      <p className={style.subtitle}>Выберите класс</p>
      <div className={style.classes}>
        <GridButton number="1" path="/admin/predmets/editPredmets/1" className={style.button}></GridButton>
        <GridButton number="2" path="/admin/predmets/editPredmets/2" className={style.button}></GridButton>
        <GridButton number="3" path="/admin/predmets/editPredmets/3" className={style.button}></GridButton>
        <GridButton number="4" path="/admin/predmets/editPredmets/4" className={style.button}></GridButton>
        <GridButton number="5" path="/admin/predmets/editPredmets/5" className={style.button}></GridButton>
        <GridButton number="6" path="/admin/predmets/editPredmets/6" className={style.button}></GridButton>
        <GridButton number="7" path="/admin/predmets/editPredmets/7" className={style.button}></GridButton>
        <GridButton number="8" path="/admin/predmets/editPredmets/8" className={style.button}></GridButton>
        <GridButton number="9" path="/admin/predmets/editPredmets/9" className={style.button}></GridButton>
        <GridButton number="10" path="/admin/predmets/editPredmets/10" className={style.button}></GridButton>
        <GridButton number="11" path="/admin/predmets/editPredmets/11" className={style.button}></GridButton>
        <GridButton svg={<BackIcon />} path="/admin" className={style.button}>Назад</GridButton>
      </div>
    </div>
  )
}

export default ChoiceClass

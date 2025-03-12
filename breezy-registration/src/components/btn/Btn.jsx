import React from 'react'
import clsx from 'clsx';

import styles from './Btn.module.css'

const Btn = (props) => {
  const {mode} = props;
  return (
    <button className={clsx([styles.btn], {
      [styles.primary]: (mode==='primary'),
      [styles.on_primary]:(mode ==='on_primary'),
    })} {...props}>
      {props.children}</button>
  )
}

export default Btn
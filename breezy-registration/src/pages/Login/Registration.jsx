import React, { useState, useEffect } from 'react'
import styles from './Login.module.css'
import Btn from '../../components/btn/Btn'
import InputLogin from '../../components/InputLogin/InputLogin'
import logo from '../../img/logo.webp'
import { useNavigate } from 'react-router-dom'
import { linkApi } from '../..'

const Registration = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [inputModeLog, setInputModeLog] = useState('')
  const [inputModePass, setInputModePass] = useState('')
  const [inputModePass2, setInputModePass2] = useState('')

  let navigate = useNavigate()

  function fetchReg() {
    setInputModeLog('')
    setInputModePass('')
    setInputModePass2('')
    if (username === '')
      setInputModeLog('none')
    else if (password === '')
      setInputModePass('none')
    else if (password2 === '')
      setInputModePass2('none')
    else if (password !== password2)
      setInputModePass2('err')
    else {
      console.log('click')
      fetch(`${linkApi}register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      }).then((response) => {
        const result = response.json();
        if (response.ok) {
          localStorage.setItem('access_token', result.access_token);
           navigate('/login')
        } else {
          console.log(`huya: ${result.error}`)
          setInputModeLog('err')
        }
      })
    }
  }

  const handleKeyPress = (event) => {
    // event.preventDefault();
    if (event.key === 'Enter') {
      console.log('enter')
      fetchReg()
    }
  };


  useEffect(() => {
    // Добавляем обработчик события нажатия клавиш
    window.addEventListener('keydown', handleKeyPress);

    // Убираем обработчик при размонтировании компонента
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [username, password]);

  return (
    <div className={styles.container}>
      <div className={styles.login_container}>
        <div className={styles.login_description}>
          <img className={styles.logo} src={logo} alt='лого' />
          <h1 className={styles.login_title}>Создать аккаунт Breezy</h1>
          <p className={styles.login_title_description}>Придумайте логин и пароль</p>
        </div>
        <div className={styles.login_form}>
          <div>
            <InputLogin  mode={(inputModeLog === 'err' || inputModeLog === 'none') ? 'err' : ''} type='email' value={username} onChange={(e) => setUsername(e.target.value)}>Телефон или адрес эл. почты</InputLogin>
             {inputModeLog === 'none' && <span className={styles.err_label}>Введите логин.</span>}
             {inputModeLog === 'err' && <span className={styles.err_label}>Имя пользователя занято.</span>}
            <InputLogin  mode={(inputModePass === 'err' || inputModePass === 'none') ? 'err' : ''} type='password' value={password} onChange={(e) => setPassword(e.target.value)}>Пароль</InputLogin>
            {inputModePass === 'none' && <span className={styles.err_label}>Введите пароль.</span>}
            <InputLogin  mode={(inputModePass2 === 'err' || inputModePass2 === 'none') ? 'err' : ''} type='password' value={password2} onChange={(e) => setPassword2(e.target.value)}>Повторите пароль</InputLogin>
            {inputModePass2 === 'none' && <span className={styles.err_label}>Повторите пароль.</span>}
            {inputModePass2 === 'err' && <span className={styles.err_label}>Пароли не совпадают.</span>}
          </div>
          <div className={styles.btn_container}>
            <Btn mode={'on_primary'} onClick={() => navigate('/login')}>Назад</Btn>
            <Btn mode={'primary'} onClick={fetchReg}>Далее</Btn>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Registration
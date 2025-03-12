import React, { useState, useEffect, useRef } from 'react'
import styles from './Login.module.css'
import Btn from '../../components/btn/Btn'
import InputLogin from '../../components/InputLogin/InputLogin'
import logo from '../../img/logo.webp'
import { Link, useNavigate } from 'react-router-dom'
import { linkApi } from '../..'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  let navigate = useNavigate()
  const [inputModeLog, setInputModeLog] = useState('')
  const [inputModePass, setInputModePass] = useState('')
  const loginRef = useRef(null)
  const passwordRef = useRef(null)

  async function fetchLogin() {
    setInputModeLog('')
    setInputModePass('')
    if (username === '') {
      setInputModeLog('none')
      loginRef.current.focus()
    }
  
    else if (password === '') {
      setInputModePass('none')
      passwordRef.current.focus()
    }

  
    else {
      const struct = {
        "login": username,
        "password": password,
       }
       console.log(struct)

      fetch(`${linkApi}authentication`, {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(struct)
      }).then((response) => response.json()).then((result) => {
        if (result.error === "no user found") {
          setInputModeLog('err')
        }
        else if (result.error === "password incorrect") {
          setInputModePass('err')
        }
        else {
          authorization()
        }
      })
    }
  }
  
  function authorization() {
    fetch(`${linkApi}authorization?login=<id>${username}`)
      .then((response) => response.json()).then(res => {
        if (res.error === "login is required")
          console.log('err login is required')
        else if (res.error)
          console.log("error in JWT")
        else {
          localStorage.setItem('accesstoken', res.accesstoken);
          localStorage.setItem('refreshtoken', res.refreshtoken);
        }
      })
  }

  const handleKeyPress = (event) => {
    // event.preventDefault();
    if (event.key === 'Enter') {
      console.log('enter')
      // getall()
      fetchLogin()
    }
  };

  function getall() {
    fetch(`${linkApi}users/getall`, {
      method: 'GET', 
      headers: { 'Content-Type': 'application/json' }
      }
    )
  }

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
          <h1 className={styles.login_title}>Вход</h1>
          <p className={styles.login_title_description}> Для перехода к Breezy Notes войдите в свой аккаунт Breezy</p>
        </div>
        <div className={styles.login_form}>
          <div>
            <InputLogin
              ref={loginRef}
              type='email'
              mode={(inputModeLog === 'err' || inputModeLog === 'none') ? 'err' : ''}
              value={username}
              onChange={(e) => setUsername(e.target.value)}>
              Телефон или адрес эл. почты
            </InputLogin>
            {inputModeLog === 'err' && <span className={styles.err_label}>Не удалось найти аккаунт Breezy.</span>}
            {inputModeLog === 'none' && <span className={styles.err_label}>Введите логин.</span>}
            <InputLogin
              ref={passwordRef}
              type='password'
              mode={(inputModePass === 'err' || inputModePass === 'none') ? 'err' : ''}
              value={password}
              onChange={(e) => setPassword(e.target.value)}>
              Пароль
            </InputLogin>
            {inputModePass === 'none' && <span className={styles.err_label}>Введите пароль.</span>}
            {inputModePass === 'err' && <span className={styles.err_label}>Неверный логин или пароль. Повторите попытку, или нажмите "Забыли пароль?", чтобы сбросить его.</span>}
            <div className={styles.recovery_link_container}>
              <Link className={styles.recovery_link} to='/recovery'>Забыли пароль?</Link>
            </div>
          </div>
          <div className={styles.btn_container}>
            <Btn mode={'on_primary'} onClick={() => navigate('/reg')}>Создать аккаунт</Btn>
            <Btn mode={'primary'} onClick={fetchLogin}>Далее</Btn>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
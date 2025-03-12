import React, { useState } from 'react'
import styles from './Login.module.css'
import Btn from '../../components/btn/Btn'
import InputLogin from '../../components/InputLogin/InputLogin'
import logo from '../../img/logo.webp'
import { useNavigate } from 'react-router-dom'

const RecoveryPass1 = () => {
    const [login, setLogin] = useState('')
    let navigate = useNavigate()


    return (
        <div className={styles.container}>
            <div className={styles.login_container}>
                <div className={styles.login_description}>
                    <img className={styles.logo} src={logo}  alt='лого'/>
                    <h1 className={styles.login_title}>Восстановление пароля</h1>
                    <p className={styles.login_title_description}>Чтобы восстановить пароль, введите электронную почту, указанную при регистрации</p>
                </div>
                <div className={styles.login_form}>
                    <div>
                        <InputLogin type='email' value={login} onChange={(e) => setLogin(e.target.value)}>Телефон или адрес эл. почты</InputLogin>

                    </div>
                    <div className={styles.btn_container}>
                        <Btn mode={'on_primary'} onClick={() => navigate('/login')}>Назад</Btn>
                        <Btn mode={'primary'}>Далее</Btn>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecoveryPass1
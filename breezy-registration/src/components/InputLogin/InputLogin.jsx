import React, { useState } from 'react'
import styles from './InputLogin.module.css'

const InputLogin = ({mode, ref, type, value, onChange, onKeyPress, children}) => {
    const [isFocus, setIsFocus] = useState(false)


    function Focus(e) {
        e.preventDefault();
        setIsFocus(true);
    }

    function Blur(e) {
        e.preventDefault();
        if (e.target.value === '')
            setIsFocus(false)
    }

    const styleInput = {
        border: isFocus ? '2px solid var(--md-sys-color-primary)' : '1px solid var(--md-sys-color-on-surface)'
    };
    const styleLabel = {
        transform: isFocus ? 'scale(0.75) translateY(-35px)' : 'none',
        color: isFocus ? 'var(--md-sys-color-primary)' : 'var(--md-sys-color-on-surface)',
        zIndex: isFocus ? '2' : '1'
    };


    const styleInputErr = {
        border: isFocus ? '2px solid var(--md-sys-color-error)' : '1px solid var(--md-sys-color-error)'
    };
    const styleLabelErr = {
        transform: isFocus ? 'scale(0.75) translateY(-35px)' : 'none',
        color: 'var(--md-sys-color-error)',
        zIndex: isFocus ? '2' : '1'
    };


    return (
        <div className={styles.input_container}>
            <div className={styles.input_login_label} style={mode === 'err' ? styleLabelErr : styleLabel} >{children}</div>
            <div className={styles.input_border} style={mode === 'err' ? styleInputErr : styleInput}>
                <input className={styles.input}
                    ref={ref}
                    type={type}
                    value={value}
                    onFocus={Focus}
                    onBlur={Blur}
                    onChange={onChange}
                    onKeyDown={onKeyPress} />
            </div>
        </div>
    )
}

export default InputLogin
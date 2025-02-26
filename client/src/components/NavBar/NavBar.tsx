import React, {useState} from 'react';
import {Layout, Menu, Button, Space, Image} from 'antd';
import styles from './stylesNavBar.module.css';
import logo from '../../assets/logo.svg'
import {useNavigate} from "react-router";


const {Header} = Layout;



function NavBar() {

    const navigate = useNavigate();


    const handleLoginClick = () => {

        navigate('/login');
    };

    const handleRegisterClick = () => {

        navigate('/register');
    };

    return (
        <Header className={styles.header}>
            <Space className={styles.logo}>
                <Image className={styles.logo} src={logo}  preview={false}/>
                <span className={styles.companyName}>Pero Travel</span>
            </Space>
            <Space mode="horizontal" className={styles.menu}>

                <Button type="text"  onClick={handleLoginClick} className={styles.transparentButton}>
                    Авторизация
                </Button>

                <Button type="text" onClick={handleRegisterClick} className={styles.transparentButton}>Регистрация</Button>
            </Space>

        </Header>
    );
}

export default NavBar;
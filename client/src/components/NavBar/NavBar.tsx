import React from 'react';
import { Layout, Space, Image } from 'antd';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';
import logo from '../../assets/logo.svg';

const { Header } = Layout;

function NavBar() {
    return (
        <Header className={styles.header}>
            <Space className={styles.logo}>
                <Image className={styles.logo} src={logo} preview={false} />
                <span className={styles.companyName}>Pero Travel</span>
            </Space>
            <Space direction="horizontal" className={styles.menu}>
                <Link to="/login" className={styles.transparentButton}>
                    Авторизация
                </Link>
                <Link to="/register" className={styles.transparentButton}>
                    Регистрация
                </Link>
            </Space>
        </Header>
    );
}

export default NavBar;
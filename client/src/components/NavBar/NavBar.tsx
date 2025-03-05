import { Layout, Space, Image } from 'antd';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';
import logo from '../../assets/logo.svg';
import { menuItems } from "./menuItems.ts";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store/store.tsx";

const { Header } = Layout;

function NavBar() {
    const user = useSelector((store: RootState) => store.auth.user);
    const role = user ? user.role : null;
    const currentValueRole = role ? menuItems[role] : null;

    return (
        <Header className={`${styles.header} ${user ? styles.authenticated : ''}`}>
            <Space className={styles.logo}>
                <Image className={styles.logo} src={logo}  preview={false} />
                <span  className={styles.companyName} >Pero Travel</span>
            </Space>
            <Space direction="horizontal" className={styles.menu}>
                {role ? (
                    currentValueRole ? (
                        currentValueRole.map((item, index) => (
                            <Link  className={styles.transparentButton} key={index} to={item.route}>
                                {item.name}
                            </Link>
                        ))
                    ) : null
                ) : (
                    <>
                        <Link to="/login" className={styles.transparentButton}>
                            Авторизация
                        </Link>
                        <Link to="/register" className={styles.transparentButton}>
                            Регистрация
                        </Link>
                    </>
                )}
            </Space>
        </Header>
    );
}

export default NavBar;
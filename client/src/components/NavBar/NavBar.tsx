import { useState } from 'react';
import { Layout, Space, Image, Drawer, Button } from 'antd';
import { Link } from 'react-router-dom';
import { MenuOutlined } from '@ant-design/icons';
import styles from './styles.module.css';
import logo from '../../assets/logo.svg';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store.tsx';
import { USER_ROLE_ROUTES } from './menuItems.tsx';

const { Header } = Layout;

function NavBar() {
    const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
    const showDrawer = () => setDrawerVisible(true);
    const closeDrawer = () => setDrawerVisible(false);

    const userAuth = useSelector((store: RootState) => store.auth.user);
    const userReg= useSelector((store: RootState) => store.registration.user);
    const role = userAuth?.role || userReg?.role || null;

    return (
        <Header className={`${styles.header} ${role ? styles.authenticated : ''}`}>
            <Space className={styles.logo}>
                <Image className={styles.logo} src={logo} preview={false} />
                <span className={styles.companyName}>Pero Travel</span>
            </Space>

            <div className={styles.mobileMenu}>
                <Button
                    type="text"
                    className={styles.burgerButton}
                    icon={<MenuOutlined />}
                    onClick={showDrawer}
                />
                <Drawer
                    title="Меню"
                    placement="right"
                    onClose={closeDrawer}
                    open={drawerVisible}
                    style={{
                        body: { padding: 0 },
                    }}
                >
                    <div className={styles.drawerMenu}>
                        {role ? (
                            USER_ROLE_ROUTES[role]?.map(({ name, route }) => (
                                <Link
                                    key={route}
                                    className={styles.drawerButton}
                                    to={route}
                                    onClick={closeDrawer}
                                >
                                    {name}
                                </Link>
                            ))
                        ) : (
                            <>
                                <Link
                                    key="login"
                                    to="/login"
                                    className={styles.drawerButton}
                                    onClick={closeDrawer}
                                >
                                    Авторизация
                                </Link>
                                <Link
                                    key="register"
                                    to="/register"
                                    className={styles.drawerButton}
                                    onClick={closeDrawer}
                                >
                                    Регистрация
                                </Link>
                            </>
                        )}
                    </div>
                </Drawer>
            </div>

            <Space direction="horizontal" className={styles.menu}>
                {role ? (
                    USER_ROLE_ROUTES[role]?.map(({ name, route }) => (
                        <Link
                            key={route}
                            className={styles.transparentButton}
                            to={route}
                        >
                            {name}
                        </Link>
                    ))
                ) : (
                    <>
                        <Link key="login" to="/login" className={styles.transparentButton}>
                            Авторизация
                        </Link>
                        <Link key="register" to="/register" className={styles.transparentButton}>
                            Регистрация
                        </Link>
                    </>
                )}
            </Space>
        </Header>
    );
}

export default NavBar;
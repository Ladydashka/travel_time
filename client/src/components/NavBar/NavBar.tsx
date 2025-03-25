import { useState } from 'react';
import { Layout, Space, Image, Drawer, Button } from 'antd';
import { Link } from 'react-router-dom';
import { MenuOutlined } from '@ant-design/icons';
import style from './styles.module.css';
import logo from '../../assets/logo.svg';
import { USER_ROLE_ROUTES } from './menuItems.tsx';
import getRole from "./getRole.ts";

const { Header } = Layout;

function NavBar() {
    const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
    const showDrawer = () => setDrawerVisible(true);
    const closeDrawer = () => setDrawerVisible(false);



    const role = getRole()

    return (
        <Header className={`${style.header} ${role ? style.authenticated : ''}`}>
            <Space className={style.logo}>
                <Image  className={`${style.logo} ${role ? style.authenticated : ''}`} src={logo} preview={false} />
                <span  className={`${style.companyName} ${role ? style.authenticated : ''}`}>Pero Travel</span>
            </Space>

            <div className={style.mobileMenu}>
                <Button
                    className={style.burgerButton}
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
                    <div className={style.drawerMenu}>
                        {role ? (
                            USER_ROLE_ROUTES[role]?.map(({ name, route }) => (
                                <Link
                                    key={route}
                                    className={style.drawerButton}
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
                                    className={style.drawerButton}
                                    onClick={closeDrawer}
                                >
                                    Авторизация
                                </Link>
                                <Link
                                    key="register"
                                    to="/register"
                                    className={style.drawerButton}
                                    onClick={closeDrawer}
                                >
                                    Регистрация
                                </Link>
                            </>
                        )}
                    </div>
                </Drawer>
            </div>

            <Space direction="horizontal" className={style.menu}>
                {role ? (
                    USER_ROLE_ROUTES[role]?.map(({ name, route }) => (
                        <Link
                            key={route}
                            className={`${style.transparentButton} ${role ? style.authenticated : ''}`}
                            to={route}
                        >
                            {name}
                        </Link>
                    ))
                ) : (
                    <>
                        <Link key="login" to="/login" className={style.transparentButton}>
                            Авторизация
                        </Link>
                        <Link key="register" to="/register" className={style.transparentButton}>
                            Регистрация
                        </Link>
                    </>
                )}
            </Space>
        </Header>
    );
}

export default NavBar;
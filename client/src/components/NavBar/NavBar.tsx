import  { useState } from 'react';
import { Layout, Space, Image, Drawer, Button } from 'antd';
import { Link } from 'react-router-dom';
import { MenuOutlined } from '@ant-design/icons';
import styles from './styles.module.css';
import logo from '../../assets/logo.svg';
import { menuItems } from './menuItems.ts';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store.tsx';

const { Header } = Layout;

function NavBar() {
    const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
    const user = useSelector((store: RootState) => store.auth.user);
    const role = user ? user.role : null;
    const currentValueRole = role ? menuItems[role] : null;


    const showDrawer = () => setDrawerVisible(true);
    const closeDrawer = () => setDrawerVisible(false);

    return (
        <Header className={`${styles.header} ${user ? styles.authenticated : ''}`}>
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
                    visible={drawerVisible}
                    bodyStyle={{ padding: 0 }}
                >
                    <div className={styles.drawerMenu}>
                        {role ? (
                            currentValueRole?.map((item, index) => (
                                <Link
                                    key={index}
                                    className={styles.drawerButton}
                                    to={item.route}
                                    onClick={closeDrawer}
                                >
                                    {item.name}
                                </Link>
                            ))
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className={styles.drawerButton}
                                    onClick={closeDrawer}
                                >
                                    Авторизация
                                </Link>
                                <Link
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
                    currentValueRole?.map((item, index) => (
                        <Link
                            key={index}
                            className={styles.transparentButton}
                            to={item.route}
                        >
                            {item.name}
                        </Link>
                    ))
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
import {Layout, Row, Col, Typography, Divider, Space} from 'antd';
import {
    FacebookOutlined,
    InstagramOutlined,
    MailOutlined,
    PhoneOutlined,
    EnvironmentOutlined,
    WhatsAppOutlined
} from '@ant-design/icons';
import style from './styles.module.css';
import {USER_ROLE_ROUTES} from "../../NavBar/menuItems.tsx";
import getRole from "../../NavBar/getRole.ts";

const {Footer} = Layout;
const {Text, Link, Title} = Typography;

const AppFooter = () => {
    const role = getRole();

    return (
        <Footer className={style.footer}>
            <div className={style.container}>
                <Row gutter={[40, 40]}>
                    <Col xs={24} md={8}>
                        <div className={style.brandSection}>
                            <Title level={3} className={style.title}>Travel Time</Title>
                            <Text className={style.description}>
                                Сервис для поиска экскурсий и гидов. Откройте для себя новые места
                                с местными экспертами.
                            </Text>
                            <div className={style.socialLinks}>
                                <Link href="#" className={style.socialIcon}><FacebookOutlined/></Link>
                                <Link href="#" className={style.socialIcon}><InstagramOutlined/></Link>
                                <Link href="#" className={style.socialIcon}><WhatsAppOutlined/></Link>
                            </div>
                        </div>
                    </Col>

                    <Col xs={24} md={8}>
                        <div className={style.navigationSection}>
                            <Title level={5} className={style.sectionTitle}>Навигация</Title>
                            <Space direction="vertical" size="middle" className={style.menu}>
                                {role ? (
                                    USER_ROLE_ROUTES[role]?.map(({name, route}) => (
                                        <Link
                                            key={route}
                                            className={style.navLink}
                                            href={route}
                                        >
                                            {name}
                                        </Link>
                                    ))
                                ) : (
                                    <>null</>
                                )}
                            </Space>
                        </div>
                    </Col>

                    <Col xs={24} md={8}>
                        <div className={style.contactSection}>
                            <Title level={5} className={style.sectionTitle}>Контакты</Title>
                            <div className={style.contacts}>
                                <div className={style.contactItem}>
                                    <PhoneOutlined className={style.contactIcon}/>
                                    <Text className={style.text}>+7 (123) 456-78-90</Text>
                                </div>
                                <div className={style.contactItem}>
                                    <MailOutlined className={style.contactIcon}/>
                                    <Text className={style.text}>info@traveltime.com</Text>
                                </div>
                                <div className={style.contactItem}>
                                    <EnvironmentOutlined className={style.contactIcon}/>
                                    <Text className={style.text}>г. Санкт-Петербург, Невский пр. 100</Text>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </Footer>
    );
};

export default AppFooter;
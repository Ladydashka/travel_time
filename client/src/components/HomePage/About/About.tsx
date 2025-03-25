import { Card, Typography, Row, Col, Divider } from 'antd';
import { TeamOutlined, StarOutlined, GlobalOutlined, HeartOutlined } from '@ant-design/icons';
import style from './styles.module.css';

function About(){
    return (
        <div className={style.container}>
            <div className={style.header}>
                <Typography.Title level={2} className={style.title}>
                    О нашем сервисе
                </Typography.Title>
                <Typography.Paragraph className={style.subtitle}>
                    Мы создаём незабываемые встречи между путешественниками и местными гидами
                </Typography.Paragraph>
            </div>


            <Row gutter={[24, 24]} className={style.cardRow}>
                <Col xs={24} sm={12} lg={8} className={style.cardCol}>
                    <Card className={style.card} hoverable>
                        <TeamOutlined className={style.icon} />
                        <Typography.Title level={4} className={style.cardTitle}>
                            Настоящие люди
                        </Typography.Title>
                        <Typography.Paragraph className={style.cardText}>
                            Наши гиды - это не аудиогиды, а живые люди с горящими глазами, которые
                            покажут Вам город так, как его видят местные жители.
                        </Typography.Paragraph>
                    </Card>
                </Col>

                <Col xs={24} sm={12} lg={8} className={style.cardCol}>
                    <Card className={style.card} hoverable>
                        <StarOutlined className={style.icon} />
                        <Typography.Title level={4} className={style.cardTitle}>
                            Уникальные маршруты
                        </Typography.Title>
                        <Typography.Paragraph className={style.cardText}>
                            От тайных двориков до легендарных мест - экскурсии, которых Вы не найдёте
                            в стандартных путеводителях.
                        </Typography.Paragraph>
                    </Card>
                </Col>

                <Col xs={24} sm={12} lg={8} className={style.cardCol}>
                    <Card className={style.card} hoverable>
                        <GlobalOutlined className={style.icon} />
                        <Typography.Title level={4} className={style.cardTitle}>
                            Для всех вкусов
                        </Typography.Title>
                        <Typography.Paragraph className={style.cardText}>
                            Гастротуры, фотосессии, квесты или исторические реконструкции -
                            выбирайте то, что заставит Ваше сердце биться чаще!
                        </Typography.Paragraph>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default About;
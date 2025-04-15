import { Flex, Space, Typography} from "antd";
import {FieldTimeOutlined} from '@ant-design/icons';
import style from './styles.module.css'
import {Content} from "antd/es/layout/layout";
import getHourWord from "./getHourWord.ts";
import {Link} from "react-router-dom";
import {Excursion} from "../../types/types.ts";

function ExcursionItem({currentExcursions}: { currentExcursions: Excursion[] }){

    return(
        <Content className={style.flexContainer}>
            {
                currentExcursions.map((excursion: Excursion) =>

                    <Flex className={style.post} key={excursion.id}  >
                        <img className={style.img} src={excursion.photo_url} alt={'Изображение экскурсии'}/>
                        <Flex className={style.description}>
                            <Typography.Title  level={3}>{excursion.title}</Typography.Title>
                            <Flex>
                                <FieldTimeOutlined className={style.icon} />
                                <Typography.Text className={style.hours}> {excursion.duration}{' '}{getHourWord(excursion.duration)}</Typography.Text>

                            </Flex>
                            <Space className={style.text}>
                                <Typography.Paragraph>{excursion.description.slice(0,300) + '...'}</Typography.Paragraph>
                            </Space>
                            <Link className={style.link} to={`/excursion/${excursion.id}`}>Подробнее</Link>
                        </Flex>

                    </Flex>
                )
            }

        </Content>)

}

export default ExcursionItem;
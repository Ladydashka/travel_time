import { RootState, useAppDispatch } from '../../../redux/store/store.tsx';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { findGuide } from '../../../redux/guide/guideThunk.ts';
import { Content } from 'antd/es/layout/layout';
import { Empty, Flex, Typography } from 'antd';
import style from './styles.module.css'
import { GlobalOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import {Excursion} from "../../../types/types.ts";

function InfoGuide({result}:{result: Excursion}){
  const guideId =  result.guide_id;
  const dispatch = useAppDispatch();
  const { guide } = useSelector((store: RootState) => store.oneGuide);


  useEffect(() => {
    dispatch(findGuide(guideId));
  }, [dispatch]);

  return(
    <Content className={style.contactInfo}>
      <Typography.Title level={4} className={style.title}>Контактные данные гида</Typography.Title>
      <Content className={style.content}>
        {guide ? (
          <div >
            <Flex className={style.flexContainer}>
              <Flex >
                <img src={guide.avatar_url} alt='Фото гида' className={style.img} />
                <Typography.Paragraph className={style.guideName}>{guide.name}</Typography.Paragraph>
              </Flex>
              <Content className={style.guideDetails} >
                <Typography.Paragraph className={style.languages}>
                  <GlobalOutlined className={style.icon} /> Язык: {guide.languages}
                </Typography.Paragraph>
                <Typography.Paragraph className={style.phone}>
                  <PhoneOutlined className={style.icon} /> Телефон: {guide.phone}
                </Typography.Paragraph>
                <Typography.Paragraph className={style.email}>
                  <MailOutlined className={style.icon} /> Email: {guide.email}
                </Typography.Paragraph>
              </Content>
            </Flex>
          </div>
        ) : (
          <Empty>Данных о гиде нет</Empty>
        )}
      </Content>
    </Content>
  )

}

export default InfoGuide;

import { Card, Typography, Empty, Space, Layout } from 'antd';
import style from './styles.module.css';
import {Link} from "react-router-dom";
import {RootState, useAppDispatch} from "../../redux/store/store.tsx";
import {useSelector} from "react-redux";
import {getAllExcursion} from "../../redux/excursion/excursionThunk.ts";
import {useEffect} from "react";
import {Content} from "antd/es/layout/layout";

function Excursions() {
    const dispatch = useAppDispatch();
    const excursions = useSelector((store: RootState) => store.excursions.excursions).slice(0,8);



    useEffect(() => {
        dispatch(getAllExcursion());
    }, [dispatch]);


    return (
       <Content>
           <Space className={style.space}>
               <span  className={style.toursTitle}>Популярные экскурсии</span>
               <Link  to='/excursions'>смотреть все</Link>
           </Space>
           <Space className={style.toursContainer}>
               <Layout.Content className={style.listTour}>
                   {excursions && excursions.length > 0 ? (
                       excursions.map((excursion) => (
                           <Card key={excursion.id} className={style.customCard}>
                               <img className={style.imgExcursion} src={excursion.photo_url} alt="Изображение экскурсии" />
                               <div className={style.cardContent}>
                                   <div>
                                       <Typography.Paragraph className={style.titleCard}>{excursion.title}</Typography.Paragraph>
                                   </div>
                                   <Typography.Paragraph className={style.leftAlign}> {excursion.description.length > 100
                                       ? `${excursion.description.slice(0, 99)}...`
                                       : excursion.description}</Typography.Paragraph>
                                   <button className={style.moreButton}>Подробнее</button>
                               </div>
                           </Card>
                       ))
                   ) : (
                       <Empty description="Нет доступных экскурсий" />
                   )}
               </Layout.Content>
           </Space>
       </Content>
    );
};

export default Excursions;
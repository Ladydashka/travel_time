import style from './styles.module.css';
import NavBar from '../NavBar/NavBar.tsx';
import { Empty, Layout, Space, Typography } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { RootState, useAppDispatch } from '../../redux/store/store.tsx';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllExcursion } from '../../redux/excursion/excursionThunk.ts';
import { useParams } from 'react-router';
import CommentComponent from './CommentComponent/CommentComponent.tsx';
import { StarOutlined,ClockCircleOutlined } from '@ant-design/icons';
import AllComments from './allComments/AllComments.tsx';
import InfoGuide from './Guide/InfoGuide.tsx';
import Footer from '../Footer/Footer.tsx';
import {Excursion} from "../../types/types.ts";

function ExcursionDetails() {
  const { id } = useParams()
  const parsedId = id ? parseInt(id, 10) : console.error('id не является строкой');

  const dispatch = useAppDispatch();
  const excursions = useSelector(
    (store: RootState) => store.excursions.excursions
  );

  const result: Excursion | undefined = excursions.find(excursion  => excursion.id === parsedId);

  useEffect(() => {
    dispatch(getAllExcursion());
  }, [dispatch]);


  return (
    <Layout className={style.layout}>
          <NavBar />
      <Content>
        {result ? (
          <>
            <Typography.Title className={style.title}>{result.title}</Typography.Title>
            <Space className={style.ratingAndDuration}>
              <StarOutlined className={style.star}  />
              {result.rating}
              <ClockCircleOutlined className={style.clock}/>
              {result.duration }
            </Space>
            <Content>
              <img src={result.photo_url} alt={'Изображение'} className={style.excursionImage}/>
            </Content>
            <Space className={style.description}>
              {result.description}
            </Space>
           <Content className={style.commentsAndGuideSection}>
             <AllComments/>
             <CommentComponent result={result} />
             <InfoGuide result={result}/>
           </Content>
          </>
        ) : (
          <div className={style.errorData}>
            <Empty>Ошибка</Empty>
          </div>

        )}
      </Content>
      <Footer/>
    </Layout>);
}

export default ExcursionDetails;
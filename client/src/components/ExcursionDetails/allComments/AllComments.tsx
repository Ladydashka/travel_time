import { useEffect } from 'react';
import { RootState, useAppDispatch } from '../../../redux/store/store.tsx';
import { getComments } from '../../../redux/comments/commentsThunk.ts';
import { useSelector } from 'react-redux';
import { Avatar, Divider, Flex, Rate, Typography} from 'antd';
import style from './styles.module.css';
import { Content } from 'antd/es/layout/layout';
import { UserOutlined } from '@ant-design/icons';

function AllComments() {
  const dispatch = useAppDispatch();
  const { comments } = useSelector((store: RootState) => store.allComments);

  useEffect(() => {
    dispatch(getComments());
  }, [dispatch]);

  return (
    <Content className={style.reviewsContainer}>
      <Typography.Title level={4}>Отзывы клиентов</Typography.Title>
      <Flex>
        <Rate allowHalf disabled defaultValue={4.5} />
        <Typography.Paragraph className={style.numberOfReviews}>( Отзывов: {comments.length})</Typography.Paragraph>
      </Flex>
       {comments.map((review, index) => (
        <div key={index} className={style.card}>
          <div >
            <Flex className={style.nameAndAvatar}>
              <Avatar className={style.avatar} icon={<UserOutlined />} />
              <Flex className={style.review}>
                <Typography.Title level={5} className={style.reviewName}>{review.name}</Typography.Title>
                <Flex>
                  <Rate  allowHalf disabled defaultValue={review.rating} />
                  <span className={style.reviewDate}>
                   {new Date(review.date).toLocaleDateString('ru-RU', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                    })}
                  </span>
                </Flex>
                <Typography.Paragraph className={style.text}>{review.text}</Typography.Paragraph>
              </Flex>
            </Flex>
            <Divider />
          </div>
        </div>
      ))}
    </Content>
  );
}

export default AllComments;
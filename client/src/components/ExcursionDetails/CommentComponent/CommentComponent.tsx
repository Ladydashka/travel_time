import { useForm } from 'react-hook-form';
import { Content } from 'antd/es/layout/layout';
import RatingComponent from '../RatingComponent/RatingComponent';
import { Typography } from 'antd';
import style from './styles.module.css';
import {useEffect, useState} from 'react';
import { useAppDispatch } from '../../../redux/store/store.tsx';
import getUser from "../../../selectors/getUser.ts";
import getRole from "../../../selectors/getRole.ts";
import {createComment} from "../../../redux/comments/commentsThunk.ts";
import {Excursion} from "../../../types/types.ts";


function CommentComponent({result}:{result:Excursion}) {
  const [ratingValue, setRatingValue] = useState(3);
  const dispatch = useAppDispatch();

  const role = getRole();
  const user = getUser()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const onSubmit = async (data) => {
    const fullData = {
      ...data,
      rating: ratingValue,
      guide_id: result.guide_id,
      tour_id: result.id,
      user_id: user.id,
    };
    try {
      await dispatch(createComment(fullData));

    } catch (error) {
      console.error('Произошла ошибка при отправлении отзыва:', error);
    }
  };

  const handleGetValueRating = (value: number) => {
    setRatingValue(value);
  };

  return (
    <Content className={style.commentComponent}>
      <Typography.Title level={4} className={style.titleComment}>Оставить отзыв</Typography.Title>
      <RatingComponent handleGetValueRating={handleGetValueRating} />
      <Content className={style.form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Ваш отзыв</label>
          {errors.text && (
            <span className={style.error}>Это поле обязательно</span>
          )}
          <input type='text' {...register('text', { required: true })} className={style.inputField} placeholder={'Поделитесь своими впечатлениями...'} />
          <button type="submit" className={style.submitButton} disabled={role === 'guide'}>
            Отправить отзыв
          </button>
        </form>
      </Content>
    </Content>
  );
}

export default CommentComponent;
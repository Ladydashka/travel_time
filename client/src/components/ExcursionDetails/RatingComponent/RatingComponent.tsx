import  { useState } from 'react';
import { Flex, Rate, Typography } from 'antd';
import { Content } from 'antd/es/layout/layout';
import style from './styles.module.css';

function RatingComponent({ handleGetValueRating }) {
  const [value, setValue] = useState(3);

  const handleChange = (newValue: number) => {
    setValue(newValue);
    handleGetValueRating(newValue);
  };

  return (
    <Content>
      <Typography.Title className={style.titleRating} level={5}>Ваша оценка</Typography.Title>
      <Flex className={style.rating}>
        <Rate value={value} onChange={handleChange} />
        <p className={style.paragraph}> {value} из 5</p>
      </Flex>
    </Content>
  );
}

export default RatingComponent;
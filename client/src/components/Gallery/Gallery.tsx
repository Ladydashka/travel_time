import style from './styles.module.css'
import {Empty, Space} from "antd";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { RootState, useAppDispatch } from "../../redux/store/store.tsx";
import { useSelector } from "react-redux";
import { getImagesThank } from "../../redux/gallery/galleryThunk.ts";
import {Content} from "antd/es/layout/layout";

function Gallery() {
    const dispatch = useAppDispatch();
    const images = useSelector((store: RootState) => store.images.images);


    useEffect(() => {
        dispatch(getImagesThank());
    }, [dispatch]);

    return (
        <>
            <Space className={style.space}>
                <span className={style.galleryTitle}>Галерея</span>
                <Link  to='/excursions'>смотреть все</Link>
            </Space>
            <Space className={style.galleryGrid}>
                {images && images.length > 0 ?
                    images.map((image) => (
                        <Content key={image.id} >
                            <img className={style.image}
                                src={image.urls.regular}
                                alt={image.alt_description || 'Фото из галереи'}
                            />
                        </Content>
                    ))
                    :
                    <Empty description="Нет изображений" />
                }
            </Space>
        </>
    )
}

export default Gallery;
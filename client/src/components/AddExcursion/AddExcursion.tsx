import NavBar from "../NavBar/NavBar.tsx";
import style from './styles.module.css';
import { Upload, Button, Input, Layout } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { useAppDispatch } from "../../redux/store/store.tsx";
import {createExcursion} from '../../redux/excursion/excursionThank.ts'

const { Dragger } = Upload;

const schema = yup.object().shape({
    title: yup.string().required("Заголовок обязателен"),
    description: yup.string().required("Описание обязательно"),
    duration: yup.string().required("Длительность обязательна"),
    date: yup.string().required("Дата обязательна").typeError("Введите корректную дату"),
    files: yup.array().min(1, "Выберите хотя бы один файл").max(5, "Максимальное число файлов 5").required("Файлы обязательны"),
});

function AddExcursion() {
    const { register, handleSubmit, setValue, clearErrors, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });
    const dispatch = useAppDispatch();
    const [files, setFiles] = useState<File[]>([]);

    const onSubmit: SubmitHandler<any> = async (data) => {
        try {
            const formData = new FormData();
            formData.append("title", data.title);
            formData.append("description", data.description);
            formData.append("duration", data.duration);
            formData.append("date", data.date);

            files.forEach((file) => {
                formData.append("files", file);
            });

            await dispatch(createExcursion(formData));
            console.log("Данные успешно отправлены");
        } catch (error) {
            console.error("Произошла ошибка при отправке формы:", error);
        }
    };

    const handleUpload = (info: any) => {
        const { fileList } = info;
        const selectedFiles = fileList.map((file: any) => file.originFileObj);
        setFiles(selectedFiles);
        setValue("files", selectedFiles);
        clearErrors("files");
    };

    const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(field, e.target.value);
        clearErrors(field);
    };

    return (
        <Layout className={style.layoutHome}>
            <NavBar />
            <form className={style.formContainer} onSubmit={handleSubmit(onSubmit)}>
                <Dragger
                    multiple
                    onChange={handleUpload}
                    beforeUpload={() => false}
                    onDrop={(e) => {
                        console.log('Файлы перетащены:', e.dataTransfer.files);
                    }}
                >
                    <p className="ant-upload-drag-icon">
                        <UploadOutlined />
                    </p>
                    <p className="ant-upload-text">Нажмите или перетащите файлы для загрузки</p>
                    <p className="ant-upload-hint">Поддерживаются любые файлы</p>
                </Dragger>
                {errors.files && <span className={style.error}>{errors.files.message}</span>}

                <label>
                    Заголовок:
                    <Input
                        type="text"
                        className={style.formInput}
                        {...register("title")}
                        onChange={handleInputChange("title")}
                    />
                </label>
                {errors.title && <span className={style.error}>{errors.title.message}</span>}

                <label>
                    Описание тура:
                    <Input
                        type="text"
                        className={style.formInput}
                        {...register("description")}
                        onChange={handleInputChange("description")}
                    />
                </label>
                {errors.description && <span className={style.error}>{errors.description.message}</span>}

                <label>
                    Длительность:
                    <Input
                        type="text"
                        className={style.formInput}
                        {...register("duration")}
                        onChange={handleInputChange("duration")}
                    />
                </label>
                {errors.duration && <span className={style.error}>{errors.duration.message}</span>}

                <label>
                    Дата:
                    <Input
                        type="text"
                        className={style.formInput}
                        {...register("date")}
                        onChange={handleInputChange("date")}
                    />
                </label>
                {errors.date && <span className={style.error}>{errors.date.message}</span>}

                <button type="submit" className={style.formButton}>Отправить</button>
            </form>
        </Layout>
    );
}

export default AddExcursion;
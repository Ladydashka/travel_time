import NavBar from '../NavBar/NavBar.tsx';
import style from './styles.module.css';
import { Upload, Input, Layout } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAppDispatch } from '../../redux/store/store.tsx';
import { createExcursion } from '../../redux/excursion/excursionThank.ts';

const { Dragger } = Upload;

const schema = yup.object().shape({
	title: yup.string().required('Заголовок обязателен'),
	description: yup.string().required('Описание обязательно'),
	duration: yup.string().required('Длительность обязательна'),
	date: yup
		.string()
		.required('Дата обязательна')
		.typeError('Введите корректную дату'),
	file: yup.mixed().required('Файл обязателен'),
});

function AddExcursion() {
	const {
		register,
		handleSubmit,
		setValue,
		clearErrors,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});
	const dispatch = useAppDispatch();
	const [file, setFile] = useState<File | null>(null);

	const onSubmit: SubmitHandler<any> = async data => {
		try {
			const formData = new FormData();
			formData.append('title', data.title);
			formData.append('description', data.description);
			formData.append('duration', data.duration);
			formData.append('date', data.date);
			if (file) {
				formData.append('file', file);
			}

			console.log(formData, 'formData');

			await dispatch(createExcursion(formData));
		} catch (error) {
			console.error('Произошла ошибка при отправке формы:', error);
		}
	};

	const handleUpload = (info: any) => {
		const { fileList } = info;
		const uploadedFile = fileList[0] ? fileList[0].originFileObj : null;

		if (uploadedFile) {
			setFile(uploadedFile);
			setValue('file', uploadedFile);
			clearErrors('file');
		}
	};

	const handleInputChange =
		(field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
			setValue(field, e.target.value);
			clearErrors(field);
		};

	return (
		<Layout className={style.layoutHome}>
			<NavBar />
			<form className={style.formContainer} onSubmit={handleSubmit(onSubmit)}>
				<Dragger
					name='file'
					multiple={false}
					onChange={handleUpload}
					beforeUpload={() => false}
				>
					<p className='ant-upload-drag-icon'>
						<UploadOutlined />
					</p>
					<p className='ant-upload-text'>
						Нажмите или перетащите файл для загрузки
					</p>
					<p className='ant-upload-hint'>Поддерживаются любые файлы</p>
				</Dragger>
				{errors.file && (
					<span className={style.error}>{errors.file.message}</span>
				)}

				<label>
					Заголовок:
					<Input
						type='text'
						className={style.formInput}
						{...register('title')}
						onChange={handleInputChange('title')}
					/>
				</label>
				{errors.title && (
					<span className={style.error}>{errors.title.message}</span>
				)}

				<label>
					Описание тура:
					<Input
						type='text'
						className={style.formInput}
						{...register('description')}
						onChange={handleInputChange('description')}
					/>
				</label>
				{errors.description && (
					<span className={style.error}>{errors.description.message}</span>
				)}

				<label>
					Длительность:
					<Input
						type='text'
						className={style.formInput}
						{...register('duration')}
						onChange={handleInputChange('duration')}
					/>
				</label>
				{errors.duration && (
					<span className={style.error}>{errors.duration.message}</span>
				)}

				<label>
					Дата:
					<Input
						type='text'
						className={style.formInput}
						{...register('date')}
						onChange={handleInputChange('date')}
					/>
				</label>
				{errors.date && (
					<span className={style.error}>{errors.date.message}</span>
				)}

				<button type='submit' className={style.formButton}>
					Отправить
				</button>
			</form>
		</Layout>
	);
}

export default AddExcursion;

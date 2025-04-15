import NavBar from '../NavBar/NavBar.tsx';
import style from './styles.module.css';
import { Upload, Input, Layout, Typography } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch } from '../../redux/store/store.tsx';
import { createExcursion } from '../../redux/excursion/excursionThunk.ts';
import getUser from '../../selectors/getUser.ts';
import { excursionSchema } from './shema.ts';

const { Dragger } = Upload;

type Inputs = {
	title: string,
	description: string;
	duration: string;
	date: string;
};

const schema = excursionSchema;

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

	const user = getUser();
	const userId: string | null = user ? String(user.id) : null;

	const onSubmit: SubmitHandler<Inputs> = async data => {
		try {
			const formData = new FormData();
			formData.append('title', data.title);
			formData.append('description', data.description);
			formData.append('duration', data.duration);
			formData.append('date', data.date);
			if(userId){
				formData.append('userId', userId);
			}
			if (file) {
				formData.append('file', file);
			}
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
		(field: string | number ) => (e: React.ChangeEvent<HTMLInputElement>) => {
			setValue(field, e.target.value);
			clearErrors(field);
		};

	const handleRemove = () => {
		setFile(null);
	};

	return (
		<Layout className={style.layoutHome}>
			<NavBar />
			<div className={style.content}>
				<form className={style.formContainer} onSubmit={handleSubmit(onSubmit)}>
					<Typography.Title className={style.label} level={3}>
						Добавить новую экскурсию
					</Typography.Title>

					<div className={style.dragger}>
						<Dragger
							name='file'
							multiple={false}
							onChange={handleUpload}
							beforeUpload={() => false}
							onRemove={handleRemove}
						>
							<p className='antUploadDragIcon'>
								<UploadOutlined />
							</p>
							<p className='ant-upload-text'>
								Нажмите или перетащите файл для загрузки
							</p>
							<p className='ant-upload-hint'>Поддерживаются любые файлы</p>
						</Dragger>
					</div>
					{errors.file && (
						<span className={style.error}>{errors.file.message}</span>
					)}

					<label className={style.label}>
						Заголовок:
						<Input
							type='text'
							placeholder={'Введите название экскурсии'}
							className={style.formInput}
							{...register('title')}
							onChange={handleInputChange('title')}
						/>
					</label>
					{errors.title && (
						<span className={style.error}>{errors.title.message}</span>
					)}

					<label className={style.label}>
						Описание тура:
						<Input
							type='text'
							placeholder={'Подробное описание экскурсии'}
							className={style.formInput}
							{...register('description')}
							onChange={handleInputChange('description')}
						/>
					</label>
					{errors.description && (
						<span className={style.error}>{errors.description.message}</span>
					)}

					<label className={style.label}>
						Длительность:
						<Input
							type='text'
							placeholder={'Например: 3 часа'}
							className={style.formInput}
							{...register('duration')}
							onChange={handleInputChange('duration')}
						/>
					</label>
					{errors.duration && (
						<span className={style.error}>{errors.duration.message}</span>
					)}

					<label className={style.label}>
						Дата:
						<Input
							type='text'
							placeholder={'Дата'}
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
			</div>
		</Layout>
	);
}

export default AddExcursion;

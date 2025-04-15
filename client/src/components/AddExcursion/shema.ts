import * as yup from "yup";

export const excursionSchema = yup.object().shape({
	title: yup.string().required('Заголовок обязателен'),
	description: yup.string().required('Описание обязательно'),
	duration: yup.string().required('Длительность обязательна'),
	date: yup
		.string()
		.required('Дата обязательна')
		.typeError('Введите корректную дату'),
	file: yup.mixed().required('Файл обязателен'),
});

const { Tour } = require('../../db/models');
const router = require('express').Router();
const multer = require('multer');
const patAh = require("path");

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads/');
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	},
});

const upload = multer({ storage: storage });

router.post('/', upload.single('file'), async (req, res) => {
	const { date, duration, title, description, userId } = req.body;

	try {

		let photoUrl = null;
		if (req.file) {
			const fileName = req.file.originalname;
			photoUrl = `http://localhost:8000/uploads/${fileName}`;
		} else {
			console.warn('Файл не загружен.');
		}

		const newTour = await Tour.create({
			date,
			duration,
			title,
			description,
			photo_url: photoUrl,
			rating: 4.5,
			guide_id: userId,
		});
		res.status(201).json(newTour);
	} catch (error) {
		console.error('Ошибка при сохранении данных: ', error);
		res.status(500).send('Ошибка при сохранении данных.');
	}
});

router.get('/', async (req, res) => {
	try {
		const excursions = await Tour.findAll();
		res.status(200).json(excursions);
	} catch (error) {
		console.error('Ошибка при получении данных: ', error);
		res.status(500).send('Ошибка при получении данных.');
	}
});

module.exports = router;

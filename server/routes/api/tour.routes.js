const { Tour } = require('../../db/models');
const router = require('express').Router();
const multer = require('multer');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads/');
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + '-' + file.originalname);
	},
});

const upload = multer({ storage: storage });

router.post('/', upload.single('file'), async (req, res) => {
	try {
		res.send('Успешно загружено');
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

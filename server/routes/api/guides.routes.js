const router = require('express').Router();
const { Guide } = require('../../db/models');
const multer = require('multer');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads/');
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	},
});

const upload = multer({ storage: storage });

router.get('/', async (req, res) => {
	const guides = await Guide.findAll();
	res.status(200).json({ guides: guides });
});

router.post('/', (req, res) => {
	res.status(200).json({ message: 'success' });
});

router.get('/:id', async (req, res) => {
	const guideId = req.params.id;
	const guide = await Guide.findOne({ where: { id: guideId } });
	res.status(200).json(guide);
});

router.put('/:id', upload.single('file'), async (req, res) => {
	const { id } = req.params;
	try {
		const guide = await Guide.findByPk(+id);
		if (!guide) {
			return res.status(404).json({ message: 'Гид не найден' });
		}

		const updateData = {
			name: req.body.name,
			email: req.body.email,
			languages: req.body.languages,
			phone: req.body.phone,
			social_media_links: req.body.social_media_links,
			bio: req.body.bio,
		};

		if (req.file) {
			const fileName = req.file.originalname;
			updateData.avatar_url = `http://localhost:8000/uploads/${fileName}`;
		} else {
			updateData.avatar_url = guide.avatar_url;
		}

		await guide.update(updateData);

		res.status(200).json({
			message: 'Данные гида успешно обновлены',
			guide: guide,
		});
	} catch (error) {
		console.error('Ошибка при сохранении данных: ', error);
		res.status(500).json({
			message: 'Ошибка при сохранении данных',
			error: error.message,
		});
	}
});

router.delete('/:id', (req, res) => {
	res.status(204);
});

module.exports = router;

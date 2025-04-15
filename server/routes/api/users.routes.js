const router = require('express').Router();
const { User} = require('../../db/models');

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


router.get('/:id', (req, res) => {
	const userId = req.params.id;
	res.status(200).json({ guide: { id: userId } });
});

router.delete('/:id', async (req, res) => {
	res.status(204);
});

router.put('/:id',upload.single('file'), async (req, res) => {
	const { id } = req.params;
	console.log(id);
	try {
		const user = await User.findByPk(+id);
		console.log(user, "данные юзера");
		if (!user) {
			return res.status(404).json({ message: 'Пользователь не найден' });
		}

		const updateData = {
			name: req.body.name,
			email: req.body.email,
		}
		console.log(updateData);

		if (req.file) {
			const fileName = req.file.originalname;
			updateData.avatar_url = `http://localhost:8000/uploads/${fileName}`;
		} else {
			updateData.avatar_url = user.avatar_url;
		}

		await user.update(updateData);

		res.status(200).json({
			message: 'Данные пользователя успешно обновлены',
			user: user,
		});
	} catch (error) {
		console.error('Ошибка при сохранении данных: ', error);
		res.status(500).json({
			message: 'Ошибка при сохранении данных',
			error: error.message,
		});
	}
});

module.exports = router;

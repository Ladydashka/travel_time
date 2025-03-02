const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../../db/models');
const { Guide } = require('../../db/models');
const generateTokens = require("../../config/authUtils");
const cookiesConfig = require("../../config/cookiesConfig.js");


router.post('/sign-up', async (req, res) => {
	try {
		let userInDb;

		const {name, email, password, role} = req.body

		if (!name || !email || !password || !role) {
			res.status(400).json({message: 'Заполните все поля'})
			return;
		}

		switch (role) {
			case 'guide':
				userInDb = await Guide.findOne({where: {email}});
				break;
			case 'user':
				userInDb = await User.findOne({where: {email}});
				break;
			default:
				return res.status(400).json({message: 'Неправильная роль'});
		}

		if (userInDb) {
			res.status(400).json({message: 'Такой емайл уже существует'})
			return;
		}
		const hash = await bcrypt.hash(password, 10);

		if (!userInDb) {
			if (role === 'guide') {
				userInDb = await Guide.create({name, email, password: hash})
			} else if (role === 'user') {
				userInDb = await User.create({name, email, password: hash})
			}
		}

		if (userInDb) {
			const {accessToken, refreshToken} = generateTokens({
				user: {id: userInDb.id, name: userInDb.name, email: userInDb.email}
			})


			res
				.cookie(cookiesConfig.refresh, refreshToken, {
					maxAge: cookiesConfig.maxAgeRefresh,
					httpOnly: true,
				})
				.cookie(cookiesConfig.access, accessToken, {
					maxAge: cookiesConfig.maxAgeAccess,
					httpOnly: true,

				})

				.status(201)
				.json(userInDb);
		}

	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

router.post('/sign-in', async (req, res) => {
	try {
		const { email, password } = req.body;
		 console.log(email,password)
		if (!email || !password) {
			return res.status(400).json({ message: 'Заполните все поля' });
		}


		const user = await User.findOne({ where: { email } });
		const guide = await Guide.findOne({ where: { email } });


		if (!user && !guide) {
			return res.status(404).json({ message: 'Пользователь не найден' });
		}


		const foundUser = user || guide;
		console.log(foundUser)


		const isPasswordValid = await bcrypt.compare(password, foundUser.password);
		if (!isPasswordValid) {
			return res.status(401).json({ message: 'Неверный пароль' });
		}


		const { accessToken, refreshToken } = generateTokens({
			user: { id: foundUser.id, name: foundUser.name, email: foundUser.email }
		});


		res
			.cookie(cookiesConfig.refresh, refreshToken, {
				maxAge: cookiesConfig.maxAgeRefresh,
				httpOnly: true,
			})
			.cookie(cookiesConfig.access, accessToken, {
				maxAge: cookiesConfig.maxAgeAccess,
				httpOnly: true,
			})
			.status(200)
			.json({ message: 'Успешный вход', user: foundUser });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

router.get('/logout', (req, res) => {
	res.status(200).json({ message: 'success' });
});

module.exports = router;

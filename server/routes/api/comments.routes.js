const router = require('express').Router();
const { Comment_Rating, User } = require('../../db/models');

router.get('/', async (req, res) => {
	const comments = await Comment_Rating.findAll({
		attributes: ['comment', 'tour_rating', 'createdAt', 'user_id'],
		include: [{
			model: User,
			attributes: ['name'],
			required: true
		}]
	});

	res.status(200).json(comments.map(comment => ({
		text: comment.comment,
		rating: comment.tour_rating,
		date: comment.createdAt,
		name: comment.User.name
	})));


});

router.post('/', async (req, res) => {
	try {
		const { text, rating, guide_id, tour_id, user_id } = req.body;
		console.log(text, rating, guide_id, tour_id, user_id )

		const newComment = await Comment_Rating.create({
			comment: text,
			tour_rating: rating,
			guide_id,
			tour_id,
			user_id,
		});

		res.status(201).send('Комментарий успешно добавлен');
	} catch (error) {
		console.error('Ошибка при сохранении данных: ', error);
		res.status(500).send('Ошибка при сохранении данных.');
	}
});

router.put('/:id', (req, res) => {
	const updatedCommentRating = req.body;
	res.status(200).json({ comment: updatedCommentRating });
});

router.delete('/:id', (req, res) => {
	res.status(204);
});

module.exports = router;

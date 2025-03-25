'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Tour extends Model {
		static associate({ Comment_Rating, Guide }) {
			this.hasMany(Comment_Rating, { foreignKey: 'tour_id' });
			this.belongsTo(Guide, { foreignKey: 'guide_id' });
		}
	}
	Tour.init(
		{
			guide_id: DataTypes.INTEGER,
			title: DataTypes.TEXT,
			description: DataTypes.TEXT,
			rating: DataTypes.FLOAT,
			date: DataTypes.STRING,
			duration: DataTypes.INTEGER,
			photo_url: DataTypes.TEXT,
		},
		{
			sequelize,
			modelName: 'Tour',
		}
	);
	return Tour;
};
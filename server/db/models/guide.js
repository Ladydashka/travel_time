'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Guide extends Model {
		static associate({ Tour, Comment_Rating }) {
			this.hasMany(Tour, { foreignKey: 'guide_id' });
			this.hasMany(Comment_Rating, { foreignKey: 'guide_id' });
		}
	}
	Guide.init(
		{
			name: DataTypes.STRING,
			password: DataTypes.STRING,
			email: DataTypes.STRING,
			avatar_url: DataTypes.STRING,
			bio: DataTypes.STRING,
			phone: DataTypes.STRING,
			social_media_links: DataTypes.JSON,
			rating: DataTypes.FLOAT,
			languages: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'Guide',
		}
	);
	return Guide;
};
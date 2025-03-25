'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Tours', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			guide_id: {
				type: Sequelize.INTEGER,
				references: {
					model: {
						tableName: 'Guides',
					},
					key: 'id',
				},
			},
			title: {
				type: Sequelize.TEXT,
			},
			description: {
				type: Sequelize.TEXT,
			},
			rating: {
				type: Sequelize.FLOAT,
			},
			date: {
				type: Sequelize.STRING,
			},
			duration: {
				type: Sequelize.INTEGER,
			},
			photo_url: {
				type: Sequelize.TEXT,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('Tours');
	},
};
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Guides', [
      {
        id: 1010314063,
        name: 'Иван Иванов',
        password: 'password123',
        email: 'ivan@example.com',
        avatar_url: 'https://example.com/avatar1.jpg',
        bio: 'Опытный гид с 10-летним стажем.Иван начал свою карьеру гида в 2013 году, работая в одном из крупнейших туристических агентств Москвы. За годы работы он провел более 500 экскурсий для туристов из разных стран мира. Его клиенты отмечают его профессионализм, дружелюбие и умение интересно рассказывать даже о самых сложных исторических событиях.',
        phone: '+79123456789',
        social_media_links: JSON.stringify({
          instagram: "ivan_guide",
          facebook: "ivan.guide",
          telegram: "ivan_guide_tg"
        }),
        rating: 4.8,
        languages: 'Русский, Английский',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 1010314064,
        name: 'Мария Петрова',
        password: 'password456',
        email: 'maria@example.com',
        avatar_url: 'https://example.com/avatar2.jpg',
        bio: 'Специалист по историческим экскурсиям.Мария начала свою карьеру гида в 2015 году, работая в музее-заповеднике «Коломенское». За годы работы она разработала множество авторских экскурсий, которые пользуются популярностью как у местных жителей, так и у туристов. Её экскурсии часто включают интерактивные элементы, такие как исторические реконструкции и викторины, что делает их особенно интересными для детей и подростков.\n' +
            '\n' +
            'Мария свободно владеет русским и французским языками, что позволяет ей работать с франкоговорящими туристами. Она также активно участвует в образовательных проектах, проводя лекции и мастер-классы по истории и культуре.',
        phone: '+79123456780',
        social_media_links:  JSON.stringify({
          instagram: "maria_guide",
          facebook: "maria.guide",
          telegram: "maria_guide_tg"
        }),
        rating: 4.9,
        languages: 'Русский, Французский',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 1010314065,
        name: 'Алексей Смирнов',
        password: 'password789',
        email: 'alex@example.com',
        avatar_url: 'https://example.com/avatar3.jpg',
        bio: 'Гид по природным достопримечательностям.Алексей начал свою карьеру гида в 2017 году, работая в национальных парках и заповедниках. Он разработал множество маршрутов, которые позволяют туристам насладиться красотой природы России, от Кавказских гор до Байкала. Его экскурсии часто включают элементы экотуризма, такие как наблюдение за дикой природой и пешие походы.\n' +
            '\n' +
            'Алексей свободно владеет русским и немецким языками, что делает его экскурсии доступными для немецкоговорящих туристов',
        phone: '+79123456781',
        social_media_links:  JSON.stringify({
          instagram: "alex_guide",
          facebook: "alex.guide",
          telegram: "alex_guide_tg"
        }),
        rating: 4.7,
        languages: 'Русский, Немецкий',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Guides', null, {});
  }
};
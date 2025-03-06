type MenuItem = {
    name: string;
    route: string;
};

type MenuItems = {
    user: MenuItem[];
    guide: MenuItem[];
};

export  const menuItems: MenuItems = {
    user: [
        {name: 'Главная', route: '/homepage'},
        {name: 'Экскурсии', route: '/excursions'},
        {name: 'Личный кабинет', route: '/cabinet'},
    ],
    guide: [
        {name: 'Главная', route: '/homepage'},
        {name: 'Экскурсии', route: '/excursions'},
        {name: 'Личный кабинет', route: '/cabinet'},
        {name: 'Создать экскурсию', route: '/guide'},
    ],
}
import HomePage from "../Pages/HomePage/HomePage.tsx";
import PersonalAccount from "../PersonalAccount/PersonalAccount.tsx";
import AddExcursion from "../AddExcursion/AddExcursion.tsx";
import ExcursionsPage from "../Pages/ExcursionsPage/ExcursionsPage.tsx";

const USER_ROLE = 'user';
const GUIDE_ROLE = 'guide';

export const MENU_ITEMS = {
    HOMEPAGE:{
        name: "Главная",
        route: '/homepage',
        element : <HomePage/>,
    },
    EXCURSIONS:{
        name: 'Экскурсии',
        route: '/excursions',
        element : <ExcursionsPage/>,
    },
    PERSONAL:{
        name: 'Личный кабинет',
        route: '/account',
        element: <PersonalAccount/>,
    },
    ADD_EXCURSION:{
        name: 'Добавить экскурсию',
        route: '/add',
        element: <AddExcursion/>,}
}

export const USER_ROLE_ROUTES = {
    [USER_ROLE]: [MENU_ITEMS.HOMEPAGE, MENU_ITEMS.EXCURSIONS, MENU_ITEMS.PERSONAL],
    [GUIDE_ROLE]: [MENU_ITEMS.HOMEPAGE, MENU_ITEMS.EXCURSIONS, MENU_ITEMS.PERSONAL, MENU_ITEMS.ADD_EXCURSION],
};
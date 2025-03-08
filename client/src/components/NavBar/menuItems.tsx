import HomePage from "../HomePage/HomePage.tsx";
import Excursions from "../Excursions/Excursions.tsx";
import PersonalAccount from "../PersonalAccount/PersonalAccount.tsx";
import AddExcursion from "../AddExcursion/AddExcursion.tsx";

export const MENU_ITEMS = {
    HOMEPAGE:{
        name: "Главная",
        route: '/homepage',
        element : <HomePage/>,
    },
    EXCURSIONS:{
        name: 'Экскурсии',
        route: '/excursions',
        element : <Excursions/>,
    },
    PERSONAL:{
        name: 'Личный кабинет',
        route: '/account',
        element: <PersonalAccount/>,
    },
    ADD_EXCURSION:{name: 'Добавить экскурсию', route: '/add', element: <AddExcursion/>,}
}

 export const USER_ROLE_ROUTES = {
    ['user']: [MENU_ITEMS.HOMEPAGE,MENU_ITEMS.EXCURSIONS,MENU_ITEMS.PERSONAL],
     ['guide']: [MENU_ITEMS.HOMEPAGE,MENU_ITEMS.EXCURSIONS,MENU_ITEMS.PERSONAL, MENU_ITEMS.ADD_EXCURSION],
 }
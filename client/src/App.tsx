import Video from './components/Video/Video.tsx';
import { Route, Routes } from 'react-router';
import RegistrationForm from './components/RegistrationForm/RegistrationForm.tsx';
import LoginForm from './components/LoginForm/LoginForm.tsx';
import { USER_ROLE_ROUTES } from './components/NavBar/menuItems.tsx';
import getRole from "./components/NavBar/getRole.ts";


function App() {
    const role = getRole()
    return (
        <>
            <Routes>
                <Route path="/" element={<Video />} />
                <Route path="/register" element={<RegistrationForm />} />
                <Route path="/login" element={<LoginForm />} />
                {USER_ROLE_ROUTES[role]?.map(({ route, element }) => (
                    <Route key={route} path={route} element={element} />
                ))}
            </Routes>
        </>
    );
}

export default App;
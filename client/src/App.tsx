import Video from "./components/Video/Video.tsx";
import {Route, Routes} from "react-router";
import RegistrationForm from "./components/RegistrationForm/RegistrationForm.tsx";
import LoginForm from "./components/LoginForm/LoginForm.tsx";

function App() {


  return (
    <>
        <Routes>

            <Route path="/" element={<Video />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/login" element={<LoginForm />} />
        </Routes>

    </>
  )
}

export default App

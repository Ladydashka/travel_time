import React, {useEffect} from "react";
import {useForm, SubmitHandler} from "react-hook-form";
import styles from "./styles.module.css";
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import Video from "../Video/Video.tsx";
import {RootState, useAppDispatch} from "../../redux/store/store.tsx";
import {registerUser} from "../../redux/auth/registrationThunk.ts";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router";

type Inputs = {
    name: string;
    password: string;
    email: string;
    role: "guide" | "user";
};

const schema = yup.object().shape({
    name: yup.string()
        .required("Имя пользователя обязательно"),
    email: yup.string()
        .email("Неверный формат электронной почты")
        .matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.(ru|com|org|net)$/,
            "Электронная почта должна содержать '@' и заканчиваться доменом")
        .required("Электронная почта обязательна"),
    password: yup.string()
        .min(8, "Пароль должен содержать не менее 8 символов")
        .max(16, "Пароль не должен превышать 16 символов")
        .matches(/[a-zA-Z]/, "Пароль должен содержать хотя бы одну букву")
        .required("Пароль обязателен"),
});


function RegistrationForm() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isRegistered = useSelector((store: RootState) => store.registration.isRegistered);
    const {register, handleSubmit, formState: {errors}} = useForm<Inputs>({resolver: yupResolver(schema)});

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            await dispatch(registerUser(data));
        } catch (error) {
            console.error("Произошла ошибка при регистрации:", error);
        }
    };

    useEffect(() => {
        if (isRegistered) {
            navigate("/homepage");
        }
    }, [isRegistered, navigate]);


    return (
        <div>
            <Video/>
            <div className={styles.formContainer}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label>
                        Имя:
                        <input
                            className={styles.formInput}
                            {...register("name")}
                        />
                    </label>
                    {errors.name && <span className={styles.error}>{errors.name.message}</span>}

                    <label>
                        Электронная почта:
                        <input
                            type="email"
                            className={styles.formInput}
                            {...register("email")}
                        />
                    </label>
                    {errors.email && <span className={styles.error}>{errors.email.message}</span>}

                    <label>
                        Пароль:
                        <input
                            type="password"
                            className={styles.formInput}
                            {...register("password")}
                        />
                    </label>
                    {errors.password && <span className={styles.error}>{errors.password.message}</span>}

                    <label>
                        Роль:
                        <select {...register("role")} className={styles.formSelect}>
                            <option value="user">Пользователь</option>
                            <option value="guide">Гид</option>
                        </select>
                    </label>

                    <button type="submit" className={styles.formButton}>Зарегистрироваться</button>
                </form>
            </div>
        </div>
    );
}

export default RegistrationForm;
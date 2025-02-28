import React, {useEffect} from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./stylesRegistrationForm.module.css";
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

function RegistrationForm() {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isRegistered = useSelector((store: RootState) => store.registration.isRegistered);
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

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
                            {...register("name", { required: "Введите имя, это поле обязательно " })}
                        />
                    </label>
                    {errors.name && <span className={styles.error}>{errors.name.message}</span>}

                    <label>
                        Электронная почта:
                        <input
                            type="email"
                            className={styles.formInput}
                            {...register("email", {
                                required: "Электронная почта обязательна",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|ru|net|org|info|biz|edu)$/,
                                    message: "Введите корректный адрес электронной почты, например: example@mail.com"
                                }
                            })}
                        />
                    </label>
                    {errors.email && <span className={styles.error}>{errors.email.message}</span>}

                    <label>
                        Пароль:
                        <input
                            type="password"
                            className={styles.formInput}
                            {...register("password", {
                                required: "Это поле обязательно",
                                minLength: {
                                    value: 8,
                                    message: "Пароль должен содержать не менее 8 символов",
                                },
                                maxLength: {
                                    value: 16,
                                    message: "Пароль не может превышать 16 символов",
                                },
                                validate: {
                                    hasLetter: value => /[a-zA-Z]/.test(value) || "Пароль должен содержать хотя бы одну букву",
                                },
                            })}
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
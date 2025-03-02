import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./styles.module.css";
import Video from "../Video/Video.tsx";
import {loginUser} from "../../redux/auth/registrationThunk.ts";
import {useNavigate} from "react-router";
import {RootState, useAppDispatch} from "../../redux/store/store.tsx";
import {useSelector} from "react-redux";
import {useEffect} from "react";

type Inputs = {
    email: string;
    password: string;
};

function LoginForm() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isRegistered = useSelector((store: RootState) => store.auth.isRegistered);
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            console.log(data)
            await dispatch(loginUser(data));
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
                      Электронная почта:
                      <input
                          type="email"
                          className={styles.formInput}
                          {...register("email", { required: true })}
                      />
                  </label>
                  {errors.email && <span className={styles.error}>Это поле обязательно</span>}

                  <label>
                      Пароль:
                      <input
                          type="password"
                          className={styles.formInput}
                          {...register("password", { required: true })}
                      />
                  </label>
                  {errors.password && <span className={styles.error}>Это поле обязательно</span>}

                  <button type="submit" className={styles.submitButton}>
                      Войти
                  </button>
              </form>
          </div>
      </div>
    );
}

export default LoginForm;
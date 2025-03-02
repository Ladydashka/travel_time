import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./styles.module.css";
import Video from "../Video/Video.tsx";

type Inputs = {
    email: string;
    password: string;
};

function LoginForm() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data);
        alert("Авторизация успешна!");
    };



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
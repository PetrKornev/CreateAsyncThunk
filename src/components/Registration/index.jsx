import { Formik, Form, Field, ErrorMessage } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { registration, clearMessage } from "../../redux/slices/authSlice";

const Registration = () => {
  const dispatch = useDispatch();
  const { loading, message, error } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

  const validate = (values) => {
    const errors = {};
    if (!values.username) errors.username = "Обязательное поле";
    if (!values.email) errors.email = "Обязательное поле";
    if (!values.password) {
      errors.password = "Обязательное поле";
    } else if (!passwordRegex.test(values.password)) {
      errors.password =
        "Пароль должен содержать минимум 8 символов, включая заглавную и строчную букву, число и символ";
    }
    if (!values.gender) errors.gender = "Обязательное поле";
    if (!values.age || values.age <= 0)
      errors.age = "Введите корректный возраст";

    return errors;
  };

  const handleSubmit = async (values) => {
    try {
      await dispatch(registration(values)).unwrap();
      setTimeout(() => {
        navigate("/toDoList");
      }, 1000);
    } catch (err) {
      console.error("Ошибка при регистрации:", err);
    }
  };

  useEffect(() => {
    return () => {
      dispatch(clearMessage());
    };
  }, [dispatch]);

  return (
    <>
      <h2>Регистрация пользователя</h2>

      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
          gender: "",
          age: "",
        }}
        validate={validate}
        onSubmit={handleSubmit}
      >
        <Form>
          <div>
            <label>
              Имя пользователя:
              <Field
                type="text"
                name="username"
                placeholder="Введите имя пользователя"
              />
            </label>
            <ErrorMessage
              name="username"
              component="div"
              style={{ color: "red" }}
            />
          </div>

          <div>
            <label>
              Логин:
              <Field type="email" name="email" placeholder="Введите логин" />
            </label>
            <ErrorMessage
              name="email"
              component="div"
              style={{ color: "red" }}
            />
          </div>

          <div>
            <label>
              Пароль:
              <Field
                type="password"
                name="password"
                placeholder="Введите пароль"
              />
            </label>
            <ErrorMessage
              name="password"
              component="div"
              style={{ color: "red" }}
            />
          </div>

          <div>
            <label>Пол:</label>
            <div role="group" aria-labelledby="gender-group">
              <label>
                <Field type="radio" name="gender" value="male" />
                Мужской
              </label>
              <label>
                <Field type="radio" name="gender" value="female" />
                Женский
              </label>
            </div>
            <ErrorMessage
              name="gender"
              component="div"
              style={{ color: "red" }}
            />
          </div>

          <div>
            <label>
              Возраст:
              <Field
                type="number"
                name="age"
                placeholder="Введите ваш возраст"
              />
            </label>
            <ErrorMessage name="age" component="div" style={{ color: "red" }} />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Регистрация..." : "Зарегистрироваться"}
          </button>

          {message && <div style={{ color: "green" }}>{message}</div>}
          {error && <div style={{ color: "red" }}>{error}</div>}
        </Form>
      </Formik>

      <button onClick={() => navigate("/")}>Вход</button>
    </>
  );
};

export default Registration;

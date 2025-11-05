import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { getToken } from "../../redux/slices/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, loading } = useSelector((store) => store.auth);

  useEffect(() => {
    if (token) navigate("/toDoList");
  }, [token]);

  const initialValues = { email: "", password: "" };

  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Обязательное поле";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Неверный адрес электронной почты";
    }
    if (!values.password.trim()) errors.password = "Обязательное поле";
    return errors;
  };

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(getToken(values));
    setSubmitting(false);
  };

  return (
    <>
      <h2>Авторизация пользователя</h2>

      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
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

            <button type="submit" disabled={isSubmitting || loading}>
              {loading ? "Вход..." : "Войти"}
            </button>
          </Form>
        )}
      </Formik>

      <Link to={"registration"}>Не зарегестрированы?</Link>
    </>
  );
};

export default Login;

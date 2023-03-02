import React, { useEffect, useState } from "react";

import { validate } from "./validate";
import { Link } from "react-router-dom";
import styles from "./Forms.module.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notify } from "./toastify";
import { useTitle } from "../Hooks/useTitle";

const Login = () => {
  useTitle("Login");

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const inputHandler = (e) => {
    const { target } = e;
    setData({ ...data, [target.id]: target.value });
  };

  const [errors, setErros] = useState({});
  const [touched, setTouched] = useState({});

  const focusHanlder = (e) => {
    const { target } = e;
    setTouched({ ...touched, [target.id]: true });
  };

  useEffect(() => {
    setErros(validate(data, "login"));
  }, [data, touched]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!Object.keys(errors).length) {
      notify("success", "You loged on successfully");
    } else {
      notify("error", "Invalid data!");
      setTouched({
        email: true,
        password: true,
      });
    }
  };

  return (
    <div>
      <form onSubmit={submitHandler} className={styles.formContainer}>
        <div className={styles.header}>
          <h2>Login</h2>
        </div>
        <div className={styles.formField}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            onInput={inputHandler}
            onFocus={focusHanlder}
          />
          <span>{touched.email && errors.email ? errors.email : ""}</span>
        </div>
        <div className={styles.formField}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onInput={inputHandler}
            onFocus={focusHanlder}
          />
          <span>
            {touched.password && errors.password ? errors.password : ""}
          </span>
        </div>
        <div className={styles.formButtons}>
          <Link to="/signup">Sign Up</Link>
          <button type="submit">Login</button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;

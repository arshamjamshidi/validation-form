import React, { useEffect, useState } from "react";

import { validate } from "./validate";
import { Link } from "react-router-dom";
import styles from "./Forms.module.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notify } from "./toastify";
import { useTitle } from "../Hooks/useTitle";

const SignUp = () => {
  useTitle("Sign Up");

  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    isAccepted: "",
  });

  const inputHandler = (e) => {
    const { target } = e;
    if (target.id === "isAccepted") {
      setData({ ...data, [target.id]: target.checked });
    } else {
      setData({ ...data, [target.id]: target.value });
    }
  };

  const [errors, setErros] = useState({});
  const [touched, setTouched] = useState({});

  const focusHanlder = (e) => {
    const { target } = e;
    setTouched({ ...touched, [target.id]: true });
  };

  useEffect(() => {
    setErros(validate(data, "signup"));
  }, [data, touched]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!Object.keys(errors).length) {
      notify("success", "You signed up successfully");
    } else {
      notify("error", "Invalid data!");
      setTouched({
        username: true,
        email: true,
        password: true,
        confirmPassword: true,
        isAccepted: true,
      });
    }
  };

  return (
    <div>
      <form onSubmit={submitHandler} className={styles.formContainer}>
        <div className={styles.header}>
          <h2>Sign Up</h2>
        </div>
        <div className={styles.formField}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            onInput={inputHandler}
            onFocus={focusHanlder}
          />
          <span>
            {touched.username && errors.username ? errors.username : ""}
          </span>
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
        <div className={styles.formField}>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            onInput={inputHandler}
            onFocus={focusHanlder}
          />
          <span>
            {touched.confirmPassword && errors.confirmPassword
              ? errors.confirmPassword
              : ""}
          </span>
        </div>
        <div className={styles.formField}>
          <div className={styles.cehckboxWrapper}>
            <label htmlFor="isAccepted">I accept terms of privacy policy</label>
            <input
              type="checkbox"
              id="isAccepted"
              onInput={inputHandler}
              onFocus={focusHanlder}
            />
          </div>
          <span>
            {touched.isAccepted && errors.isAccepted ? errors.isAccepted : ""}
          </span>
        </div>
        <div className={styles.formButtons}>
          <Link to="/login">Login</Link>
          <button type="submit">Sign Up</button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default SignUp;

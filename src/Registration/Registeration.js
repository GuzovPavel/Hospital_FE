import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import SnackBar from "../SnackBar";
import './Registration.scss'

axios.defaults.baseURL = "http://localhost:8000/";

const Registration = () => {
  const [open, setOpen] = useState(false);
  const [valueLogin, setLogin] = useState("");
  const [valuePassword, setPass] = useState("");
  const [valueRepPass, setRepPass] = useState("");
  const [message, setMessage] = useState("");
  const regEx2 = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;

  const route = useHistory();
  const onClickRegiser = async () => {

    if (valueLogin.length < 6) {
      setOpen(true);
      setMessage("Логин должен состоять минимум из 6 символов");
      return;
    }
    if (!regEx2.test(valuePassword)) {
      setOpen(true);
      setMessage(
        "Пароль должен иметь длину не менее 6 символов, хотя бы одну заглавную букву и одну цифру"
      );
      return;
    }

    try {
      if (valueRepPass === valuePassword) {
        const res = await axios.post("/user/create", {
          login: valueLogin,
          password: valuePassword,
        });
        const token = res.data.token;

        window.localStorage.setItem("token", token);

        route.push("/home");
      } else {
        setOpen(true);
        setMessage("Пароли не совпадают");
        setPass("");
        setRepPass("");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="Log">
      <p>Регистрация</p>
      <span>Login:</span>
      <TextField
        id="outlined-basic"
        variant="outlined"
        value={valueLogin}
        onChange={(e) => setLogin(e.target.value)}
      />
      <span>Password:</span>
      <TextField
        id="outlined-basic"
        variant="outlined"
        value={valuePassword}
        type="password"
        onChange={(e) => {
          setPass(e.target.value);
          console.log(regEx2.test(valuePassword));
        }}
      />
      <span>Repeat password:</span>
      <TextField
        id="outlined-basic"
        variant="outlined"
        value={valueRepPass}
        type="password"
        onChange={(e) => setRepPass(e.target.value)}
      />
      <div className="forButt">
        <Button
          variant="contained"
          color="primary"
          href="#contained-buttons"
          onClick={() => onClickRegiser()}
        >
          <span>Зарегистрироваться</span>
        </Button>
        <SnackBar open={open} setOpen={setOpen} message={message} />
        <Link to="/home">Авторизоваться</Link>
      </div>
    </div>
  );
};
export default Registration;

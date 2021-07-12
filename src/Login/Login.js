import React, { useState } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link, useHistory } from "react-router-dom";
import SnackBar from "../SnackBar";

axios.defaults.baseURL = "http://localhost:8000/";

const Login = () => {
  const [open, setOpen] = useState(false);
  const [valueLogin, setLogin] = useState("");
  const [valuePassword, setPass] = useState("");
  const [err, setErr] = useState("");
  const [message, setMessage] = useState("");
  const regEx2 = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;

  const route = useHistory();
  const onClickLogin = async () => {
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
      const res = await axios.post("/user/sign", {
        login: valueLogin,
        password: valuePassword,
      });
      const token = res.data?.token;

      window.localStorage.setItem("token", token);

      route.push("/home");
    } catch (err) {
      setOpen(true);
      setMessage("Неверный Логин или Пароль");
    }
  };

  return (
    <div className="Log">
      <p>Войти в систему</p>
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
        type="password"
        value={valuePassword}
        onChange={(e) => {
          setPass(e.target.value);
        }}
      />
      <div className="forButt">
        <Button
          variant="contained"
          color="primary"
          onClick={() => onClickLogin()}
        >
          <span>Войти</span>
        </Button>

        <SnackBar open={open} setOpen={setOpen} message={message} />

        <Link to="/registration">Зарегистрироваться</Link>
      </div>

      {err && <div>{err}</div>}
    </div>
  );
};
export default Login;

import build from "./build.svg";
import React from "react";
import Title from "./Title";
import Login from "./Login/Login";
import "./App.scss";

const PageOfLogin = () => {
  return (
    <div>
      <header>
        <Title>
          <span>Войти в систему</span>
        </Title>
      </header>
      <div className="LoginBlock">
        <div>
          <img src={build} alt="" />
        </div>
        <div>
          <Login />
        </div>
      </div>
    </div>
  );
};

export default PageOfLogin;

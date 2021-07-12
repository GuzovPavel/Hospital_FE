import build from "./build.svg";
import React from "react";
import Registration from "./Registration/Registeration";
import Title from "./Title";

const PageOfRegistration = () => {
  return (
    <div>
      <header>
        <Title>
          <span>Зарегистрироваться в системе</span>
        </Title>
      </header>
      <div className="RegistrationBlock">
        <div>
          <img src={build} alt="" />
        </div>
        <div>
          <Registration />
        </div>
      </div>
    </div>
  );
};

export default PageOfRegistration;

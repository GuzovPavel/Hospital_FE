import React from "react";
import logo from "./logo.svg";

const Title = (props) => {
  return (
    <div className="head">
      <img src={logo} alt="logo" />
      {props.children}
    </div>
  );
};
export default Title;

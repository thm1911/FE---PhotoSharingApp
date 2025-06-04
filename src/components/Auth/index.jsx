import React from "react";
import "./styles.css";
import Login from "./Login";
import Register from "./Register";

const Auth = (props) => {
  const { authRoute } = props;
  return (
    <div id="formLogin" className="landing">
      <div id="title" className="dark-overlay">
        <div className="landing-inner">
          <h1>Photo Sharing</h1>
          <h4>Image sharing sites that are worth trying</h4>
          {authRoute === "login" ? <Login /> : <Register />}
        </div>
      </div>
    </div>
  );
};

export default Auth;

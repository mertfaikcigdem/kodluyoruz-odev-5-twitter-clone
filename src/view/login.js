import React, { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { Icon } from "../component/icon";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState();

  const history = useHistory();

  useEffect(() => {
    fetch("userData.json")
      .then(function (response) {
        return response.json();
      })
      .then((data) => {
        setUserData(data);
      });
  }, []);

  const loginButton = (e) => {
    e.preventDefault();

    const findItem = userData.find(
      (user) => user.username === username && user.password === password
    );
    if (findItem) {
      console.log(findItem);
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("username", username);
      setTimeout(() => {
        history.push("/home");
      }, 1000);
    } else {
      console.log("hata");
      localStorage.setItem("isLoggedIn", false);
    }

    // let isLoggedIn = localStorage.getItem("isLoggedIn");
    // console.log(isLoggedIn);
    // if (isLoggedIn === true) {
    //   console.log("set is loggin");
    //   <Redirect to="/home" />;
    // }
  };

  return (
    <div className="login-wrapper">
      <form className="login-form" onSubmit={loginButton}>
        <div className="login-icon-wrapper">
          <Icon size={50} iconName="twitter" color="#1DA1F2" />
        </div>
        <div>
          <input
            className="user-name-input"
            type="text"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <input
            className="password-input"
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="login-submit-button">Login</button>
      </form>
    </div>
  );
};

export default Login;

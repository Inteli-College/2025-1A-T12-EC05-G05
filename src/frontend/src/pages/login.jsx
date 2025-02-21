import React, { useState } from "react";
import httpClient from "../httpClient";
import "../styles/login.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const logInUser = async () => {
    console.log(email, password);

    try {
      const resp = await httpClient.post("http://localhost:5000/login", {
        email,
        password,
      });

      window.location.href = "/";
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Invalid credentials");
      } else {
        console.error("An error occurred:", error);
        alert("An unexpected error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="loginContainer">
      <h1>Log Into Your Account</h1>
      <form>
        <div className="formGroup">
          <label htmlFor="email">Email: </label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="formGroup">
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="button" onClick={logInUser}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default LoginPage;

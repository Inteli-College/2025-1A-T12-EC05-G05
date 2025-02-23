import React, { useState, useEffect } from "react";
import httpClient from "../httpClient";
import "../styles/landingPage.css";

const LandingPage = () => {
  const [user, setUser] = useState(null);

  const logoutUser = async () => {
    await httpClient.post("http://localhost:5000/logout");
    window.location.href = "/";
  };

  useEffect(() => {
    (async () => {
      try {
        const resp = await httpClient.get("http://localhost:5000/@me");
        setUser(resp.data);
      } catch (error) {
        console.log("Not authenticated");
      }
    })();
  }, []);

  return (
    <div className="container">
      <h1>Landing page - Prescript</h1>
      {user != null ? (
        <div className="loggedIn">
          <h2>Logged in</h2>
          <h3>ID: {user.id}</h3>
          <h3>Email: {user.email}</h3>
          <button onClick={logoutUser}>Logout</button>
        </div>
      ) : (
        <div className="loggedOut">
            <a href="/login">
              <button>Login</button>
            </a>
        </div>
      )}
    </div>
  );
};

export default LandingPage;

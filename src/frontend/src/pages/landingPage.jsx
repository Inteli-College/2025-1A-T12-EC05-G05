import React, { useState, useEffect } from "react";
import httpClient from "../httpClient";
import "../styles/LandingPage.css";

const LandingPage = () => {
  const [user, setUser] = useState(null);

  const logoutUser = async () => {
    await httpClient.post("http://localhost:5000/auth/logout");
    window.location.href = "/";
  };

  useEffect(() => {
    (async () => {
      try {
        const resp = await httpClient.get("http://localhost:5000/auth/@me");
        setUser(resp.data);
      } catch (error) {
        console.log("Not authenticated");
      }
    })();
  }, []);

  return (
    <div className="container">
      <div className="content-wrapper">
        <h1 className="main-title">Welcome to Prescript</h1>
        {user != null ? (
          <div className="card logged-in">
            <h2 className="card-title">Welcome Back!</h2>
            <div className="user-info">
              <div className="info-item">
                <span className="label">ID:</span>
                <span className="value">{user.id}</span>
              </div>
              <div className="info-item">
                <span className="label">Email:</span>
                <span className="value">{user.email}</span>
              </div>
            </div>
            <button className="btn btn-logout" onClick={logoutUser}>
              Sign Out
            </button>
          </div>
        ) : (
          <div className="card logged-out">
            <h2 className="card-title">Get Started</h2>
            <p className="welcome-text">Sign in to access your account</p>
            <a href="/login" className="btn-link">
              <button className="btn btn-login">Login</button>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
// LoginPage.jsx
import React, { useState } from "react";
import httpClient from "../httpClient";
import Header from "../components/header";
import "../styles/login.css";
import userIcon from "../assets/icones/usuario.svg";
import cadeadoIcon from "../assets/icones/cadeado.svg";
import presciptLogo from "../assets/logo-pequeno.svg";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(e) {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (errors[id]) setErrors((prev) => ({ ...prev, [id]: "" }));
  }

  function validateForm() {
    const newErrors = {};
    if (!formData.email) newErrors.email = "É necessário inserir o seu email";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Insira um formato válido de email";
    if (!formData.password) newErrors.password = "É necessário inserir a sua senha";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function logInUser(e) {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      await httpClient.post("http://localhost:5000/auth/login", {
        email: formData.email,
        password: formData.password,
      });
      window.location.href = "/";
    } catch (error) {
      if (error.response?.status === 401) setErrors({ submit: "Email ou senha incorretos" });
      else setErrors({ submit: "Ocorreu um erro, tente novamente mais tarde." });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Header />
      <div id="login-container">
        <div id="login-card">
          <img src={presciptLogo} alt="Logo" id="prescipt-logo" />
          <form onSubmit={logInUser} id="login-form">
            <div id="email-input">
              <div id="input-wrapper">
                <div id="icon-square">
                  <img src={userIcon} alt="User" id="input-icon" />
                </div>
                <input
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? "error" : ""}
                  placeholder="Insira seu email"
                />
              </div>
              {errors.email && <span id="error-text">{errors.email}</span>}
            </div>
            <div id="password-input">
              <div id="input-wrapper">
                <div id="icon-square">
                  <img src={cadeadoIcon} alt="Lock" id="input-icon" />
                </div>
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? "error" : ""}
                  placeholder="Insira sua senha"
                />
              </div>
              {errors.password && <span id="error-text">{errors.password}</span>}
            </div>
            {errors.submit && <div id="error-message">{errors.submit}</div>}
            <button type="submit" id="submit-button" disabled={isLoading}>
              {isLoading ? "Entrando..." : "Entrar"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

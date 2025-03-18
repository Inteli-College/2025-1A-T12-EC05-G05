import React from "react";
import "../styles/NotFound.css";
import notFound from "../assets/notFound.svg";

const NotFound = () => {
  return (
    <div className="notFoundContainer">
      <div className="notFoundContent">
        <img src={notFound} alt="numero 404" />
        <p>Oops! Esta página não foi encontrada!</p>
        <button 
          onClick={() => window.history.back()} 
          className="backButton"
        >
          Voltar para a última página acessada
        </button>
      </div>
    </div>
  );
};

export default NotFound;

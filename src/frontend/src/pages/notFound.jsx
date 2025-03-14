import React from "react";
import "../styles/NotFound.css";
import pilula from "../assets/pilula.svg";
import seringa from "../assets/seringa.svg";

const NotFound = () => {
  return (
    <div className="notFoundContainer">
      <div className="notFoundContent">
        <h1>404</h1>
        <p>Oops! Esta página não foi encontrada!</p>
        <button 
          onClick={() => window.history.back()} 
          className="backButton"
        >
          Voltar para a última página acessada
        </button>
      </div>
      <img src={pilula} alt="Pílula" className="pilula" />
      <img src={seringa} alt="Seringa" className="seringa" />
    </div>
  );
};

export default NotFound;

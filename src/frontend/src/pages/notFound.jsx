import React from "react";
import "../styles/NotFound.css";

const NotFound = () => {
  return (
    <div className="notFoundContainer">
      <div className="notFoundContent">
        <h1>404 - Página não encontrada</h1>
        <p>
          Parece que você se perdeu, mas nossa equipe está sempre pronta para cuidar de você.
        </p>
        <a href="/login" className="backButton">Voltar para a página de login</a>
      </div>
    </div>
  );
};

export default NotFound;

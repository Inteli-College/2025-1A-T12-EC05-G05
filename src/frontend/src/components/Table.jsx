// Table.jsx
import React from "react";
import "../styles/Table.css";
import seta from "../assets/icones/seta.svg";

export default function Table() {
  return (
    <div className="table">
        <div className="title">
            <h1>A fazer</h1>
            <img src={seta} alt="seta para a direita" /> 
        </div>
        <div className="itens">
          <div className="item">
              <h2>Fita 1</h2>
              <p>3 dipirona, 2 ibuprofeno</p>
        </div>
        <hr/>
        <div className="item">
              <h2>Fita 1</h2>
              <p>3 dipirona, 2 ibuprofeno</p>
        </div>
        </div>
    </div>
    
  );
}
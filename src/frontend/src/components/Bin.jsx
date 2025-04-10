import React from "react";
import "../styles/Bin.css";

export default function Bin({ medicamento, validade, lote, quantidade, onClick }) {
  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("pt-BR");
    } catch (error) {
      return dateString;
    }
  };

  return (
    <div className="bin" onClick={onClick}>
      <div className="bin-content">
        <h3 className="medicamento">{medicamento}</h3>
        <div className="bin-info">
          <p>
            <strong>Validade:</strong> {formatDate(validade)}
          </p>
          <p>
            <strong>Lote:</strong> {lote}
          </p>
          <p>
            <strong>Quantidade:</strong> {quantidade}
          </p>
        </div>
      </div>
    </div>
  );
}
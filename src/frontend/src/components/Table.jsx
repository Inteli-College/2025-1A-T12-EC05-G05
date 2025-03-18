import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Table.css";
import seta from "../assets/icones/seta.svg";

export default function Table({ title, data, maxItems = data.length, route }) {
  const navigate = useNavigate();
  const visibleItems = data.slice(0, maxItems);
  const [selectedItems, setSelectedItems] = useState(Array(visibleItems.length).fill(false));
  const [selectAll, setSelectAll] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const hasSelected = selectedItems.some((item) => item);
    setShowButton(hasSelected);
    setSelectAll(selectedItems.every((item) => item) && selectedItems.length > 0);
  }, [selectedItems]);

  const handleSelectAll = () => {
    const newState = !selectAll;
    setSelectedItems(Array(visibleItems.length).fill(newState));
    setSelectAll(newState);
  };

  const handleSelectItem = (index) => {
    const newSelectedItems = [...selectedItems];
    newSelectedItems[index] = !newSelectedItems[index];
    setSelectedItems(newSelectedItems);
  };

  const handleTitleClick = () => {
    navigate(route);
  };

  return (
    <div className={`table ${showButton ? "with-button" : ""}`}>
      <div className="table-content">
        <div className="title">
          <div className="title-left">
            <button className="table-title-button" onClick={handleTitleClick}>
              {title}
            </button>
            <img src={seta} alt="seta para a direita" />
          </div>
          {title === "A fazer" && (
            <label className="select-all">
              Selecionar tudo
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
              />
            </label>
          )}
        </div>
        <div className="itens">
          {visibleItems.map((item, index) => (
            <React.Fragment key={index}>
              <div className="item">
                <div className="item-content">
                  <h2>{item.nome}</h2>
                  <p>{item.descricao}</p>
                </div>
                {item.separando && <span className="status-tag">Separando</span>}
                {title === "A fazer" && (
                  <div className="checkbox-container">
                    <input
                      type="checkbox"
                      checked={selectedItems[index]}
                      onChange={() => handleSelectItem(index)}
                    />
                  </div>
                )}
              </div>
              {index !== visibleItems.length - 1 && <hr />}
            </React.Fragment>
          ))}
        </div>
      </div>
      {showButton && (
        <button className="colocar-em-producao show">
          Colocar em produção
        </button>
      )}
    </div>
  );
}

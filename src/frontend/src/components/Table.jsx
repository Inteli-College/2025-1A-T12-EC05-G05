import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Table.css";
import seta from "../assets/icones/seta.svg";

export default function Table({ title, data, maxItems = data.length, route, onItemClick }) {
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

    if (title === "Possíveis devoluções") {
      newSelectedItems.fill(false);
      newSelectedItems[index] = true;
    } else {
      newSelectedItems[index] = !newSelectedItems[index];
    }

    setSelectedItems(newSelectedItems);
  };

  const handleTitleClick = () => {
    navigate(route);
  };

  const buttonText = title === "A fazer" ? "Colocar em produção" :
    title === "Possíveis devoluções" ? "Devolver" : "";
  const handleItemClick = (item) => {
    if (onItemClick) {
      onItemClick(item);
    }
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
              <div className="item-container">
                <button 
                  className="item" 
                  onClick={() => handleItemClick(item)} 
                >
                  <div className="item-content">
                    <h2>{item.nome}</h2>
                    <p>{item.descricao}</p>
                  </div>
                  {item.separando && <span className="status-tag">Separando</span>}
                </button>
                {(title === "A fazer" || title === "Possíveis devoluções") && (
                  <div className="checkbox-container">
                    {title === "Possíveis devoluções" ? (
                      <input
                        type="radio"
                        checked={selectedItems[index]}
                        onChange={() => handleSelectItem(index)}
                        name="possible-return"
                      />
                    ) : (
                      <input
                        type="checkbox"
                        checked={selectedItems[index]}
                        onChange={() => handleSelectItem(index)}
                      />
                    )}
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
          {buttonText}
        </button>
      )}
    </div>
  );
}

import React, { useState, useEffect } from "react";
import "../styles/Table.css";
import seta from "../assets/icones/seta.svg";

export default function Table({ title, data, maxItems = data.length }) {
  const visibleItems = data.slice(0, maxItems);
  const [selectedItems, setSelectedItems] = useState(Array(visibleItems.length).fill(false));
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    const allSelected = selectedItems.every((item) => item);
    setSelectAll(allSelected && selectedItems.length > 0);
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

  return (
    <div className="table">
      <div className="title">
        <div className="title-left">
          <h1>{title}</h1>
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
  );
}

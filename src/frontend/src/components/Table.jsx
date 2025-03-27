import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Table.css";
import seta from "../assets/icones/seta.svg";
import httpClient from "../httpClient";

export default function Table({ title, data, maxItems = data.length, route }) {
  const navigate = useNavigate();
  const visibleItems = data.slice(0, maxItems);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const hasSelected = selectedItems.length > 0;
    setShowButton(hasSelected);
    setSelectAll(selectedItems.length === visibleItems.length && selectedItems.length > 0);
  }, [selectedItems, visibleItems.length]);

  const handleSelectAll = () => {
    const newState = !selectAll;
    if (newState) {
      setSelectedItems(visibleItems.map(item => Number(item.id)));
    } else {
      setSelectedItems([]);
    }
    setSelectAll(newState);
  };
  
  const handleSelectItem = (index) => {
    const selectedItemId = Number(visibleItems[index].id);
    if (selectedItems.includes(selectedItemId)) {
      setSelectedItems(selectedItems.filter(id => id !== selectedItemId));
    } else {
      setSelectedItems([...selectedItems, selectedItemId]);
    }
  };
  

  const handleTitleClick = () => {
    navigate(route);
  };

  async function goToProduction(e) {
    e.preventDefault();
    if (selectedItems.length === 0) {
      alert("Nenhum medicamento selecionado");
      return;
    }

    try {
      const mockResponse = { data: { bins: selectedItems } };
      setTimeout(() => {
        alert("Medicamentos colocados em produção com sucesso!");
      }, 1000);
      await httpClient.post("http://localhost:5000/robot/collect", mockResponse.data);
    } catch (error) {
      if (error.response?.status === 401) {
        alert("Nenhum medicamento selecionado.");
      } else {
        alert("Ocorreu um erro, tente novamente mais tarde.");
      }
    }
  }

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
                      checked={selectedItems.includes(item.id)}
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
        <button className="colocar-em-producao show" onClick={goToProduction}>
          Colocar em produção
        </button>
      )}
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/Table.css";
import seta from "../assets/icones/seta.svg";
import httpClient from "../httpClient";

const dataPopUp = {
  nome: 'Fita 1',
  estado: 'Pronta',
  paciente: 'João da Silva',
  leito: 'Leito 07',
  ultimaAtualizacao: '26/02/2025 - 18:34',
  aprovadoPor: 'Maria Souza - 25/02/2025 - 08:15',
  medicamentos: [
    { nome: 'Paracetamol 500mg', tipo: 'Comprimido', validade: '12/2026', status: 'Em estoque', quantidade: 1 },
    { nome: 'Amoxicilina 500mg', tipo: 'Cápsula', validade: '08/2025', status: 'Em falta', quantidade: 2 },
    { nome: 'Enoxaparina 40mg', tipo: 'Seringa', validade: '08/2025', status: 'Em estoque', quantidade: 1 },
    { nome: 'Enoxaparina 40mg', tipo: 'Seringa', validade: '08/2025', status: 'Em estoque', quantidade: 1 }
  ]
};

export default function Table({ title, data, maxItems = data.length, route, onItemClick, onButtonClick }) {
  const navigate = useNavigate();
  const location = useLocation();
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
    const newSelectedItems = [...selectedItems];

    if (title === "Possíveis devoluções" | title === "A fazer") {
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
  const handleItemClick = (item) => {
    if (onItemClick) {
      onItemClick(dataPopUp);
    }
  };

  const handleButtonClick = () => {
    if (onButtonClick) {
      const selectedIndex = selectedItems.findIndex(item => item);
      if (selectedIndex !== -1) {
        onButtonClick(data[selectedIndex]);
      }
    }
  };

  const buttonText = title === "A fazer" ? "Colocar em produção"
                    : title === "Possíveis devoluções" ? "Devolver"
                    : "";
  const isCurrentRoute = location.pathname === route;

  return (
    <div className={`table ${showButton ? "with-button" : ""}`}>
      <div className="table-content">
        <div className="title">
          <div className="title-left">
            <button className="table-title-button" onClick={handleTitleClick}>
              {title}
            </button>
            {!isCurrentRoute && <img src={seta} alt="seta para a direita" />}
          </div>
          {/* {title === "A fazer" && (
              <label className="select-all">
                Selecionar tudo
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
              </label>
          )} */}
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
                  {item.separando && (
                    <span className="status-tag">Separando</span>
                  )}
                </button>

                {(title === "A fazer" || title === "Possíveis devoluções") && (
                  <div className="checkbox-container">
                    {(title === "A fazer" || title === "Possíveis devoluções") ? (
                      <input
                        type="radio"
                        checked={selectedItems.includes(item.id)}
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
        <button className="colocar-em-producao show" onClick={onButtonClick || goToProduction}>
        {buttonText}

        </button>
      )}
    </div>
  );
}
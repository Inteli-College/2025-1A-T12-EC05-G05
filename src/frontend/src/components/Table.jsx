import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/Table.css";
import seta from "../assets/icones/seta.svg";
import httpClient from "../httpClient";
import SucessModal from "./SucessModal";
import FairModal from "./FairModal";

export default function Table({ title, data, maxItems = data.length, route, onItemClick, onButtonClick }) {
  const navigate = useNavigate();
  const location = useLocation();
  const visibleItems = data.slice(0, maxItems);
  const [selectedItems, setSelectedItems] = useState([]);
  // const [selectAll, setSelectAll] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [showFairModal, setShowFairModal] = useState(false);
  const [showSucessModal, setShowSucessModal] = useState(false);
  const [fairMessage, setFairMessage] = useState("Algo deu errado");
  const [sucessMessage, setSucessMessage]  = useState("Deu tudo certo");

  useEffect(() => {
    const hasSelected = selectedItems.length > 0;
    setShowButton(hasSelected);
    // setSelectAll(selectedItems.length === visibleItems.length && selectedItems.length > 0);
  }, [selectedItems, visibleItems.length]);

  // const handleSelectAll = () => {
  //   const newState = !selectAll;
  //   if (newState) {
  //     setSelectedItems(visibleItems.map(item => Number(item.id)));
  //   } else {
  //     setSelectedItems([]);
  //   }
  //   setSelectAll(newState);
  // };

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
      return;
    }

    try {
      const medicamentoToBin = {
        "Ibuprofeno 400mg": "1",
        "Dorflex 300mg": "2",
        "Buscopan 10mg": "3",
        "Dipirona 1g": "4",
        "Paracetamol 500mg": "5"
      };

      const selectedMedicamentos = visibleItems.filter((item, index) => selectedItems[index]);

      const bins = selectedMedicamentos
        .map(item => item.descricao)
        .flatMap(descricao => descricao.split(', '))
        .map(medicamento => medicamentoToBin[medicamento])
        .filter(bin => bin !== undefined);

      if (bins.length === 0) {
        setFairMessage("Nenhum medicamento selecionado.")
        setShowFairModal(true);
        return;
      }

      const Response = { data: { bins } };

      await httpClient.post("http://localhost:5000/robot/collect", Response.data);
      for (const fita of selectedMedicamentos) {
        await httpClient.patch(`http://localhost:5000/api/fitas/${fita.id}`, { "status":"em_progresso" });
      }
      setSucessMessage("Medicamentos colocados em produção com sucesso!");
      for (const fita of selectedMedicamentos) {
        await httpClient.patch(`http://localhost:5000/api/fitas/${fita.id}`, { "status":"finalizada" });
      }
      setShowSucessModal(true);

    } catch (error) {
      if (error.response?.status === 401) {
        setFairMessage("Nenhum medicamento selecionado.");
        setShowFairModal(true);
      } else {
        setFairMessage("Ocorreu um erro, tente novamente mais tarde.");
        setShowFairModal(true);
      }
    }
  }


  const handleItemClick = (item) => {
    if (onItemClick) {
      onItemClick(item);
    }
  };

  const buttonText = title === "A fazer" ? "Colocar em produção"
    : title === "Possíveis devoluções" ? "Devolver"
      : "";
  const isCurrentRoute = location.pathname === route;

  const handleCloseFairModal = () => setShowFairModal(false);
  const handleCloseSucessModal = () => setShowSucessModal(false);

  return (
    <>
      {showFairModal && (
        <FairModal
          message={fairMessage}
          onClose={handleCloseFairModal}
        />
      )}
      {showSucessModal && (
        <SucessModal
          message={sucessMessage}
          onClose={handleCloseSucessModal}
        />
      )}
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
          <button className="colocar-em-producao show" onClick={onButtonClick || goToProduction}>
            {buttonText}

          </button>
        )}
      </div>
    </>
  );
}
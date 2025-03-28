import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Table from "../components/Table";
import PageHeader from "../components/PageHeader";
import PopUpFitas from "../components/PopUpFitas";
import PopUpDevolucao from "../components/PopUpDevolucao";
import "../styles/Devolucao.css";

const dataPossivelDevolucao = [
  { nome: "Fita 5", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur." },
  { nome: "Fita 4", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur." },
  { nome: "Fita 3", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur." },
  { nome: "Fita 2", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur." },
];

const dataDevolvidas = [
  { nome: "Fita 4", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur." },
  { nome: "Fita 3", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur." },
  { nome: "Fita 2", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur." },
  { nome: "Fita 1", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur." },
];

export default function Devolucao() {
  const location = useLocation();
  const isSingleFita = location.pathname !== "/devolucao";

  const [selectedFita, setSelectedFita] = useState(null);
  const [popupDevolucaoData, setPopupDevolucaoData] = useState(null);

  const openPopUpFitas = (fitaData) => {
    setSelectedFita({
      ...fitaData,
      estado: "Pronta"
    });
  };

  const openPopUpDevolucao = (fitaData) => {
    setPopupDevolucaoData({
      ...fitaData,
      estado: "Fazer devolução"
    });
  };

  const closePopUpFitas = () => setSelectedFita(null);
  const closePopUpDevolucao = () => setPopupDevolucaoData(null);

  return (
    <div className="Devolucao">
      {selectedFita && <PopUpFitas data={selectedFita} closePopUp={closePopUpFitas} />}
      {popupDevolucaoData && <PopUpDevolucao data={popupDevolucaoData} closePopUp={closePopUpDevolucao} />}
      
      <div className="conteudo">
        <PageHeader title="Devolução" isSingleFita={isSingleFita} />
        {location.pathname === "/devolucao" ? (
          <>
            <Table
              title="Possíveis devoluções"
              data={dataPossivelDevolucao}
              maxItems={4}
              route="/devolucao/possivel-devolucao"
              onItemClick={openPopUpFitas}
              onButtonClick={openPopUpDevolucao}
            />
            <Table
              title="Devolvidas"
              data={dataDevolvidas}
              maxItems={4}
              route="/devolucao/devolvidas"
            />
          </>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
}

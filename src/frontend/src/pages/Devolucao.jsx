import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Table from "../components/Table";
import PageHeader from "../components/PageHeader";
import PopUpFitas from "../components/PopUpFitas";
import PopUpDevolucao from "../components/PopUpDevolucao";
import LoadingModal from "../components/LoadingModal";
import FairModal from "../components/FairModal";
import "../styles/Devolucao.css";

export default function Devolucao() {
  const location = useLocation();
  const isSingleFita = location.pathname !== "/devolucao";

  const [dataPossivelDevolucao, setDataPossivelDevolucao] = useState([]);
  const [dataDevolvidas, setDataDevolvidas] = useState([]);
  const [selectedFita, setSelectedFita] = useState(null);
  const [popupDevolucaoData, setPopupDevolucaoData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {

    const formatarRemedios = (remedios) => {
      return remedios && remedios.length > 0
          ? `${remedios.join(', ')}`
          : 'Sem remédios';
  };

    const fetchDevolucoes = async () => {
      setIsLoading(true);
      try {
        const [possiveisRes, devolvidasRes] = await Promise.all([
          fetch("http://localhost:5000/api/fitas-possiveis-devolucao"),
          fetch("http://localhost:5000/api/fitas-devolvidas"),
        ]);

        const possiveis = await possiveisRes.json();
        const devolvidas = await devolvidasRes.json();

        const formatar = (fitas) =>
          fitas.map((fita) => ({
            id: fita.id,
            nome: `Fita ${fita.id}`,
            descricao: formatarRemedios(fita.remedios)
          }));

        setDataPossivelDevolucao(formatar(possiveis));
        setDataDevolvidas(formatar(devolvidas));
      } catch (error) {
        console.error("Erro ao buscar devoluções:", error);
        setShowModal(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDevolucoes();
  }, []);

  const openPopUpFitas = async (fitaData) => {
    const fitaId = parseInt(fitaData.nome.replace("Fita ", ""));
    try {
      const response = await fetch(`http://localhost:5000/api/fitas/${fitaId}`);
      if (response.ok) {
        const data = await response.json();
        setSelectedFita(data);  // agora temos a fita detalhada
      } else {
        console.error("Erro ao buscar detalhes da fita. Status:", response.status);
      }
    } catch (error) {
      console.error("Erro ao buscar detalhes da fita:", error);
    }
  };

  const openPopUpDevolucao = (fitaData) => {
    setPopupDevolucaoData({
      ...fitaData,
      estado: "Fazer devolução"
    });
  };

  const closePopUpFitas = () => setSelectedFita(null);
  const closePopUpDevolucao = () => setPopupDevolucaoData(null);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="Devolucao">
      <LoadingModal isLoading={isLoading} />
      {showModal && (
        <FairModal
          message="Algo deu errado. Por favor, tente novamente!"
          onClose={handleCloseModal}
        />
      )}
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
              onItemClick={openPopUpFitas}
            />
          </>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
}

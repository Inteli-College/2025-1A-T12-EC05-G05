import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Table from "../components/Table";
import PageHeader from "../components/PageHeader";
import "../styles/fitaMedicamentos.css";
import UnitaryCollection from "../components/UnitaryCollection";
import PopUpFitas from "../components/PopUpFitas";
import FairModal from "../components/FairModal";
import LoadingModal from "../components/LoadingModal";

export default function FitaMedicamentos() {
    const [fitas, setFitas] = useState({
        aFazer: [],
        emProgresso: [],
        prontas: []
    });
    const [isLoading, setIsLoading] = useState(true);
    const [selectedFita, setSelectedFita] = useState(null);
    const location = useLocation();
    const isSingleFita = location.pathname !== "/tela-medicamentos";
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchFitas = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/fitas');
                const data = await response.json();

                const formatarRemedios = (remedios) => {
                    return remedios && remedios.length > 0
                        ? `${remedios.join(', ')}`
                        : 'Sem remédios';
                };

                const aFazer = data.filter(fita => fita.status === "pendente");
                const emProgresso = data.filter(fita => fita.status === "em_progresso");
                const prontas = data.filter(fita => fita.status === "finalizada");

                setFitas({
                    aFazer: aFazer.map(fita => ({
                        id: `${fita.id}`,
                        nome: `Fita ${fita.id}`,
                        descricao: formatarRemedios(fita.remedios)
                    })),
                    emProgresso: emProgresso.map(fita => ({
                        id: `${fita.id}`,
                        nome: `Fita ${fita.id}`,
                        descricao: formatarRemedios(fita.remedios)
                    })),
                    prontas: prontas.map(fita => ({
                        id: `${fita.id}`,
                        nome: `Fita ${fita.id}`,
                        descricao: formatarRemedios(fita.remedios)
                    }))
                });
                setIsLoading(false);
            } catch (error) {
                console.error('Erro ao buscar fitas:', error);
                setIsLoading(false);
                setShowModal(true);
            }
        };

        fetchFitas();
    }, []);

    const openPopUp = (fitaData) => {
        setSelectedFita(fitaData);
    };

    const closePopUp = () => {
        setSelectedFita(null);
    };

    const handleCloseModal = () => setShowModal(false);

    return (
        <div className="fitaMedicamentos">
            <UnitaryCollection />
            {selectedFita && <PopUpFitas data={selectedFita} closePopUp={closePopUp} />}
            <div className="conteudo">
                <PageHeader title="Fitas de medicamentos" isSingleFita={isSingleFita} />
                {location.pathname === "/tela-medicamentos" ? (
                    <>
                        <Table title="A fazer" data={fitas.aFazer} maxItems={2} onItemClick={openPopUp} route="/tela-medicamentos/a-fazer" />
                        <Table title="Em progresso" data={fitas.emProgresso} maxItems={1} onItemClick={openPopUp} route="/tela-medicamentos/em-progresso" />
                        <Table title="Prontas" data={fitas.prontas} maxItems={2} onItemClick={openPopUp} route="/tela-medicamentos/prontas" />
                    </>
                ) : (
                    <Outlet />
                )}
            </div>
            <LoadingModal isLoading={isLoading}/>
            {showModal && (
                <FairModal
                    message="Algo deu errado. Por favor, tente novamente!"
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
}
import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Table from "../components/Table";
import PageHeader from "../components/PageHeader";
import "../styles/fitaMedicamentos.css";
import UnitaryCollection from "../components/UnitaryCollection";
import PopUpFitas from "../components/PopUpFitas";
import FairModal from "../components/FairModal";
import LoadingModal from "../components/LoadingModal";

const dataAFazer = [
    { id: 1, nome: "Fita 5", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur." },
    { id: 2, nome: "Fita 4", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur." },
    { id: 3, nome: "Fita 3", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur." },
    { id: 4, nome: "Fita 2", descricao: "Este não será mostrado porque maxItems é 3." },
];

const dataEmProgresso = [
    { id: 5, nome: "Fita 3", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur.", separando: true },
    { id: 6, nome: "Fita 2", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur." },
    { id: 7, nome: "Fita 1", descricao: "Este não será mostrado porque maxItems é 2." },
];

const dataProntas = [
    { id: 8, nome: "Fita 2", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur." },
    { id: 9, nome: "Fita 1", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur." },
];



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
                        nome: `Fita ${fita.id}`,
                        descricao: formatarRemedios(fita.remedios)
                    })),
                    emProgresso: emProgresso.map(fita => ({
                        nome: `Fita ${fita.id}`,
                        descricao: formatarRemedios(fita.remedios)
                    })),
                    prontas: prontas.map(fita => ({
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

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    return (
        <div className="fitaMedicamentos">
            <UnitaryCollection />
            {selectedFita && <PopUpFitas data={selectedFita} closePopUp={closePopUp} />}
            <div className="conteudo">
                <PageHeader title="Fitas de medicamentos" isSingleFita={isSingleFita} />
                {location.pathname === "/tela-medicamentos" ? (
                    <>
                        <Table title="A fazer" data={dataAFazer} maxItems={2} onItemClick={openPopUp} route="/tela-medicamentos/a-fazer" />
                        <Table title="Em progresso" data={dataEmProgresso} maxItems={1} onItemClick={openPopUp} route="/tela-medicamentos/em-progresso" />
                        <Table title="Prontas" data={dataProntas} maxItems={2} onItemClick={openPopUp} route="/tela-medicamentos/prontas" />
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
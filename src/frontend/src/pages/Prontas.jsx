import React, { useState, useEffect } from "react";
import Table from "../components/Table";
import LoadingModal from "../components/LoadingModal";
import PopUpFitas from "../components/PopUpFitas";
import FairModal from "../components/FairModal";

export default function Prontas() {
    const [fitas, setFitas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedFita, setSelectedFita] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchFitasProntas = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/fitas');
                const data = await response.json();

                const fitasProntas = data
                    .filter(fita => fita.status === "finalizada")
                    .map(fita => ({
                        nome: `Fita ${fita.id}`,
                        descricao: fita.remedios
                            ? `${fita.remedios.join(', ')}`
                            : 'Sem remédios',
                        separando: false
                    }));

                setFitas(fitasProntas);
                setIsLoading(false);
            } catch (error) {
                console.error('Erro ao buscar fitas em progresso:', error);
                setIsLoading(false);
                setShowModal(true);
            }
        };

        fetchFitasProntas();
    }, []);

    const openPopUp = (fitaData) => {
        setSelectedFita(fitaData);
    };

    const closePopUp = () => {
        setSelectedFita(null);
    };

    const handleCloseModal = () => setShowModal(false);

    return (
        <>
            {selectedFita && <PopUpFitas data={selectedFita} closePopUp={closePopUp} />}
            {showModal && (
                <FairModal
                    message="Algo deu errado. Por favor, tente novamente!"
                    onClose={handleCloseModal}
                />
            )}
            <Table
                title="Prontas"
                data={fitas}
                route="/tela-medicamentos/prontas"
                onItemClick={openPopUp}
            />
            <LoadingModal isLoading={isLoading} />
        </>
    );
}

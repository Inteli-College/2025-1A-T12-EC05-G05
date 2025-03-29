import React, { useState, useEffect } from "react";
import Table from "../components/Table";
import LoadingModal from "../components/LoadingModal";
import PopUpFitas from "../components/PopUpFitas";
import FairModal from "../components/FairModal";

export default function EmProgresso() {
    const [fitas, setFitas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedFita, setSelectedFita] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchFitasEmProgresso = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/fitas');
                const data = await response.json();

                const fitasEmProgresso = data
                    .filter(fita => fita.status === "em_progresso")
                    .map(fita => ({
                        nome: `Fita ${fita.id}`,
                        descricao: fita.remedios
                            ? `${fita.remedios.join(', ')}`
                            : 'Sem remédios',
                        separando: true
                    }));

                setFitas(fitasEmProgresso);
                setIsLoading(false);
            } catch (error) {
                console.error('Erro ao buscar fitas em progresso:', error);
                setIsLoading(false);
                setShowModal(true);
            }
        };

        fetchFitasEmProgresso();
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
            <LoadingModal isLoading={isLoading} />
            {showModal && (
                <FairModal
                    message="Algo deu errado. Por favor, tente novamente!"
                    onClose={handleCloseModal}
                />
            )}
            <Table
                title="Em progresso"
                data={fitas}
                route="/tela-medicamentos/em-progresso"
                onItemClick={openPopUp}
            />
        </>
    );
}
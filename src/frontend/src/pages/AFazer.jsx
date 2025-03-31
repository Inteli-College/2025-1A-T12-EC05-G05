import React, { useState, useEffect } from "react";
import Table from "../components/Table";
import LoadingModal from "../components/LoadingModal";
import FairModal from "../components/FairModal";
import PopUpFitas from "../components/PopUpFitas";

export default function AFazer() {
    const [fitas, setFitas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedFita, setSelectedFita] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchFitasAFazer = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/fitas');
                const data = await response.json();

                const fitasAFazer = data
                    .filter(fita => fita.status === "pendente")
                    .map(fita => ({
                        id: fita.id,
                        nome: `Fita ${fita.id}`,
                        descricao: fita.remedios
                            ? `${fita.remedios.join(', ')}`
                            : 'Sem remédios',
                    }));

                setFitas(fitasAFazer);
                setIsLoading(false);
            } catch (error) {
                console.error('Erro ao buscar fitas em progresso:', error);
                setIsLoading(false);
                setShowModal(true);
            }
        };

        fetchFitasAFazer();
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
            <Table title="A fazer" data={fitas} onItemClick={openPopUp} route="/tela-medicamentos/a-fazer" />
            <LoadingModal isLoading={isLoading} />
            {showModal && (
                <FairModal
                    message="Algo deu errado. Por favor, tente novamente!"
                    onClose={handleCloseModal}
                />
            )}
        </>
    );
}

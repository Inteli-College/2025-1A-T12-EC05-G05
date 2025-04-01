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
                console.error('Erro ao buscar fitas a fazer:', error);
                setIsLoading(false);
                setShowModal(true);
            }
        };
        fetchFitasAFazer();
    }, []);

    const openPopUp = async (fitaId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/fitas/${fitaId}`);
            if (response.ok) {
                const data = await response.json();
                setSelectedFita(data);
            } else {
                console.error('Erro ao buscar detalhes da fita. Status:', response.status);
            }
        } catch (error) {
            console.error('Erro ao buscar detalhes da fita:', error);
        }
    };

    const closePopUp = () => {
        setSelectedFita(null);
    };

  const handleCloseModal = () => setShowModal(false);
    return (
        <div>

            {selectedFita && <PopUpFitas data={selectedFita} closePopUp={closePopUp} />}
            <Table 
                title="A fazer" 
                data={fitas} 
                route="/tela-medicamentos/a-fazer"
                onItemClick={(fita) => openPopUp(fita.id)} 
            />
            <LoadingModal isLoading={isLoading} />
            {showModal && (
                <FairModal
                    message="Algo deu errado. Por favor, tente novamente!"
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
}

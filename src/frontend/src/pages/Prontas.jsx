import React, { useState, useEffect } from "react";
import Table from "../components/Table";
import LoadingModal from "../components/LoadingModal";
import PopUpFitas from "../components/PopUpFitas"; 

export default function Prontas() {
    const [fitas, setFitas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedFita, setSelectedFita] = useState(null); 

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
                            ? `Remédios: ${fita.remedios.join(', ')}` 
                            : 'Sem remédios',
                        id: fita.id 
                    }));

                setFitas(fitasProntas);
                setIsLoading(false);
            } catch (error) {
                console.error('Erro ao buscar fitas finalizadas:', error);
                setIsLoading(false);
            }
        };

        fetchFitasProntas();
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

    return (
        <>
            <LoadingModal isLoading={isLoading} />

            {/* Exibindo o pop-up de detalhes da fita */}
            {selectedFita && <PopUpFitas data={selectedFita} closePopUp={closePopUp} />}

            <Table 
                title="Prontas" 
                data={fitas} 
                route="/tela-medicamentos/prontas"
                onItemClick={(fita) => openPopUp(fita.id)} 
            />
        </>
    );
}

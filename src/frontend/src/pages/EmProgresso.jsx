import React, { useState, useEffect } from "react";
import Table from "../components/Table";
import LoadingModal from "../components/LoadingModal";
import PopUpFitas from "../components/PopUpFitas"; 

export default function EmProgresso() {
    const [fitas, setFitas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedFita, setSelectedFita] = useState(null); 

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
                            ? `Remédios: ${fita.remedios.join(', ')}` 
                            : 'Sem remédios',
                        id: fita.id 
                    }));

                setFitas(fitasEmProgresso);
                setIsLoading(false);
            } catch (error) {
                console.error('Erro ao buscar fitas em progresso:', error);
                setIsLoading(false);
            }
        };

        fetchFitasEmProgresso();
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
            {selectedFita && <PopUpFitas data={selectedFita} closePopUp={closePopUp} />}
            <Table 
                title="Em progresso" 
                data={fitas}
                route="/tela-medicamentos/em-progresso"
                onItemClick={(fita) => openPopUp(fita.id)} 
            />
        </>
    );
}

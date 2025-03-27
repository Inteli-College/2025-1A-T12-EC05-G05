import React, { useState, useEffect } from "react";
import Table from "../components/Table";
import LoadingModal from "../components/LoadingModal";

export default function EmProgresso() {
    const [fitas, setFitas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchFitasEmProgresso = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/fitas');
                const data = await response.json();
                
                // Filtrar apenas fitas em progresso
                const fitasEmProgresso = data
                    .filter(fita => fita.status === "em_progresso")
                    .map(fita => ({
                        nome: `Fita ${fita.id}`,
                        descricao: fita.remedios 
                            ? `Remédios: ${fita.remedios.join(', ')}` 
                            : 'Sem remédios',
                        separando: true // Pode ajustar conforme necessidade
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

    return (
        <>
            <LoadingModal isLoading={isLoading} />
            <Table 
                title="Em progresso" 
                data={fitas} 
                route="/tela-medicamentos/em-progresso" 
            />
        </>
    );
}
import React, { useState, useEffect } from "react";
import Table from "../components/Table";

export default function AFazer() {
    const [fitas, setFitas] = useState([]);
            const [isLoading, setIsLoading] = useState(true);
        
            useEffect(() => {
                const fetchFitasAFazer = async () => {
                    try {
                        const response = await fetch('http://localhost:5000/api/fitas');
                        const data = await response.json();
                        
                        const fitasAFazer = data
                            .filter(fita => fita.status === "pendente")
                            .map(fita => ({
                                nome: `Fita ${fita.id}`,
                                descricao: fita.remedios 
                                    ? `Remédios: ${fita.remedios.join(', ')}` 
                                    : 'Sem remédios',
                            }));
        
                        setFitas(fitasAFazer);
                        setIsLoading(false);
                    } catch (error) {
                        console.error('Erro ao buscar fitas em progresso:', error);
                        setIsLoading(false);
                    }
                };
        
                fetchFitasAFazer();
            }, []);
    return (
        <Table title="A fazer" data={fitas} route="/tela-medicamentos/a-fazer" />
    );
}

import React,{ useState, useEffect } from "react";
import Table from "../components/Table";

export default function Prontas() {
    const [fitas, setFitas] = useState([]);
        const [isLoading, setIsLoading] = useState(true);
    
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
                            separando: false 
                        }));
    
                    setFitas(fitasProntas);
                    setIsLoading(false);
                } catch (error) {
                    console.error('Erro ao buscar fitas em progresso:', error);
                    setIsLoading(false);
                }
            };
    
            fetchFitasProntas();
        }, []);
    
    return (
        <>
        <Table 
        title="Prontas"
        data={fitas} 
        route="/tela-medicamentos/prontas" />
        </>
    );
}

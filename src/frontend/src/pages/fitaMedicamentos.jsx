import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Table from "../components/Table";
import PageHeader from "../components/PageHeader";
// import LoadingModal from "../components/LoadingModal";
import "../styles/fitaMedicamentos.css";
import UnitaryCollection from "../components/UnitaryCollection";
import PopUpFitas from "../components/PopUpFitas";
export default function FitaMedicamentos() {
    const [fitas, setFitas] = useState({
        aFazer: [],
        emProgresso: [],
        prontas: []
    });
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();
    const isSingleFita = location.pathname !== "/tela-medicamentos"

    useEffect(() => {
        const fetchFitas = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/fitas');
                const data = await response.json();
                
                // Função para formatar lista de remédios
                const formatarRemedios = (remedios) => {
                    return remedios && remedios.length > 0 
                        ? `Remédios: ${remedios.join(', ')}` 
                        : 'Sem remédios';
                };

                // Classificar fitas por status
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
            }
        };

        fetchFitas();
    }, []);

    return (
        <div className="fitaMedicamentos">
            <div className="conteudo">
                <PageHeader title="Fitas de medicamentos" isSingleFita={isSingleFita} />
                {location.pathname === "/tela-medicamentos" ? (
                    <>
                        <Table 
                            title="A fazer" 
                            data={fitas.aFazer} 
                            maxItems={10} 
                            route="/tela-medicamentos/a-fazer"
                        />
                        <Table 
                            title="Em progresso" 
                            data={fitas.emProgresso} 
                            maxItems={10} 
                            route="/tela-medicamentos/em-progresso"
                        />
                        <Table 
                            title="Prontas" 
                            data={fitas.prontas} 
                            maxItems={10} 
                            route="/tela-medicamentos/prontas"
                        />
                    </>
                ) : (
                    <Outlet />
                )}
            </div>
        </div>
    );
}
import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/Historico.css";
import PageHeader from "../components/PageHeader";

export default function Historico() {
    const [date, setDate] = useState(new Date());
    const [fitasPorData, setFitasPorData] = useState({});

    useEffect(() => {
        const fetchHistorico = async () => {
            try { 
                const response = await fetch("http://127.0.0.1:5000/api/historico");
                const data = await response.json();

                if (response.ok) {
                    const novoHistorico = {};
                    data.forEach((fita) => {
                        if (!novoHistorico[fita.data]) {
                            novoHistorico[fita.data] = [];
                        }
                        novoHistorico[fita.data].push({
                            nome: fita.nome,
                        });
                    });

                    setFitasPorData(novoHistorico);
                } else {
                    console.error("Erro ao buscar histórico:", data.message);
                }
            } catch (error) {
                console.error("Erro ao buscar histórico:", error);
            }
        };

        fetchHistorico();
    }, []);

    const formatarData = (data) => data.toISOString().split("T")[0];
    const fitasEntregues = fitasPorData[formatarData(date)] || [];

    const exportarCSV = () => {
        if (fitasEntregues.length === 0) return;

        const csvContent = [
            ["Nome"],
            ...fitasEntregues.map(fita => [fita.nome])
        ]
        .map(e => e.join(","))
        .join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.setAttribute("download", `fitas_${formatarData(date)}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="historico">
            <div className="conteudo-historico">
                <PageHeader title="Histórico" />
                <div className="historico-content">
                    <div className="calendar-container">
                        <Calendar onChange={setDate} value={date} />
                    </div>
                    <div className="content">
                        <div className="fitas-container">
                            <div className={`fitas-header ${fitasEntregues.length > 3 ? "com-scroll" : ""}`}>
                                <h2>Fitas de medicamento entregues</h2>
                                <span className="total-fitas">Total de fitas: {fitasEntregues.length}</span>
                            </div>
                            <div className="fitas-lista">
                                {fitasEntregues.length > 0 ? (
                                    fitasEntregues.map((fita, index) => (
                                        <button 
                                            key={index} 
                                            className="fita-item"
                                            onClick={() => console.log(`Fita selecionada:  ${fita.nome}`)}
                                        >
                                            <h3>Fita {fita.nome}</h3>
                                            <p>abcdefg</p>
                                            {index !== fitasEntregues.length - 1 && <hr />}
                                        </button>
                                    ))
                                ) : (
                                    <p className="sem-fitas">Nenhuma fita entregue nesta data.</p>
                                )}
                            </div>
                        </div>

                        <button 
                            className={`exportar-csv ${fitasEntregues.length === 0 ? "desativado" : ""}`} 
                            onClick={exportarCSV} 
                            disabled={fitasEntregues.length === 0}
                        >
                            Exportar CSV
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

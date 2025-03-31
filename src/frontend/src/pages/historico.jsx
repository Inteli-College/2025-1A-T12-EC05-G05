import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/Historico.css";
import PageHeader from "../components/PageHeader";
import SucessModal from "../components/SucessModal";
import PopUpFitas from "../components/PopUpFitas";

const dataPopUp = {
    nome: 'Fita 1',
    estado: 'Pronta',
    paciente: 'João da Silva',
    leito: 'Leito 07',
    ultimaAtualizacao: '26/02/2025 - 18:34',
    aprovadoPor: 'Maria Souza - 25/02/2025 - 08:15',
    medicamentos: [
        { nome: 'Paracetamol 500mg', tipo: 'Comprimido', validade: '12/2026', status: 'Em estoque', quantidade: 1 },
        { nome: 'Amoxicilina 500mg', tipo: 'Cápsula', validade: '08/2025', status: 'Em falta', quantidade: 2 },
        { nome: 'Enoxaparina 40mg', tipo: 'Seringa', validade: '08/2025', status: 'Em estoque', quantidade: 1 },
        { nome: 'Enoxaparina 40mg', tipo: 'Seringa', validade: '08/2025', status: 'Em estoque', quantidade: 1 }
    ]
};

export default function Historico() {
    const [date, setDate] = useState(new Date());
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [selectedFita, setSelectedFita] = useState(null);

    const fitasPorData = {
        "2025-03-12": [
            { nome: "Fita 1", descricao: "Paciente retirou na UBS Central." },
            { nome: "Fita 2", descricao: "Entregue na Farmácia Popular." },
            { nome: "Fita 3", descricao: "Retirada na Unidade Móvel." },
            { nome: "Fita 4", descricao: "Entregue no Hospital Municipal." }
        ],
        "2025-03-13": [
            { nome: "Fita 1", descricao: "Entregue na Unidade de Saúde Familiar." },
            { nome: "Fita 2", descricao: "Paciente retirou no Hospital Regional." },
            { nome: "Fita 3", descricao: "Entrega realizada na UBS Bairro Novo." }
        ],
        "2025-03-14": [
            { nome: "Fita 1", descricao: "Paciente retirou na Farmácia Comunitária." },
            { nome: "Fita 2", descricao: "Entregue na Unidade de Saúde Pública." },
            { nome: "Fita 3", descricao: "Retirada na Clínica Especializada." },
            { nome: "Fita 4", descricao: "Entregue no Centro de Atendimento Médico." }
        ]
    };

    const formatarData = (data) => {
        return data.toISOString().split("T")[0];
    };

    const fitasEntregues = fitasPorData[formatarData(date)] || [];

    const exportarCSV = () => {
        if (fitasEntregues.length === 0) return;

        const csvContent = [
            ["Nome", "Descrição"],
            ...fitasEntregues.map(fita => [fita.nome, fita.descricao])
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

        setShowSuccessModal(true);
    };

    const openPopUp = () => {
        setSelectedFita(dataPopUp);
    };

    const closePopUp = () => {
        setSelectedFita(null);
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
                                            onClick={openPopUp}
                                        >
                                            <h3>{fita.nome}</h3>
                                            <p>{fita.descricao}</p>
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

            {showSuccessModal && (
                <SucessModal
                    message="Arquivo CSV exportado com sucesso!"
                    onClose={() => setShowSuccessModal(false)}
                />
            )}
            {selectedFita && <PopUpFitas data={selectedFita} closePopUp={closePopUp} />}
        </div>
    );
}

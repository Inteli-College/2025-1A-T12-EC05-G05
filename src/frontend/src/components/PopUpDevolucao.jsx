import React, { useState } from 'react';
import "../styles/PopUpFitas.css";
import SucessModal from "../components/SucessModal"; // ✅ Import do modal

export default function PopUpDevolucao({ data, closePopUp }) {
    const [estadoDevolucao, setEstadoDevolucao] = useState(1);
    const [fitaData, setFitaData] = useState(null);
    const [medicamentosDevolvidos, setMedicamentosDevolvidos] = useState([]);
    const [showSuccessModal, setShowSuccessModal] = useState(false); // ✅ Estado para modal de sucesso

    if (!data) return null;

    const biparFita = () => {
        setFitaData({
            paciente: "João da Silva",
            leito: "Leito 07",
            ultimaAtualizacao: "26/02/2025 - 18:34",
            aprovadoPor: "Maria Souza – 25/02/2025 - 08:15"
        });
        setEstadoDevolucao(2);
    };

    const biparMedicamento = () => {
        if (estadoDevolucao === 2) {
            setMedicamentosDevolvidos([{ nome: "Paracetamol 500mg", tipo: "Comprimido", validade: "12/2026", quantidade: 1 }]);
            setEstadoDevolucao(3);
        } else if (estadoDevolucao === 3) {
            setMedicamentosDevolvidos(prev => [
                ...prev,
                { nome: "Amoxicilina 500mg", tipo: "Cápsula", validade: "08/2025", quantidade: 1 }
            ]);
            setEstadoDevolucao(4);
        } else if (estadoDevolucao === 4) {
            const atualizados = medicamentosDevolvidos.map(med => {
                if (med.nome === "Amoxicilina 500mg") {
                    return { ...med, quantidade: 2 };
                }
                return med;
            });
            setMedicamentosDevolvidos(atualizados);
            setEstadoDevolucao(5);
        }
    };

    const renderMensagemTopo = () => {
        return estadoDevolucao === 1
            ? "FAÇA A BIPAGEM DO QR CODE DA FITA"
            : "FAÇA A BIPAGEM DO QR CODE DOS MEDICAMENTOS";
    };

    const terminarDevolucao = () => {
        setShowSuccessModal(true); // ✅ Exibe modal de sucesso
    };

    return (
        <>
            <div className="popup-container">
                <div className="popup-content">
                    <div className='popup-header'>
                        <div className='popup-header-content'>
                            <h1 className='popup-title'>{data.nome}</h1>
                            <span className="popup-status-tag">Fazer devolução</span>
                        </div>
                        <strong>{renderMensagemTopo()}</strong>
                        <button className="close-btn" onClick={closePopUp}>&times;</button>
                    </div>

                    <div className="popup-body">
                        <div className="patient-info">
                            <div><h2>Paciente</h2><p>{fitaData?.paciente || ""}</p></div>
                            <div><h2>Leito</h2><p>{fitaData?.leito || ""}</p></div>
                            <div><h2>Última atualização</h2><p>{fitaData?.ultimaAtualizacao || ""}</p></div>
                            <div><h2>Aprovada por</h2><p>{fitaData?.aprovadoPor || ""}</p></div>
                        </div>

                        <div className="medicamentos-container">
                            <div className="medicamentos-header">
                                <h2>Medicamentos da fita</h2>
                            </div>
                            <div className="medicamentos-lista">
                                {medicamentosDevolvidos.length === 0 ? (
                                    <p className="sem-medicamentos">Nenhum medicamento devolvido.</p>
                                ) : (
                                    medicamentosDevolvidos.map((med, index) => (
                                        <div key={index} className="medicamento-item">
                                            <div className="medicamento-item-content">
                                                <div className="medicamento-info">
                                                    <h3>{med.nome}</h3>
                                                    <p>{med.tipo}</p>
                                                    <p className='validade'>Válido até {med.validade}</p>
                                                </div>
                                                <div className="medicamento-status">
                                                    <span className="status-badge em-estoque">Devolvida</span>
                                                    <p>{med.quantidade}x</p>
                                                </div>
                                            </div>
                                            {index !== medicamentosDevolvidos.length - 1 && <hr />}
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>

                    <div style={{ display: "flex", gap: "10px", width: "100%", alignItems: 'center', justifyContent: "flex-end" }}>
                        {estadoDevolucao === 1 && <button className="exportar-btn" onClick={biparFita}>Simular Bipagem da Fita</button>}
                        {estadoDevolucao >= 2 && estadoDevolucao < 5 && (
                            <button className="exportar-btn" onClick={biparMedicamento}>Simular Bipagem de Medicamento</button>
                        )}
                        {estadoDevolucao >= 3 && (
                            <button
                                className="exportar-btn"
                                style={{ backgroundColor: "#5CE1E6", color: "#000" }}
                                onClick={terminarDevolucao}
                            >
                                Terminar Devolução
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* ✅ Modal de sucesso */}
            {showSuccessModal && (
                <SucessModal
                    message="Devolução registrada com sucesso!"
                    onClose={() => {
                        setShowSuccessModal(false);
                        closePopUp(); // Fecha o popup junto com o modal
                    }}
                />
            )}
        </>
    );
}
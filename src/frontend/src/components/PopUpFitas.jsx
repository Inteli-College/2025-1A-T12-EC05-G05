import React from 'react';
import "../styles/PopUpFitas.css";

export default function PopUpFitas({data, closePopUp }) {
    if (!data) return null;

    console.log('Dados do popup:', data);

    const { nome, status, paciente, leito, ultimaAtualizacao, aprovadoPor, medicamentos } = data || {};
    const medicamentosDisponiveis = medicamentos?.length > 0;

    return (
        <div className="popup-container">
            <div className="popup-content">
                {/* Cabeçalho do Popup */}
                <div className="popup-header">
                    <div className="popup-header-content">
                        <h1 className="popup-title">{nome || "Nome não disponível"}</h1>
                        <span className="popup-status-tag">{status || "Sem status"}</span>
                    </div>
                    <button className="close-btn" onClick={closePopUp}>&times;</button>
                </div>

                {/* Corpo do Popup */}
                <div className="popup-body">
                    <div className="patient-info">
                        <div>
                            <h2>Paciente</h2>
                            <p>{paciente || "Não informado"}</p>
                        </div>
                        <div>
                            <h2>Leito</h2>
                            <p>{leito || "Não informado"}</p>
                        </div>
                        <div>
                            <h2>Última atualização</h2>
                            <p>{ultimaAtualizacao || "Desconhecida"}</p>
                        </div>
                        <div>
                            <h2>Aprovado por</h2>
                            <p>{aprovadoPor || "Não informado"}</p>
                        </div>
                    </div>

                    {/* Medicamentos da Fita */}
                    <div className="medicamentos-container">
                        <div className={`medicamentos-header ${medicamentosDisponiveis ? "com-scroll" : ""}`}>
                            <h2>Medicamentos da Fita</h2>
                        </div>
                        <div className="medicamentos-lista">
                            {medicamentosDisponiveis ? (
                                medicamentos.map((medicamento, index) => (
                                    <div key={index} className="medicamento-item">
                                        <div className="medicamento-item-content">
                                            <div className="medicamento-info">
                                                <h3>{medicamento.nome}</h3>
                                                <p>{medicamento.tipo}</p>
                                                <p className="validade">Válido até {medicamento.validade}</p>
                                            </div>
                                            <div className="medicamento-status">
                                                <span className={`status-badge ${medicamento.status.toLowerCase().replace(/\s+/g, '-')}`}>
                                                    {medicamento.status}
                                                </span>
                                                <p>{medicamento.quantidade}x</p>
                                            </div>
                                        </div>
                                        {index !== medicamentos.length - 1 && <hr />}
                                    </div>
                                ))
                            ) : (
                                <p className="sem-medicamentos">Nenhum medicamento disponível.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

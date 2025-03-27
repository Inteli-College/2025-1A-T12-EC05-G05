import React from 'react';
import "../styles/PopUpFitas.css";

export default function PopUpFitas({ data, closePopUp }) {
    if (!data) {
        return null; 
    }

    const { nome, estado, paciente, leito, ultimaAtualizacao, aprovadoPor, medicamentos } = data;
    const medicamentosDisponiveis = medicamentos && medicamentos.length > 0;

    return (
        <div className="popup-container">
            <div className="popup-content">
                <div className='popup-header'>
                    <div className='popup-header-content'>
                        <h1 className='popup-title'>{nome}</h1>
                        <span className="popup-status-tag">{estado}</span>
                    </div>
                    <button className="close-btn" onClick={closePopUp}>&times;</button>
                </div>
                <div className="popup-body">
                    <div className="patient-info">
                        <div>
                            <h2>Paciente</h2>
                            <p>{paciente}</p>
                        </div>

                        <div>
                            <h2>Leito</h2>
                            <p>{leito}</p>
                        </div>

                        <div>
                            <h2>Última atualização</h2>
                            <p>{ultimaAtualizacao}</p>
                        </div>

                        <div>
                            <h2>Aprovada por</h2>
                            <p>{aprovadoPor}</p>
                        </div>

                        <div>
                            <h2>Mandado por</h2>
                            <p>{aprovadoPor}</p>
                        </div>
                    </div>

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
                                                <p className='validade'>Válido até {medicamento.validade}</p>
                                            </div>
                                            <div className="medicamento-status">
                                                <span className={`status-badge ${medicamento.status.toLowerCase().replace(/\s+/g, '-').toLowerCase()}`}>
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

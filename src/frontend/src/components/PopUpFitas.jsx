import React from 'react';
import "../styles/PopUpFitas.css";

export default function PopUpFitas({ data }) {
    return (
        <div className="popup-container">
            <div className="popup-content">
                <div className='popup-header'>
                    <div className='popup-header-content'>
                        <h1 className='popup-title'>{data.nome}</h1>
                        <span className="popup-status-tag">{data.estado}</span>
                    </div>
                    <button className="close-btn">&times;</button>
                </div>
                <div className="popup-body">
                    <div className="patient-info">
                        <div>
                            <h2>Paciente</h2>
                            <p>{data.paciente}</p>
                        </div>

                        <div>
                            <h2>Leito</h2>
                            <p>{data.leito}</p>
                        </div>

                        <div>
                            <h2>Última atualização</h2>
                            <p>{data.ultimaAtualizacao}</p>
                        </div>

                        <div>
                            <h2>Aprovada por</h2>
                            <p>{data.aprovadoPor}</p>
                        </div>

                    </div>

                    <div className="medicamentos-container">
                        <div className={`medicamentos-header ${data.medicamentos.length > 3 ? "com-scroll" : ""}`}>
                            <h2>Medicamentos da Fita</h2>
                        </div>
                        <div className="medicamentos-lista">
                            {data.medicamentos.length > 0 ? (
                                data.medicamentos.map((medicamento, index) => (
                                    <div
                                        key={index}
                                        className="medicamento-item"
                                    ><div
                                    key={index}
                                    className="medicamento-item-content"
                                >
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
                                        {index !== data.medicamentos.length - 1 && <hr />}
                                    </div>
                                ))
                            ) : (
                                <p className="sem-medicamentos">Nenhum medicamento disponível.</p>
                            )}
                        </div>
                    </div>

                </div></div>
        </div>
    );
}

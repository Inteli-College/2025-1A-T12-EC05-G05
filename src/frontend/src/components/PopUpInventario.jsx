import React, { useState } from "react";
import "../styles/PopUpInventario.css"; // Importando a folha de estilos adequada

export default function PopUpInventario({ data, closePopUp }) {
    const [medicamento, setMedicamento] = useState("");
    const [lote, setLote] = useState("");
    const [validade, setValidade] = useState("");
    const [quantidade, setQuantidade] = useState("");

    const { id } = data || {};

    const [posicoes, setPosicoes] = useState({
        p1: "",
        p2: "",
        p3: "",
        p4: "",
        j1: "",
        j2: "",
        j3: "",
        j4: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPosicoes({ ...posicoes, [name]: value });
    };

    return (
        <div className="popup-container">
            <div className="popup-content">
                {/* Cabeçalho do Popup */}
                <div className="popup-header">
                    <div className="popup-header-content">
                        <h1 className="popup-title">Bin {id || "X"}</h1>
                    </div>
                    <button className="close-btn" onClick={closePopUp}>&times;</button>
                </div>

                {/* Corpo do Popup */}
                <div className="popup-body">
                    <div className="row">
                        <div className="column">
                            <h2>Informações</h2>
                            <div className="form-group-info">
                                <label htmlFor="medicamento">Medicamento:</label>
                                <input
                                    type="text"
                                    id="medicamento"
                                    name="medicamento"
                                    value={medicamento}
                                    onChange={(e) => setMedicamento(e.target.value)}
                                />
                            </div>
                            <div className="form-group-info">
                                <label htmlFor="lote">Lote:</label>
                                <input
                                    type="text"
                                    id="lote"
                                    name="lote"
                                    value={lote}
                                    onChange={(e) => setLote(e.target.value)}
                                />
                            </div>
                            <div className="form-group-info">
                                <label htmlFor="validade">Validade:</label>
                                <input
                                    type="date"
                                    id="validade"
                                    name="validade"
                                    value={validade}
                                    onChange={(e) => setValidade(e.target.value)}
                                />
                            </div>
                            <div className="form-group-info">
                                <label htmlFor="quantidade">Quantidade:</label>
                                <input
                                    type="number"
                                    id="quantidade"
                                    name="quantidade"
                                    value={quantidade}
                                    onChange={(e) => setQuantidade(e.target.value)}
                                />
                            </div>
                            <div className="button-container">
                                <button className="salvar-btn">Salvar Bin</button>
                            </div>
                        </div>

                        {["Posições 1", "Posições 2", "Posições 3"].map((title, index) => (
                            <div key={index} className="column">
                                <h2>{title}</h2>
                                {["x", "y", "z", "r", "j1", "j2", "j3", "j4"].map((pos, idx) => (
                                    <div key={idx} className="form-group">
                                        <label htmlFor={`${title}-${pos}`}>{pos}:</label>
                                        <input
                                            type="text"
                                            id={`${title}-${pos}`}  // Torna o id único
                                            name={`${title}-${pos}`}  // Torna o nome único
                                            value={posicoes[`${title}-${pos}`] || ""}  // Acessa o valor específico da posição
                                            onChange={handleChange}
                                        />
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

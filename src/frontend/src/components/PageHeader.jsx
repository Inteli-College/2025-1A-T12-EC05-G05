import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/PageHeader.css";
import lupa from "../assets/icones/lupa.svg";
import seta from "../assets/icones/seta-voltar.svg";

export default function PageHeader({ title, isSingleFita = false }) {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const handleChange = (event) => {
        setQuery(event.target.value);
    };

    const handleBack = () => {
        navigate("/tela-medicamentos");
    };

    return (
        <div className="header">
            <div className="title-container">
                {isSingleFita && (
                    <button className="back-button" onClick={handleBack}>
                        <img src={seta} alt="Voltar" className="back-icon" />
                    </button>
                )}
                <h1 id="title">{title}</h1>
            </div>
            <div className="search-container">
                <img src={lupa} className="search-icon" alt="Buscar" />
                <input 
                    type="text"
                    className="search-input"
                    value={query}
                    onChange={handleChange}
                />
            </div>
        </div>
    );
}

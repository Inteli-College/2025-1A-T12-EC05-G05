import React, { useState } from "react";
import "../styles/Filter.css";
import { FaFilter } from "react-icons/fa";
import remove from "../assets/icones/remove.svg";
import checkIcon from "../assets/icones/check.svg"; // Supondo que você tenha o ícone de check

export default function Filter() {
    const [filters, setFilters] = useState([]);
    const [showMenu, setShowMenu] = useState(false);
    const availableFilters = ["Ações do robô", "Medicamentos", "Usuário", "Fitas de medicamento"];

    const handleToggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const handleToggleFilter = (filter) => {
        if (filters.includes(filter)) {
            setFilters(filters.filter((f) => f !== filter));
        } else {
            setFilters((prevFilters) => [...prevFilters, filter]);
        }
    };

    const handleRemoveFilter = (filter) => {
        setFilters(filters.filter((f) => f !== filter));
    };

    return (
        <div className="filter-container">
            <div className={`filter-header ${showMenu ? 'open' : ''}`}>
                <button className="filter-button" onClick={handleToggleMenu}>
                    <div className="filter-icon">
                        <FaFilter />
                    </div>
                    <span>Filtrar histórico</span>
                </button>
                <div className="selected-filters">
                    {filters.map((filter, index) => (
                        <div key={index} className="filter-tag">
                            {filter}
                            <img
                                src={remove}
                                alt="Remover filtro"
                                className="remove"
                                onClick={() => handleRemoveFilter(filter)}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {showMenu && (
                <div className="filter-menu">
                    {availableFilters.map((filter, index) => (
                        <div
                            key={index}
                            className="filter-option"
                            onClick={() => handleToggleFilter(filter)}
                        >
                            <span>{filter}</span>
                            {filters.includes(filter) && <img src={checkIcon} alt="Selecionado" className="check-icon" />}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

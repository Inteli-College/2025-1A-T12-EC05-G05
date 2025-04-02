import React, { useState } from "react";
import "../styles/Filter.css";
import { FaFilter } from "react-icons/fa";
import remove from "../assets/icones/remove.svg";
import checkIcon from "../assets/icones/check.svg";

export default function Filter({ onFilterChange }) {
    const [showMenu, setShowMenu] = useState(false);
    const availableFilters = ["Ações do Robô", "Medicamentos", "Ações do Usuário", "Fitas de Medicamento"];
    const [filters, setFilters] = useState([]);

    const handleToggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const handleToggleFilter = (filter) => {
        const newFilterValue = filters.includes(filter) ? "" : filter; // Toggle filter value
        setFilters((prevFilters) => {
            const updatedFilters = newFilterValue ? [...prevFilters, newFilterValue] : prevFilters.filter(f => f !== filter);
            onFilterChange(updatedFilters); // Pass the updated filters to parent
            return updatedFilters;
        });
    };

    const handleRemoveFilter = (filter) => {
        setFilters(filters.filter(f => f !== filter));
        onFilterChange(filters.filter(f => f !== filter)); // Update filters in parent
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

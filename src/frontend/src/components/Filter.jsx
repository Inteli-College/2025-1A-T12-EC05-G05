import React, { useState, forwardRef, useEffect, useRef } from "react";
import "../styles/Filter.css";
import { FaFilter } from "react-icons/fa";
import remove from "../assets/icones/remove.svg";
import checkIcon from "../assets/icones/check.svg";

const Filter = forwardRef(({ onFilterChange }, ref) => {
    const [showMenu, setShowMenu] = useState(false);
    const availableFilters = ["Ações do Robô", "Medicamentos", "Ações do Usuário", "Fitas de Medicamento"];
    const [filters, setFilters] = useState([]);
    const filterMenuRef = useRef(null);

    const handleToggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const handleToggleFilter = (filter) => {
        const newFilterValue = filters.includes(filter) ? "" : filter;
        setFilters((prevFilters) => {
            const updatedFilters = newFilterValue ? [...prevFilters, newFilterValue] : prevFilters.filter(f => f !== filter);
            onFilterChange(updatedFilters);
            return updatedFilters;
        });
        setShowMenu(false);
    };

    const handleRemoveFilter = (filter) => {
        setFilters(filters.filter(f => f !== filter));
        onFilterChange(filters.filter(f => f !== filter));
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target) && filterMenuRef.current && !filterMenuRef.current.contains(event.target)) {
                setShowMenu(false);
            }
        };
        
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [ref, filterMenuRef]);

    return (
        <div className="filter-container" ref={ref}>
            <div className={`filter-header ${showMenu ? 'open' : ''}`} onClick={handleToggleMenu}>
                <button className="filter-button">
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
                <div className="filter-menu" ref={filterMenuRef}>
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
});

export default Filter;

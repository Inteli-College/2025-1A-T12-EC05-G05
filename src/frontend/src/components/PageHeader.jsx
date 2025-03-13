import React, { useState } from "react";
import "../styles/PageHeader.css";
import lupa from "../assets/icones/lupa.svg";

export default function PageHeader({ title }) {
    const [query, setQuery] = useState("");

    const handleChange = (event) => {
        setQuery(event.target.value);
    };

    return (
        <div className="header">
            <h1>{title}</h1>
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

import React, { useState } from "react";
import "../styles/Search.css";
import lupa from "../assets/icones/lupa.svg";

export default function SearchBar() {
    const [query, setQuery] = useState("");

    const handleChange = (event) => {
        setQuery(event.target.value);
    };

    return (
        <div className="search-container">
            <img src={lupa} className="search-icon"/>
            <input 
                type="text"
                className="search-input"
                value={query}
                onChange={handleChange}
            />
        </div>
    );
}

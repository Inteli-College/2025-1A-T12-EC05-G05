import React from "react";
import "../styles/GridTable.css";
import searchIcon from "../assets/icones/search.svg";

export default function GridTable({ data, title }) {
    return (
        <div className="grid-table">
            <div className="grid-table-header">
                <div className="grid-table-cell grid-table-header-cell">Detalhes</div>
                <div className="grid-table-cell grid-table-header-cell">Tipo</div>
                <div className="grid-table-cell grid-table-header-cell">Status</div>
            </div>
            <div className="grid-table-content">
                {data.length === 0 ? (
                    <div className="no-results">
                        <img src={searchIcon} alt="Nenhum resultado" className="search-icon" />
                        <p>Nenhum resultado foi encontrado.</p>
                    </div>
                ) : (
                    data.map((item, index) => (
                        <div className="grid-table-row" key={index}>
                            <div className="grid-table-cell">
                                <h2>{item.nome}</h2>
                                <p>{item.descricao}</p>
                            </div>
                            <div className="grid-table-cell">{item.tipo}</div>
                            <div className="grid-table-cell">{item.status}</div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

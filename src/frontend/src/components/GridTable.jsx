import React from "react";
import "../styles/GridTable.css";

export default function GridTable({ data }) {
    return (
        <div className="grid-table">
            <div className="grid-table-header">
                <div className="grid-table-cell grid-table-header-cell">Detalhes</div>
                <div className="grid-table-cell grid-table-header-cell">Tipo</div>
                <div className="grid-table-cell grid-table-header-cell">Status</div>
            </div>
            <div className="grid-table-content">
                {data.map((item, index) => (
                    <div className="grid-table-row" key={index}>
                        <div className="grid-table-cell">
                            <h2>{item.nome}</h2>
                            <p>{item.descricao}</p>
                        </div>
                        <div className="grid-table-cell">{item.tipo}</div>
                        <div className="grid-table-cell">{item.status}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

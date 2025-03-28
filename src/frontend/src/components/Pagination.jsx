import React from "react";
import "../styles/Pagination.css";

const Pagination = ({ totalItems, itemsPerPage, currentPage, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    const pageRange = 3;

    let visiblePages = [];

    if (pageNumbers.length <= pageRange) {
        visiblePages = pageNumbers;
    } else {
        if (currentPage <= Math.floor(pageRange / 2)) {
            visiblePages = pageNumbers.slice(0, pageRange);
        } else if (currentPage > pageNumbers.length - Math.floor(pageRange / 2)) {
            visiblePages = pageNumbers.slice(pageNumbers.length - pageRange, pageNumbers.length);
        } else {
            visiblePages = pageNumbers.slice(
                currentPage - Math.floor(pageRange / 2) - 1,
                currentPage + Math.floor(pageRange / 2)
            );
        }
    }

    return (
        <div className="pagination-container">
            <div className="pagination">
                <button 
                    className="nav-button" 
                    onClick={() => paginate(currentPage - 1)} 
                    disabled={currentPage === 1}
                >
                    &lt; Anterior
                </button>

                {currentPage > 2 && pageNumbers[0] !== currentPage && (
                    <button onClick={() => paginate(1)}>1</button>
                )}

                {currentPage > 3 && <span className="ellipsis">...</span>}

                {visiblePages.map((number) => (
                    <button
                        key={number}
                        onClick={() => paginate(number)}
                        className={number === currentPage ? "active" : ""}
                    >
                        {number}
                    </button>
                ))}

                {pageNumbers.length - currentPage > 2 && <span className="ellipsis">...</span>}

                {pageNumbers.length - currentPage > 1 && (
                    <button onClick={() => paginate(pageNumbers.length)}>{pageNumbers.length}</button>
                )}

                <button 
                    className="nav-button" 
                    onClick={() => paginate(currentPage + 1)} 
                    disabled={currentPage === pageNumbers.length}
                >
                    Próximo &gt;
                </button>
            </div>

            <div className="page-info">
                Mostrando {(currentPage - 1) * itemsPerPage + 1} a{" "}
                {Math.min(currentPage * itemsPerPage, totalItems)} de {totalItems} resultados
            </div>
        </div>
    );
};

export default Pagination;

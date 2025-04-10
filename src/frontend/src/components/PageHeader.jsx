import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/PageHeader.css";
import seta from "../assets/icones/seta-voltar.svg";

export default function PageHeader({ title, isSingleFita = false }) {
    const navigate = useNavigate();
    const location = useLocation();

    const handleBack = () => {
        const pathSegments = location.pathname.split('/');
        const parentPath = pathSegments.slice(0, pathSegments.length - 1).join('/');
        
        navigate(parentPath);
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
         
        </div>
    );
}

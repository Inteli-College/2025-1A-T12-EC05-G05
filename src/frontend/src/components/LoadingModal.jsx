import React from 'react';
import "../styles/LoadingModal.css";

export default function LoadingModal({ isLoading }) {
    if (!isLoading) return null;
    
    return (
        <div className="loading-modal">
            <div className="loader"></div>
        </div>
    );
};


import React from 'react';
import '../styles/Modal.css';
import errorIcon from '../assets/icones/error-icon.svg';

export default function FairModal({ message, onClose }) {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>
                <div className="modal-body">
                    <img src={errorIcon} alt="Erro" className="modal-icon" />
                    <h4>FALHA</h4>
                    <p>{message}</p>
                </div>
            </div>
        </div>
    );
}

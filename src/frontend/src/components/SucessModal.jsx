import React from 'react';
import '../styles/Modal.css';
import sucessIcon from '../assets/icones/sucess-icon.svg';

export default function SucessModal({ message, onClose }) {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>
                <div className="modal-body">
                    <img src={sucessIcon} alt="Erro" className="modal-icon" />
                    <h4>SUCESSO</h4>
                    <p>{message}</p>
                </div>
            </div>
        </div>
    );
}

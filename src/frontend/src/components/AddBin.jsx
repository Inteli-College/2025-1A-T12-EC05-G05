import React from 'react';
import '../styles/AddBin.css';
import addIcon from '../assets/icones/addbin-icon.svg';

export default function AddBin() {
    return (

            <div className="add-bin-content">
                
                <div className="add-bin-body">
                  <img src={addIcon} alt="Adicionar Bin" className="add-bin-icon" />
                </div>
            </div>

    );
}

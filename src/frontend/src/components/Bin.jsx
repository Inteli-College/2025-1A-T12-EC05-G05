import React from 'react';
import '../styles/Bin.css';

export default function Bin({medicamento, validade, lote, quantidade}) {
    return (

            <div className="bin-content">
                
                <div className="bin-body">
                    <h4>{medicamento}</h4>
                    <p>Val: {validade}</p>
                    <p>Lote: {lote}</p>
                    <p>Qnt: {quantidade}</p>
                </div>
            </div>

    );
}

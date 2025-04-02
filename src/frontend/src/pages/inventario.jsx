import React, { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";
import Bin from "../components/Bin";
import "../styles/Inventario.css";



export default function Inventario() {
  const [loading, setLoading] = useState(true);
 
    return (
        <div className="inventario">
         
            <div className="conteudo">
                <PageHeader title="Inventário" />
                <div className="historico-content">
                  <Bin 
                    medicamento="Paracetamol"
                    validade="2024-12-31"
                    lote="123456"
                    quantidade="10"
                  />
                </div>
            
                
            </div>
        </div>
    );
}

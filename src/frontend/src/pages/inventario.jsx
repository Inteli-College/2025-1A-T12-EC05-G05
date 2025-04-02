import React, { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";
import Bin from "../components/Bin";
import "../styles/Inventario.css";
import AddBin from "../components/AddBin";



export default function Inventario() {
  const [loading, setLoading] = useState(true);
 
    return (
        <div className="inventario">
         
            <div className="conteudo">
                <PageHeader title="Inventário" />
                <div className="inventario-content">
                  <Bin 
                    medicamento="Ibuprofeno 400mg"
                    validade="2025-12-31"
                    lote="123456"
                    quantidade="10"
                  />
                  <Bin 
                    medicamento="Dorflex 300mg"
                    validade="2025-12-31"
                    lote="123456"
                    quantidade="10"
                  />
                  <Bin 
                    medicamento="Buscopan 10mg"
                    validade="2025-12-31"
                    lote="123456"
                    quantidade="10"
                  />
                  <Bin 
                    medicamento="Dipirona 1g"
                    validade="2025-12-31"
                    lote="123456"
                    quantidade="10"
                  />
                  <Bin 
                    medicamento="Paracetamol 500mg"
                    validade="2025-12-31"
                    lote="123456"
                    quantidade="10"
                  />
                  <AddBin />
                  
                  
                </div>
            
                
            </div>
        </div>
    );
}

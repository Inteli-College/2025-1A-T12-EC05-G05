import React, { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";
import Bin from "../components/Bin";
import "../styles/Inventario.css";
import AddBin from "../components/AddBin";
import LoadingModal from "../components/LoadingModal";

export default function Inventario() {
  const [loading, setLoading] = useState(true);

  // Simulação de carregamento
  useEffect(() => {
    const fetchData = async () => {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    };

    fetchData();
  }, []);

  return (
    <div className="inventario">
      <div className="conteudo">
        <PageHeader title="Inventário" />
        
        {loading ? (
          <LoadingModal />
        ) : (
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
        )}
      </div>
    </div>
  );
}

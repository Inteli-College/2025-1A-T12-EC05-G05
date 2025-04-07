import React, { useState } from "react";
import PageHeader from "../components/PageHeader";
import "../styles/Inventario.css";
import PopUpInventario from '../components/PopUpInventario';



export default function Inventario() {
    const [showPopUp, setShowPopUp] = useState(false);

    const togglePopUp = () => setShowPopUp(!showPopUp);
    return (
        <div className="inventario">
         
            <div className="conteudo">
                <PageHeader title="Inventário" />
                <p>⚠️ Ops! Esta página ainda está em construção.</p>
            
                
            </div>
            <div>
              <button onClick={togglePopUp}>Abrir Inventário</button>

              {showPopUp && <PopUpInventario closePopUp={togglePopUp} />}
          </div>
        </div>
    );
}

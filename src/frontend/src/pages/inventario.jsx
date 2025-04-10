import React, { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";
import Bin from "../components/Bin";
import "../styles/Inventario.css";
import AddBin from "../components/AddBin";
import PopUpInventario from "../components/PopUpInventario";
import LoadingModal from "../components/LoadingModal";
import axios from "axios";

export default function Inventario() {
  const [loading, setLoading] = useState(true);
  const [showPopUp, setShowPopUp] = useState(false);
  const [bins, setBins] = useState([]);
  const [currentBin, setCurrentBin] = useState(null);

  const closePopUp = () => {
    setShowPopUp(false);
    setCurrentBin(null);
  };

  const openBinPopup = (bin) => {
    setCurrentBin(bin);
    setShowPopUp(true);
  };

  const openNewBinPopup = () => {
    setCurrentBin(null);
    setShowPopUp(true);
  };

  const saveBin = async (binData) => {
    try {
      setLoading(true);

      if (binData.id) {
        await axios.patch(`http://localhost:5000/api/inventory/bins/${binData.id}`, binData);
        setBins(bins.map(bin => bin.id === binData.id ? binData : bin));
      } 
      else {
        const response = await axios.post("http://localhost:5000/api/inventory/bins", binData);
        setBins([...bins, response.data]);
      }

      closePopUp();
    } catch (error) {
      console.error("Error saving bin:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/inventory/bins");
        setBins(response.data);
      } catch (error) {
        console.error("Error fetching bins:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="inventario">
      <div className="conteudo">
        {loading ? (
          <LoadingModal />
        ) : (
          <>
            <PageHeader title="Inventário" />
            <div className="inventario-content">
              {bins.map((bin) => (
                <Bin
                  key={bin.id}
                  medicamento={bin.medicamento}
                  validade={bin.validade}
                  lote={bin.lote}
                  quantidade={bin.quantidade}
                  onClick={() => openBinPopup(bin)}
                />
              ))}
              <AddBin onClick={openNewBinPopup} />
            </div>
          </>
        )}
        {showPopUp && (
          <PopUpInventario 
            data={currentBin} 
            closePopUp={closePopUp} 
            onSave={saveBin}
          />
        )}
      </div>
    </div>
  );
}

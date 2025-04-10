import React, { useState, useEffect } from "react";
import "../styles/PopUpInventario.css";

export default function PopUpInventario({ data, closePopUp, onSave }) {
  const [medicamento, setMedicamento] = useState("");
  const [lote, setLote] = useState("");
  const [validade, setValidade] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [posicoes, setPosicoes] = useState([
    { x: "", y: "", z: "", r: "", j1: "", j2: "", j3: "", j4: "", grip: false, suction: false, move: "" },
    { x: "", y: "", z: "", r: "", j1: "", j2: "", j3: "", j4: "", grip: false, suction: false, move: "" },
    { x: "", y: "", z: "", r: "", j1: "", j2: "", j3: "", j4: "", grip: false, suction: false, move: "" },
  ]);

  useEffect(() => {
    if (data) {
      setMedicamento(data.medicamento || "");
      setLote(data.lote || "");
      setValidade(data.validade || "");
      setQuantidade(data.quantidade || "");
      
      if (data.posicoes && Array.isArray(data.posicoes)) {
        const posicoesArray = data.posicoes.slice(0, 3).map((pos) => ({
          x: pos.x || "",
          y: pos.y || "",
          z: pos.z || "",
          r: pos.r || "",
          j1: pos.j1 || "",
          j2: pos.j2 || "",
          j3: pos.j3 || "",
          j4: pos.j4 || "",
          grip: pos.grip || false,
          suction: pos.suction || false,
          move: pos.move || "",
        }));
        setPosicoes(posicoesArray);
      }
    } else {
      setMedicamento("");
      setLote("");
      setValidade("");
      setQuantidade("");
      setPosicoes([
        { x: "", y: "", z: "", r: "", j1: "", j2: "", j3: "", j4: "", grip: false, suction: false, move: "" },
        { x: "", y: "", z: "", r: "", j1: "", j2: "", j3: "", j4: "", grip: false, suction: false, move: "" },
        { x: "", y: "", z: "", r: "", j1: "", j2: "", j3: "", j4: "", grip: false, suction: false, move: "" },
      ]);
    }
  }, [data]);

  const handlePositionChange = (index, field, value) => {
    const updatedPosicoes = [...posicoes];
    if (field === "grip" || field === "suction") {
      updatedPosicoes[index] = { ...updatedPosicoes[index], [field]: value === "true" };
    } else {
      updatedPosicoes[index] = { ...updatedPosicoes[index], [field]: value };
    }
    setPosicoes(updatedPosicoes);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const binData = {
      medicamento,
      lote,
      validade,
      quantidade,
      posicoes: posicoes.map((pos) => ({
        x: parseFloat(pos.x),
        y: parseFloat(pos.y),
        z: parseFloat(pos.z),
        r: parseFloat(pos.r),
        j1: parseFloat(pos.j1),
        j2: parseFloat(pos.j2),
        j3: parseFloat(pos.j3),
        j4: parseFloat(pos.j4),
        grip: pos.grip,
        suction: pos.suction,
        move: pos.move
      }))
    };

    try {
      const response = await fetch(`http://localhost:5000/api/inventory/bins`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(binData),
      });

      if (response.ok) {
        const newBin = await response.json();
        onSave(newBin);
        closePopUp();
      } else {
        const errorData = await response.json();
        alert(`Erro ao salvar bin: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Erro ao salvar bin:", error);
      alert("Erro ao salvar bin. Tente novamente mais tarde.");
    }
  };

  return (
    <div className="popup-container">
      <div className="popup-content">
        <div className="popup-header">
          <h1 className="popup-title">{data ? `Editar Bin ${data.id}` : "Novo Bin"}</h1>
          <button className="close-btn" onClick={closePopUp}>&times;</button>
        </div>

        <div className="popup-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="column">
                <h2>Informações</h2>
                <div className="form-group-info">
                  <label htmlFor="medicamento">Medicamento:</label>
                  <input
                    type="text"
                    id="medicamento"
                    name="medicamento"
                    value={medicamento}
                    onChange={(e) => setMedicamento(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group-info">
                  <label htmlFor="lote">Lote:</label>
                  <input
                    type="text"
                    id="lote"
                    name="lote"
                    value={lote}
                    onChange={(e) => setLote(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group-info">
                  <label htmlFor="validade">Validade:</label>
                  <input
                    type="date"
                    id="validade"
                    name="validade"
                    value={validade}
                    onChange={(e) => setValidade(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group-info">
                  <label htmlFor="quantidade">Quantidade:</label>
                  <input
                    type="number"
                    id="quantidade"
                    name="quantidade"
                    value={quantidade}
                    onChange={(e) => setQuantidade(e.target.value)}
                    required
                  />
                </div>
                <div className="button-container">
                  <button type="submit" className="salvar-btn">Salvar Bin</button>
                </div>
              </div>

              {posicoes.map((position, index) => (
                <div key={index} className="column">
                  <h2>{`Posições ${index + 1}`}</h2>
                  {["x", "y", "z", "r", "j1", "j2", "j3", "j4"].map((pos, idx) => (
                    <div key={idx} className="form-group">
                      <label htmlFor={`pos-${index}-${pos}`}>{pos}:</label>
                      <input
                        type="number"
                        id={`pos-${index}-${pos}`}
                        name={`pos-${index}-${pos}`}
                        value={position[pos]}
                        onChange={(e) => handlePositionChange(index, pos, e.target.value)}
                      />
                    </div>
                  ))}
                  <div className="form-group">
                    <label htmlFor={`pos-${index}-grip`}>Grip:</label>
                    <select
                      id={`pos-${index}-grip`}
                      name={`pos-${index}-grip`}
                      value={position.grip.toString()}
                      onChange={(e) => handlePositionChange(index, "grip", e.target.value)}
                    >
                      <option value="true">True</option>
                      <option value="false">False</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor={`pos-${index}-suction`}>Suction:</label>
                    <select
                      id={`pos-${index}-suction`}
                      name={`pos-${index}-suction`}
                      value={position.suction.toString()}
                      onChange={(e) => handlePositionChange(index, "suction", e.target.value)}
                    >
                      <option value="true">True</option>
                      <option value="false">False</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor={`pos-${index}-move`}>Move:</label>
                    <select
                      id={`pos-${index}-move`}
                      name={`pos-${index}-move`}
                      value={position.move}
                      onChange={(e) => handlePositionChange(index, "move", e.target.value)}
                    >
                      <option value="move_j">move_j</option>
                      <option value="move_l">move_l</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

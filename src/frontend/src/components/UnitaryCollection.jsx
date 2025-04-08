import React, { useState, useEffect, useRef } from "react";
import "../styles/UnitaryCollection.css";
import adicionar from "../assets/icones/adicionar.svg";
import pillIcon from "../assets/icones/medicamento.svg";
import nurseIcon from "../assets/icones/enfermeira.svg";
import SucessModal from "../components/SucessModal";

const UnitaryCollection = () => {
    const [showForm, setShowForm] = useState(false);
    const [medicationName, setMedicationName] = useState("");
    const [nurseName, setNurseName] = useState("");
    const [isValidMedication, setIsValidMedication] = useState(true);
    const [isValidNurse, setIsValidNurse] = useState(true);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const formRef = useRef(null);

    const medicationToBin = {
        "Ibuprofeno 400mg": "1",
        "Dorflex 300mg": "2",
        "Buscopan 10mg": "3",
        "Dipirona 1g": "4",
        "Paracetamol 500mg": "5"
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const isMedicationValid = medicationName in medicationToBin;
        const isNurseValid = nurseName.trim() !== "";

        setIsValidMedication(isMedicationValid);
        setIsValidNurse(isNurseValid);

        if (!isMedicationValid || !isNurseValid) {
            return;
        }

        console.log("Form submitted:", { medicationName, nurseName });
        setShowSuccessModal(true);
    };

    const handleAutomatedCollection = async (e) => {
        e.preventDefault();

        const isMedicationValid = medicationName in medicationToBin;
        const isNurseValid = nurseName.trim() !== "";

        setIsValidMedication(isMedicationValid);
        setIsValidNurse(isNurseValid);

        if (!isMedicationValid || !isNurseValid) {
            return;
        }

        const bin = medicationToBin[medicationName];

        try {
            const response = await fetch("http://localhost:5000/robot/collect", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ bins: [bin] })
            });

            if (!response.ok) throw new Error("Erro na coleta automatizada");

            console.log("Coleta automatizada realizada com sucesso");
            setShowSuccessModal(true);
        } catch (error) {
            console.error("Erro ao coletar automaticamente:", error);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (formRef.current && !formRef.current.contains(event.target)) {
                setShowForm(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="unitary-collection-container">
            <div className={`unitary-wrapper ${showForm ? 'form-active' : ''}`}>
                <div className="unitary-button" onClick={() => setShowForm(!showForm)}>
                    <div className={`unitary-tooltip ${showForm ? 'active' : ''}`}>Registrar coleta unitária</div>
                    {!showForm && <img src={adicionar} alt="Adicionar" className="unitary-icon" />}
                </div>

                <div ref={formRef} className={`unitary-form ${showForm ? 'active' : ''}`}>
                    <form onSubmit={handleFormSubmit}>
                        <div className="form-group">
                            <label>Nome do medicamento <span>*</span></label>
                            <div className="input-wrapper">
                                <div className="input-icon">
                                    <img src={pillIcon} alt="Medicamento" />
                                </div>
                                <input
                                    list="medications"
                                    type="text"
                                    value={medicationName}
                                    onChange={(e) => setMedicationName(e.target.value)}
                                    placeholder="Paracetamol 500mg"
                                    required
                                />
                                <datalist id="medications">
                                    {Object.keys(medicationToBin).map((med, index) => (
                                        <option key={index} value={med} />
                                    ))}
                                </datalist>
                            </div>
                            {!isValidMedication && (
                                <span className="error-text">Por favor, escolha um medicamento válido da lista.</span>
                            )}
                        </div>

                        <div className="form-group">
                            <label>Enfermeira responsável <span>*</span></label>
                            <div className="input-wrapper">
                                <div className="input-icon">
                                    <img src={nurseIcon} alt="Enfermeira" />
                                </div>
                                <input
                                    type="text"
                                    value={nurseName}
                                    onChange={(e) => setNurseName(e.target.value)}
                                    placeholder="Nome da enfermeira"
                                    required
                                />
                            </div>
                            {!isValidNurse && (
                                <span className="error-text">Por favor, preencha o nome da enfermeira.</span>
                            )}
                        </div>

                        <div className="unitary-button-group">
                            <button type="submit" className="submit-btn">
                                Fazer Coleta Manual
                            </button>
                            <button className="submit-btn" onClick={handleAutomatedCollection}>
                                Fazer Coleta Automatizada
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {showSuccessModal && (
                <SucessModal
                    message="Registro salvo com sucesso!"
                    onClose={() => setShowSuccessModal(false)}
                />
            )}
        </div>
    );
};

export default UnitaryCollection;

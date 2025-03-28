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
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const formRef = useRef(null);

    const medications = [
        "Ibuprofeno 500mg",
        "Dipirona 1g",
        "Paracetamol 500mg",
        "Amoxicilina 500mg",
        "Azitromicina 500mg"
    ];

    const handleFormSubmit = (e) => {
        e.preventDefault();

        if (!medications.includes(medicationName)) {
            setIsValidMedication(false);
            return;
        }

        console.log("Form submitted:", { medicationName, nurseName });
        setIsValidMedication(true);

        setShowSuccessModal(true);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (formRef.current && !formRef.current.contains(event.target)) {
                setShowForm(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
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
                                    {medications.map((med, index) => (
                                        <option key={index} value={med} />
                                    ))}
                                </datalist>
                            </div>
                            {!isValidMedication && <span className="error-text">Por favor, escolha um medicamento válido da lista.</span>}
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
                        </div>

                        <button type="submit" className="submit-btn">
                            Salvar registro
                        </button>
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

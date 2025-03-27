import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Table from "../components/Table";
import PageHeader from "../components/PageHeader";
import "../styles/fitaMedicamentos.css";
import UnitaryCollection from "../components/UnitaryCollection";
import PopUpFitas from "../components/PopUpFitas";

const dataAFazer = [
    { nome: "Fita 5", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur." },
    { nome: "Fita 4", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur." },
    { nome: "Fita 3", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur." },
    { nome: "Fita 2", descricao: "Este não será mostrado porque maxItems é 3." },
];

const dataEmProgresso = [
    { nome: "Fita 3", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur.", separando: true },
    { nome: "Fita 2", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur." },
    { nome: "Fita 1", descricao: "Este não será mostrado porque maxItems é 2." },
];

const dataProntas = [
    { nome: "Fita 2", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur." },
    { nome: "Fita 1", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur." },
];

export default function FitaMedicamentos() {
    const location = useLocation();
    const isSingleFita = location.pathname !== "/tela-medicamentos";
    const [selectedFita, setSelectedFita] = useState(null);

    const openPopUp = (fitaData) => {
        setSelectedFita(fitaData); 
    };

    const closePopUp = () => {
        setSelectedFita(null);
    };

    return (
        <div className="fitaMedicamentos">
            <UnitaryCollection />
            {selectedFita && <PopUpFitas data={selectedFita} closePopUp={closePopUp} />} 
            <div className="conteudo">
                <PageHeader title="Fitas de medicamentos" isSingleFita={isSingleFita} />
                {location.pathname === "/tela-medicamentos" ? (
                    <>
                        <Table 
                            title="A fazer" 
                            data={dataAFazer} 
                            maxItems={2} 
                            route="/tela-medicamentos/a-fazer" 
                            onItemClick={openPopUp}
                        />
                        <Table 
                            title="Em progresso" 
                            data={dataEmProgresso} 
                            maxItems={1} 
                            route="/tela-medicamentos/em-progresso" 
                            onItemClick={openPopUp}
                        />
                        <Table 
                            title="Prontas" 
                            data={dataProntas} 
                            maxItems={2} 
                            route="/tela-medicamentos/prontas" 
                            onItemClick={openPopUp}
                        />
                    </>
                ) : (
                    <Outlet />
                )}
            </div>
        </div>
    );
}
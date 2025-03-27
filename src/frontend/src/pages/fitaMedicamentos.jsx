import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Table from "../components/Table";
import PageHeader from "../components/PageHeader";
// import LoadingModal from "../components/LoadingModal";
import "../styles/fitaMedicamentos.css";
import PopUpFitas from "../components/PopUpFitas";

const dataAFazer = [
    { nome: "Fita 5", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur." },
    { nome: "Fita 4", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur." },
    { nome: "Fita 3", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur." },
    { nome: "Fita 2", descricao: "Este não será mostrado porque maxItems é 3." },
];

const dataPopUp = {
    nome: 'Fita 1',
    estado: 'Pronta',
    paciente: 'João da Silva',
    leito: 'Leito 07',
    ultimaAtualizacao: '26/02/2025 - 18:34',
    aprovadoPor: 'Maria Souza - 25/02/2025 - 08:15',
    medicamentos: [
        { nome: 'Paracetamol 500mg', tipo: 'Comprimido', validade: '12/2026', status: 'Em estoque', quantidade: 1 },
        { nome: 'Amoxicilina 500mg', tipo: 'Cápsula', validade: '08/2025', status: 'Em falta', quantidade: 2 },
        { nome: 'Enoxaparina 40mg', tipo: 'Seringa', validade: '08/2025', status: 'Em estoque', quantidade: 1 },
        { nome: 'Enoxaparina 40mg', tipo: 'Seringa', validade: '08/2025', status: 'Em estoque', quantidade: 1 }
    ]
}

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
    const isSingleFita = location.pathname !== "/tela-medicamentos"

    return (
        <div className="fitaMedicamentos">
            <PopUpFitas data={dataPopUp} />
            {/* <LoadingModal isLoading={true} /> */}
            <div className="conteudo">
                <PageHeader title="Fitas de medicamentos" isSingleFita={isSingleFita} />
                {location.pathname === "/tela-medicamentos" ? (
                    <>
                        <Table title="A fazer" data={dataAFazer} maxItems={2} route="/tela-medicamentos/a-fazer" />
                        <Table title="Em progresso" data={dataEmProgresso} maxItems={1} route="/tela-medicamentos/em-progresso" />
                        <Table title="Prontas" data={dataProntas} maxItems={2} route="/tela-medicamentos/prontas" />
                    </>
                ) : (
                    <Outlet />
                )}
            </div>
        </div>
    );
}

import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Table from "../components/Table";
import PageHeader from "../components/PageHeader";
import LoadingModal from "../components/LoadingModal";
import "../styles/fitaMedicamentos.css";

const dataAFazer = [
    { id: 1, nome: "Fita 5", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur." },
    { id: 2, nome: "Fita 4", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur." },
    { id: 3, nome: "Fita 3", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur." },
    { id: 4, nome: "Fita 2", descricao: "Este não será mostrado porque maxItems é 3." },
];

const dataEmProgresso = [
    { id: 5, nome: "Fita 3", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur.", separando: true },
    { id: 6, nome: "Fita 2", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur." },
    { id: 7, nome: "Fita 1", descricao: "Este não será mostrado porque maxItems é 2." },
];

const dataProntas = [
    { id: 8, nome: "Fita 2", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur." },
    { id: 9, nome: "Fita 1", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur." },
];


export default function FitaMedicamentos() {
    const location = useLocation();
    const isSingleFita = location.pathname !== "/tela-medicamentos";

    return (
        <div className="fitaMedicamentos">
            <LoadingModal isLoading={!true} />
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

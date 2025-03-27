import React from "react";
import PageHeader from "../components/PageHeader";
import "../styles/Logs.css";
import GridTable from "../components/GridTable";
import Filter from "../components/Filter";

const dataLogs = [
    { nome: "Fita 2", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur.", tipo: "Fita de medicamento", status: "Esperando autorização" },
    { nome: "Fita 2", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur.", tipo: "Fita de medicamento", status: "Pronto para separação" },
    { nome: "Fita 2", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur.", tipo: "Fita de medicamento", status: "Em progresso" },
    { nome: "Fita 2", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur.", tipo: "Ações do Robô", status: "Separado" },
    { nome: "Fita 2", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur.", tipo: "Ações do Robô", status: "Em uso" },
    { nome: "Fita 2", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur.", tipo: "Medicamentos", status: "Cancelada" },
    { nome: "Fita 2", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur.", tipo: "Medicamentos", status: "Cancelada" },
];

export default function Logs() {

    return (
        <div className="logs">
            <div className="conteudo-logs">
                <PageHeader title="Histórico" />
                <Filter />
                <GridTable title="Logs" data={dataLogs} route="/logs" />
            </div>
        </div>
    );
}

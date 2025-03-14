import React from "react";
import Table from "../components/Table";
import PageHeader from "../components/PageHeader";

const dataAFazer = [
    { nome: "Fita 5", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur." },
    { nome: "Fita 4", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur." },
    { nome: "Fita 3", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur." },
    { nome: "Fita 2", descricao: "Este não será mostrado porque maxItems é 3." },
];

export default function AFazer() {
    return (
        <div className="fitaMedicamentos"> 
            <div className="conteudo">
                <PageHeader title="Fitas de medicamentos" />
                <Table title="A fazer" data={dataAFazer} />
            </div>
        </div>
    );
}

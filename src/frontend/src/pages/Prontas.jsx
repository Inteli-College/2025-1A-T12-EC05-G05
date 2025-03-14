import React from "react";
import Table from "../components/Table";
import PageHeader from "../components/PageHeader";

const dataProntas = [
    { nome: "Fita 2", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur." },
    { nome: "Fita 1", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur." },
];

export default function Prontas() {
    return (
        <div className="fitaMedicamentos"> 
            <div className="conteudo">
                <PageHeader title="Fitas de medicamentos" />
                <Table title="Prontas" data={dataProntas} />
            </div>
        </div>
    );
}

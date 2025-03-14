import React from "react";
import Table from "../components/Table";
import PageHeader from "../components/PageHeader";

const dataEmProgresso = [
    { nome: "Fita 3", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur.", separando: true },
    { nome: "Fita 2", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur." },
    { nome: "Fita 1", descricao: "Este não será mostrado porque maxItems é 2." },
];

export default function EmProgresso() {
    return (
        <div className="fitaMedicamentos"> 
            <div className="conteudo">
                <PageHeader title="Fitas de medicamentos" isSingleFita={true}/>
                <Table title="Em progresso" data={dataEmProgresso} />
            </div>
        </div>
    );
}

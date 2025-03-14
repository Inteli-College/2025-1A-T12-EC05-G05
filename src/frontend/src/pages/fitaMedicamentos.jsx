import React from "react";
import Table from "../components/Table";
import PageHeader from "../components/PageHeader";
import "../styles/fitaMedicamentos.css";

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
    return (
        <div className="fitaMedicamentos"> 
            <div className="conteudo">
                <PageHeader title="Fitas de medicamentos" />
                <Table title="A fazer" data={dataAFazer} maxItems={2} route="/a-fazer"/>
                <Table title="Em progresso" data={dataEmProgresso} maxItems={1} route="/em-progresso"/>
                <Table title="Prontas" data={dataProntas} maxItems={2} route="/prontas"/>
            </div>
        </div>
    );
}

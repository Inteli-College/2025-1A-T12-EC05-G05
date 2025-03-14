import React from "react";
import Table from "../components/Table";

const dataProntas = [
    { nome: "Fita 2", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur." },
    { nome: "Fita 1", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur." },
];

export default function Prontas() {
    return (
        <Table title="Prontas" data={dataProntas} route="/tela-medicamentos/prontas" />
    );
}

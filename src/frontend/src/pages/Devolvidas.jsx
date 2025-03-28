import React from "react";
import Table from "../components/Table";


const dataDevolvidas = [
   { nome: "Fita 3", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur."},
   { nome: "Fita 2", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur." },
   { nome: "Fita 1", descricao: "Este não será mostrado porque maxItems é 2." },
];


export default function Devolvidas() {
   return (
       <Table title="Devolvidas" data={dataDevolvidas} route="/devolucao/devolvidas" />
   );
}




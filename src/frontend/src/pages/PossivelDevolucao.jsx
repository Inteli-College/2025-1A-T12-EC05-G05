import React from "react";
import Table from "../components/Table";


const dataPossivelDevolucao = [
   { nome: "Fita 5", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur." },
   { nome: "Fita 4", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur." },
   { nome: "Fita 3", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur." },
   { nome: "Fita 2", descricao: "Este não será mostrado porque maxItems é 3." },
];


export default function PossivelDevolucao() {
   return (
       <Table title="Possíveis devoluções" data={dataPossivelDevolucao} route="/devolucao/possivel-devolucao" />
   );
}



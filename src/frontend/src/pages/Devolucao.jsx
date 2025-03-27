import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Table from "../components/Table";
import PageHeader from "../components/PageHeader";
import "../styles/Devolucao.css";

const dataPossivelDevolucao = [
  { nome: "Fita 5", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur." },
  { nome: "Fita 4", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur." },
  { nome: "Fita 3", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur." },
  { nome: "Fita 2", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur." },
];


const dataDevolvidas = [
  { nome: "Fita 4", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur." },
  { nome: "Fita 3", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur." },
  { nome: "Fita 2", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur." },
  { nome: "Fita 1", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur." },
];


export default function Devolucao() {
  const location = useLocation();
  const isSingleFita = location.pathname !== "/devolucao"


  return (
    <div className="Devolucao">
      <div className="conteudo">
        <PageHeader title="Devolução" isSingleFita={isSingleFita} />
        {location.pathname === "/devolucao" ? (
          <>
            <Table title="Possíveis devoluções" data={dataPossivelDevolucao} maxItems={4} route="/devolucao/possivel-devolucao" />
            <Table title="Devolvidas" data={dataDevolvidas} maxItems={4} route="/devolucao/devolvidas" />
          </>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
}








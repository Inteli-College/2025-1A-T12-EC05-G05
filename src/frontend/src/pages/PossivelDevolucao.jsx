import React, { useState } from "react";
import Table from "../components/Table";
import PageHeader from "../components/PageHeader";
import Pagination from "../components/Pagination";




const dataPossivelDevolucao = [
  { nome: "Fita 5", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur." },
  { nome: "Fita 4", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur." },
  { nome: "Fita 3", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur." },
  { nome: "Fita 2", descricao: "Este não será mostrado porque maxItems é 3." },
];




export default function PossivelDevolucao() {
  const [currentPage, setCurrentPage] = useState(1);
  const possivelDevolucaoPerPage = 8;
  const totalPossivelDevolucao = dataPossivelDevolucao.length;


  const indexOfLastPossivelDevolucao = currentPage * possivelDevolucaoPerPage;
  const indexOfFirstPossivelDevolucao = indexOfLastPossivelDevolucao - possivelDevolucaoPerPage;
  const currentPossivelDevolucao = dataPossivelDevolucao.slice(indexOfFirstPossivelDevolucao, indexOfLastPossivelDevolucao);


  const paginate = (pageNumber) => setCurrentPage(pageNumber);




  return (
      <div className="possivel-devolucao">
          <div className="conteudo-possivel-devolucao">
              <PageHeader title="PossivelDevolucao" />
              <Table title="PossivelDevolucao" data={currentPossivelDevolucao} route="/devolucao/possivel-devolucao" />
             
              <Pagination
                  totalItems={totalPossivelDevolucao}
                  itemsPerPage={possivelDevolucaoPerPage}
                  currentPage={currentPage}
                  paginate={paginate}
              />
          </div>
      </div>
  );
}

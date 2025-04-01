import React, { useState, useEffect } from "react";
import Table from "../components/Table";
import Pagination from "../components/Pagination";


export default function EmProgresso() {
  const [fitas, setFitas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [currentPage, setCurrentPage] = useState(1);
   const emProgressoPerPage = 8;
   const totalEmProgresso = fitas.length;
   const indexOfLastEmProgresso = currentPage * emProgressoPerPage;
   const indexOfFirstEmProgresso = indexOfLastEmProgresso - emProgressoPerPage;
   const currentEmProgresso = fitas.slice(indexOfFirstEmProgresso, indexOfLastEmProgresso);


   const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  return (


<div className="em-progesso">
<div className="conteudo-EmProgresso">
      <Table title="Em Progresso" data={currentEmProgresso} route="/tela-medicamentos/em-progresso" />
   <Pagination
       totalItems={totalEmProgresso}
       itemsPerPage={emProgressoPerPage}
       currentPage={currentPage}
       paginate={paginate}
   />
</div>
<LoadingModal isLoading={isLoading} />
</div>
);
}
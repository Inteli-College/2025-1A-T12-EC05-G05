import React, { useState } from "react";
import Table from "../components/Table";
import PageHeader from "../components/PageHeader";
import Pagination from "../components/Pagination";


const dataDevolvidas = [
   { nome: "Fita 3", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur."},
   { nome: "Fita 2", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur." },
   { nome: "Fita 1", descricao: "Este não será mostrado porque maxItems é 2." },
];


export default function Devolvidas() {
   const [currentPage, setCurrentPage] = useState(1);
   const devolvidasPerPage = 8;
   const totalDevolvidas = dataDevolvidas.length;

   const indexOfLastDevolvidas = currentPage * devolvidasPerPage;
   const indexOfFirstDevolvidas = indexOfLastDevolvidas - devolvidasPerPage;
   const currentDevolvidas = dataDevolvidas.slice(indexOfFirstDevolvidas, indexOfLastDevolvidas);

   const paginate = (pageNumber) => setCurrentPage(pageNumber);


   return (
       <div className="devolvidas">
           <div className="conteudo-devolvidas">
               <PageHeader title="Devolvidas" />
               <Table title="Devolvidas" data={currentDevolvidas} route="/devolucao/devolvidas" />
               
               <Pagination
                   totalItems={totalDevolvidas}
                   itemsPerPage={devolvidasPerPage}
                   currentPage={currentPage}
                   paginate={paginate}
               />
           </div>
       </div>
   );
}



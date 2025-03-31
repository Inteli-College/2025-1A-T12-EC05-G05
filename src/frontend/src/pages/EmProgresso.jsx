import React, { useState, useEffect } from "react";
import Table from "../components/Table";
import PageHeader from "../components/PageHeader";
import Pagination from "../components/Pagination";


export default function EmProgresso() {
   const [fitas, setFitas] = useState([]);
   const [isLoading, setIsLoading] = useState(true);


   useEffect(() => {
       const fetchFitasEmProgresso = async () => {
           try {
               const response = await fetch('http://localhost:5000/api/fitas');
               const data = await response.json();
              
               // Filtrar apenas fitas em progresso
               const fitasEmProgresso = data
                   .filter(fita => fita.status === "em_progresso")
                   .map(fita => ({
                       nome: `Fita ${fita.id}`,
                       descricao: fita.remedios
                           ? `Remédios: ${fita.remedios.join(', ')}`
                           : 'Sem remédios',
                       separando: true // Pode ajustar conforme necessidade
                   }));


               setFitas(fitasEmProgresso);
               setIsLoading(false);
           } catch (error) {
               console.error('Erro ao buscar fitas em progresso:', error);
               setIsLoading(false);
           }
       };


       fetchFitasEmProgresso();
   }, []);


   useEffect(() => {
           console.log("isLoading:", isLoading);
       }, [isLoading]);
          
   const [currentPage, setCurrentPage] = useState(1);
   const emProgressoPerPage = 8;
   const totalEmProgresso = fitas.length;
   const indexOfLastEmProgresso = currentPage * emProgressoPerPage;
   const indexOfFirstEmProgresso = indexOfLastEmProgresso - emProgressoPerPage;
   const currentEmProgresso = fitas.slice(indexOfFirstEmProgresso, indexOfLastEmProgresso);


   const paginate = (pageNumber) => setCurrentPage(pageNumber);
  


return (


<div className="em-progesso">
<div className="conteudo-AFazer">
      <Table title="Em Progresso" data={currentEmProgresso} route="/tela-medicamentos/em-progresso" />
   <Pagination
       totalItems={totalEmProgresso}
       itemsPerPage={emProgressoPerPage}
       currentPage={currentPage}
       paginate={paginate}
   />
</div>
</div>
);
}

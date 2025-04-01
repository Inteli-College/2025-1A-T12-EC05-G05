import React, { useState, useEffect } from "react";
import Table from "../components/Table";
import Pagination from "../components/Pagination";




export default function AFazer() {
   const [fitas, setFitas] = useState([]);
           const [isLoading, setIsLoading] = useState(true);
      
           useEffect(() => {
               const fetchFitasAFazer = async () => {
                   try {
                       const response = await fetch('http://localhost:5000/api/fitas');
                       const data = await response.json();
                      
                       const fitasAFazer = data
                           .filter(fita => fita.status === "pendente")
                           .map(fita => ({
                               nome: `Fita ${fita.id}`,
                               descricao: fita.remedios
                                   ? `Remédios: ${fita.remedios.join(', ')}`
                                   : 'Sem remédios',
                           }));
      
                       setFitas(fitasAFazer);
                       setIsLoading(false);
                   } catch (error) {
                       console.error('Erro ao buscar fitas em progresso:', error);
                       setIsLoading(false);
                   }
               };
      
               fetchFitasAFazer();
           }, []);


       useEffect(() => {
           console.log("isLoading:", isLoading);
       }, [isLoading]);
      


       const [currentPage, setCurrentPage] = useState(1);
       const aFazerPerPage = 8;
       const totalAFazer = fitas.length;
       
       const indexOfLastAFazer = currentPage * aFazerPerPage;
       const indexOfFirstAFazer = indexOfLastAFazer - aFazerPerPage;
       const currentAFazer = fitas.slice(indexOfFirstAFazer, indexOfLastAFazer);
      
       const paginate = (pageNumber) => setCurrentPage(pageNumber);
          
   return (
     
       <div className="a-fazer">
       <div className="conteudo-AFazer">         
           <Table title="A fazer" data={currentAFazer} route="/tela-medicamentos/a-fazer" />
           <Pagination
               totalItems={totalAFazer}
               itemsPerPage={aFazerPerPage}
               currentPage={currentPage}
               paginate={paginate}
           />
       </div>
   </div>
   );
}





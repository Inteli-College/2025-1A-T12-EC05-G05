import React,{ useState, useEffect } from "react";
import Table from "../components/Table";
import PageHeader from "../components/PageHeader";
import Pagination from "../components/Pagination";


export default function Prontas() {
   const [fitas, setFitas] = useState([]);
       const [isLoading, setIsLoading] = useState(true);
  
       useEffect(() => {
           const fetchFitasProntas = async () => {
               try {
                   const response = await fetch('http://localhost:5000/api/fitas');
                   const data = await response.json();
                  
                   const fitasProntas = data
                       .filter(fita => fita.status === "finalizada")
                       .map(fita => ({
                           nome: `Fita ${fita.id}`,
                           descricao: fita.remedios
                               ? `Remédios: ${fita.remedios.join(', ')}`
                               : 'Sem remédios',
                           separando: false
                       }));
  
                   setFitas(fitasProntas);
                   setIsLoading(false);
               } catch (error) {
                   console.error('Erro ao buscar fitas em progresso:', error);
                   setIsLoading(false);
               }
           };
  
           fetchFitasProntas();
       }, []);
  
  useEffect(() => {
           console.log("isLoading:", isLoading);
       }, [isLoading]);
       


const [currentPage, setCurrentPage] = useState(1);
const prontasPerPage = 8;
const totalProntas = fitas.length;


const indexOfLastProntas = currentPage * prontasPerPage;
const indexOfFirstProntas = indexOfLastProntas - prontasPerPage;
const currentProntas = fitas.slice(indexOfFirstProntas, indexOfLastProntas);


const paginate = (pageNumber) => setCurrentPage(pageNumber);




return (


<div className="em-progesso">
<div className="conteudo-AFazer">
<Table title="Em Progresso" data={currentProntas} route="/tela-medicamentos/em-progresso" />
<Pagination
   totalItems={totalProntas}
   itemsPerPage={prontasPerPage}
   currentPage={currentPage}
   paginate={paginate}
/>
</div>
</div>
);
}

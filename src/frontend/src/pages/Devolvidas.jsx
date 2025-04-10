import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import PopUpFitas from "../components/PopUpFitas";

export default function PossivelDevolucao() {
   const [fitas, setFitas] = useState([]);
   const [selectedFita, setSelectedFita] = useState(null);

   // Fetch das fitas em uso (possíveis devoluções)
   useEffect(() => {
      const fetchFitasPossiveis = async () => {
         try {
            const response = await fetch("http://localhost:5000/api/fitas-devolvidas");
            if (response.ok) {
               const data = await response.json();
               // Ajusta formato para o Table
               const formatadas = data.map((fita) => ({
                  id: fita.id,
                  nome: `Fita ${fita.id}`,
                  descricao: fita.remedios.join(", ") || "Sem remédios"
               }));
               setFitas(formatadas);
            } else {
               console.error("Erro ao buscar fitas: ", response.status);
            }
         } catch (error) {
            console.error("Erro de rede ao buscar fitas:", error);
         }
      };

      fetchFitasPossiveis();
   }, []);

   const openPopUpFitas = async (fitaData) => {
      const fitaId = parseInt(fitaData.nome.replace("Fita ", ""));
      try {
        const response = await fetch(`http://localhost:5000/api/fitas/${fitaId}`);
        if (response.ok) {
          const data = await response.json();
          setSelectedFita(data);  // agora temos a fita detalhada
        } else {
          console.error("Erro ao buscar detalhes da fita. Status:", response.status);
        }
      } catch (error) {
        console.error("Erro ao buscar detalhes da fita:", error);
      }
    };

   const closePopUp = () => {
      setSelectedFita(null);
   };

   return (
      <>
         {selectedFita && <PopUpFitas data={selectedFita} closePopUp={closePopUp} />}
         <Table
            title="Possíveis devoluções"
            data={fitas}
            route="/devolucao/possivel-devolucao"
            onItemClick={openPopUpFitas}
            maxItems={4}
         />
      </>
   );
}

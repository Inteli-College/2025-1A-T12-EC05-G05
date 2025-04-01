import React, { useState } from "react";
import Table from "../components/Table";
import PopUpFitas from "../components/PopUpFitas";


const dataDevolvidas = [
   { nome: "Fita 3", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur." },
   { nome: "Fita 2", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur." },
   { nome: "Fita 1", descricao: "Este não será mostrado porque maxItems é 2." },
];


export default function Devolvidas() {
   const [selectedFita, setSelectedFita] = useState(null);

   const openPopUp = (fitaData) => {
      setSelectedFita(fitaData);
   };

   const closePopUp = () => {
      setSelectedFita(null);
   };

   return (
      <>
         {selectedFita && <PopUpFitas data={selectedFita} closePopUp={closePopUp} />}
         <Table title="Devolvidas" data={dataDevolvidas} route="/devolucao/devolvidas" onItemClick={openPopUp} />
      </>
   );
}




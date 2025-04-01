import React from "react";
import Table from "../components/Table";
import { useState } from "react";
import PopUpFitas from "../components/PopUpFitas";


const dataPossivelDevolucao = [
   { nome: "Fita 5", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur." },
   { nome: "Fita 4", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur." },
   { nome: "Fita 3", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur." },
   { nome: "Fita 2", descricao: "Este não será mostrado porque maxItems é 3." },
];


export default function PossivelDevolucao() {
   const [selectedFita, setSelectedFita] = useState(null);

   const openPopUpFitas = (fitaData) => {
      setSelectedFita(fitaData);
   };
   const closePopUp = () => {
      setSelectedFita(null);
   };

   return (
      <>
         {selectedFita && <PopUpFitas data={selectedFita} closePopUp={closePopUp} />}
         <Table title="Possíveis devoluções" data={dataPossivelDevolucao} route="/devolucao/possivel-devolucao" onItemClick={openPopUpFitas} />
      </>
   );
}



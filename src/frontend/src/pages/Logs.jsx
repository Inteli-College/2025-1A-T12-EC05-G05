import React, { useState } from "react";
import PageHeader from "../components/PageHeader";
import "../styles/Logs.css";
import GridTable from "../components/GridTable";
import Filter from "../components/Filter";
import Pagination from "../components/Pagination";

const dataLogs = [
    { nome: "Fita 2", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur.", tipo: "Fita de medicamento", status: "Esperando autorização" },
    { nome: "Fita 2", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur.", tipo: "Fita de medicamento", status: "Pronto para separação" },
    { nome: "Fita 2", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur.", tipo: "Fita de medicamento", status: "Em progresso" },
    { nome: "Fita 2", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur.", tipo: "Ações do Robô", status: "Separado" },
    { nome: "Fita 2", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur.", tipo: "Ações do Robô", status: "Em uso" },
    { nome: "Fita 2", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur.", tipo: "Medicamentos", status: "Cancelada" },
    { nome: "Fita 2", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur.", tipo: "Medicamentos", status: "Cancelada" },
    { nome: "Fita 2", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur.", tipo: "Ações do Robô", status: "Em progresso" },
    { nome: "Fita 2", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur.", tipo: "Fita de medicamento", status: "Pronto para separação" },
    { nome: "Fita 2", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur.", tipo: "Medicamentos", status: "Esperando autorização" },
    { nome: "Fita 2", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur.", tipo: "Ações do Robô", status: "Em uso" },
    { nome: "Fita 2", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur.", tipo: "Fita de medicamento", status: "Separado" },
    { nome: "Fita 2", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur.", tipo: "Medicamentos", status: "Pronto para separação" },
    { nome: "Fita 2", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur.", tipo: "Ações do Robô", status: "Cancelada" },
    { nome: "Fita 2", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur.", tipo: "Medicamentos", status: "Em progresso" },
    { nome: "Fita 2", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur.", tipo: "Fita de medicamento", status: "Pronto para separação" },
    { nome: "Fita 2", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur.", tipo: "Medicamentos", status: "Esperando autorização" },
    { nome: "Fita 2", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur.", tipo: "Ações do Robô", status: "Em uso" },
    { nome: "Fita 2", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur.", tipo: "Fita de medicamento", status: "Separado" },
    { nome: "Fita 2", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur.", tipo: "Medicamentos", status: "Pronto para separação" },
    { nome: "Fita 2", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur.", tipo: "Ações do Robô", status: "Cancelada" },
    { nome: "Fita 2", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur.", tipo: "Medicamentos", status: "Em progresso" },
    { nome: "Fita 2", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur.", tipo: "Fita de medicamento", status: "Esperando autorização" },
    { nome: "Fita 2", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur.", tipo: "Fita de medicamento", status: "Pronto para separação" },
    { nome: "Fita 2", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur.", tipo: "Fita de medicamento", status: "Em progresso" },
    { nome: "Fita 2", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur.", tipo: "Ações do Robô", status: "Separado" },
    { nome: "Fita 2", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur.", tipo: "Ações do Robô", status: "Em uso" },
    { nome: "Fita 2", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur.", tipo: "Medicamentos", status: "Cancelada" },
    { nome: "Fita 2", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur.", tipo: "Medicamentos", status: "Cancelada" },
    { nome: "Fita 2", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur.", tipo: "Ações do Robô", status: "Em progresso" },
    { nome: "Fita 2", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur.", tipo: "Fita de medicamento", status: "Pronto para separação" },
    { nome: "Fita 2", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur.", tipo: "Medicamentos", status: "Esperando autorização" },
    { nome: "Fita 2", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur.", tipo: "Ações do Robô", status: "Em uso" },
    { nome: "Fita 2", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur.", tipo: "Fita de medicamento", status: "Separado" },
    { nome: "Fita 2", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur.", tipo: "Medicamentos", status: "Pronto para separação" },
    { nome: "Fita 2", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur.", tipo: "Ações do Robô", status: "Cancelada" },
    { nome: "Fita 2", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur.", tipo: "Medicamentos", status: "Em progresso" },
    { nome: "Fita 2", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur.", tipo: "Fita de medicamento", status: "Pronto para separação" },
    { nome: "Fita 2", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur.", tipo: "Medicamentos", status: "Esperando autorização" },
    { nome: "Fita 2", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur.", tipo: "Ações do Robô", status: "Em uso" },
    { nome: "Fita 2", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur.", tipo: "Fita de medicamento", status: "Separado" },
    { nome: "Fita 2", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur.", tipo: "Medicamentos", status: "Pronto para separação" },
    { nome: "Fita 2", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur.", tipo: "Ações do Robô", status: "Cancelada" },
    { nome: "Fita 2", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur.", tipo: "Medicamentos", status: "Em progresso" },
    { nome: "Fita 2", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur.", tipo: "Fita de medicamento", status: "Esperando autorização" },
    { nome: "Fita 2", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur.", tipo: "Fita de medicamento", status: "Pronto para separação" },
    { nome: "Fita 2", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur.", tipo: "Fita de medicamento", status: "Em progresso" },
    { nome: "Fita 2", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur.", tipo: "Ações do Robô", status: "Separado" },
    { nome: "Fita 2", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur.", tipo: "Ações do Robô", status: "Em uso" },
    { nome: "Fita 2", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur.", tipo: "Medicamentos", status: "Cancelada" },
    { nome: "Fita 2", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur.", tipo: "Medicamentos", status: "Cancelada" },
    { nome: "Fita 2", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur.", tipo: "Ações do Robô", status: "Em progresso" },
    { nome: "Fita 2", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur.", tipo: "Fita de medicamento", status: "Pronto para separação" },
    { nome: "Fita 2", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur.", tipo: "Medicamentos", status: "Esperando autorização" },
    { nome: "Fita 2", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur.", tipo: "Ações do Robô", status: "Em uso" },
    { nome: "Fita 2", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur.", tipo: "Fita de medicamento", status: "Separado" },
    { nome: "Fita 2", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur.", tipo: "Medicamentos", status: "Pronto para separação" },
    { nome: "Fita 2", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur.", tipo: "Ações do Robô", status: "Cancelada" },
    { nome: "Fita 2", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur.", tipo: "Medicamentos", status: "Em progresso" },
    { nome: "Fita 2", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur.", tipo: "Fita de medicamento", status: "Pronto para separação" },
    { nome: "Fita 2", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur.", tipo: "Medicamentos", status: "Esperando autorização" },
    { nome: "Fita 2", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur.", tipo: "Ações do Robô", status: "Em uso" },
    { nome: "Fita 2", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur.", tipo: "Fita de medicamento", status: "Separado" },
    { nome: "Fita 2", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur.", tipo: "Medicamentos", status: "Pronto para separação" },
    { nome: "Fita 2", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur.", tipo: "Ações do Robô", status: "Cancelada" },
    { nome: "Fita 2", descricao: "Supporting line text lorem ipsum dolor sit amet, consectetur.", tipo: "Medicamentos", status: "Em progresso" },
];

export default function Logs() {
    const [currentPage, setCurrentPage] = useState(1);
    const logsPerPage = 8;
    const totalLogs = dataLogs.length;

    const indexOfLastLog = currentPage * logsPerPage;
    const indexOfFirstLog = indexOfLastLog - logsPerPage;
    const currentLogs = dataLogs.slice(indexOfFirstLog, indexOfLastLog);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="logs">
            <div className="conteudo-logs">
                <PageHeader title="Histórico" />
                <Filter />
                <GridTable title="Logs" data={currentLogs} route="/logs" />
                
                <Pagination
                    totalItems={totalLogs}
                    itemsPerPage={logsPerPage}
                    currentPage={currentPage}
                    paginate={paginate}
                />
            </div>
        </div>
    );
}

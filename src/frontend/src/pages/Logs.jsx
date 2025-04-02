import React, { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";
import "../styles/Logs.css";
import GridTable from "../components/GridTable";
import Filter from "../components/Filter";
import Pagination from "../components/Pagination";
import axios from "axios";

export default function Logs() {
    const [logs, setLogs] = useState([]);
    const [filteredLogs, setFilteredLogs] = useState([]);  // Logs filtrados
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState([]); // Filtros selecionados

    const logsPerPage = 8;

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:5000/api/logs");
                setLogs(response.data.logs);
                setFilteredLogs(response.data.logs);  // Inicializa os logs filtrados
                setLoading(false);
            } catch (error) {
                console.error("Erro ao carregar os logs:", error);
                setLoading(false);
            }
        };
        fetchLogs();
    }, []);

    // Função para aplicar os filtros
    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    // Função para filtrar os logs com base nos filtros selecionados
    useEffect(() => {
        if (filters.length > 0) {
            const filtered = logs.filter(log => filters.includes(log.tipo)); // Filtra apenas pelo tipo
            setFilteredLogs(filtered); 
            console.log(filtered); // Atualiza os logs filtrados
        } else {
            setFilteredLogs(logs);  // Se não houver filtros, exibe todos os logs
        }
    }, [filters, logs]);

    const totalLogs = filteredLogs.length;

    const indexOfLastLog = currentPage * logsPerPage;
    const indexOfFirstLog = indexOfLastLog - logsPerPage;
    const currentLogs = filteredLogs.slice(indexOfFirstLog, indexOfLastLog);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="logs">
            <div className="conteudo-logs">
                <PageHeader title="Histórico" />
                <Filter onFilterChange={handleFilterChange} />  {/* Passando a função para o Filter */}
                <GridTable
                    title="Logs"
                    data={currentLogs}
                    route="/logs"
                    columns={[
                        { title: "Nome", key: "nome" },
                        { title: "Descrição", key: "descricao" },
                        { title: "Tipo", key: "tipo" },
                        { title: "Status", key: "status" },
                        { title: "Data", key: "data" }
                    ]}
                />

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

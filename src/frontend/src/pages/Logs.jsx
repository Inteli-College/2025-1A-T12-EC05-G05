import React, { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";
import "../styles/Logs.css";
import GridTable from "../components/GridTable";
import Filter from "../components/Filter";
import Pagination from "../components/Pagination";
import axios from "axios";

export default function Logs() {
    const [logs, setLogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);

    const logsPerPage = 8;

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:5000/api/logs");
                setLogs(response.data.logs);
                setLoading(false);
            } catch (error) {
                console.error("Erro ao carregar os logs:", error);
                setLoading(false);
            }
        };
        fetchLogs();
    }, []);

    const totalLogs = logs.length;

    const indexOfLastLog = currentPage * logsPerPage;
    const indexOfFirstLog = indexOfLastLog - logsPerPage;
    const currentLogs = logs.slice(indexOfFirstLog, indexOfLastLog);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="logs">
            <div className="conteudo-logs">
                <PageHeader title="Logs" />
                <Filter />
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

import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// Importações dos arquivos de rotas
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

// Configurar CORS
app.use(
  cors({
    origin: "*", // Permitir apenas o frontend
    methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
    credentials: true, // Se necessário, habilitar envio de cookies ou cabeçalhos autorizados
  })
);

app.use(express.json());

// Rotas
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

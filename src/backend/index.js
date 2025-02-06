import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// Importações dos arquivos de rotas
import authRoutes from "./routes/authRoutes.js";
import assetRoutes from "./routes/assetRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import mqttRoutes from "./routes/mqttRoutes.js";
import placeRoutes from "./routes/placeRoutes.js";
import deviceRoutes from "./routes/deviceRoutes.js";
import transferRoutes from "./routes/transferRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

// Importação do controller para iniciar a configuração dos tópicos MQTT
import { setupMqttListeners } from "./controllers/mqttController.js";

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
app.use("/users", userRoutes);
app.use("/assets", assetRoutes);
app.use("/places", placeRoutes);
app.use("/devices", deviceRoutes);
app.use("/transfers", transferRoutes);
app.use("/mqtt", mqttRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Configuração do MQTT
setupMqttListeners();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

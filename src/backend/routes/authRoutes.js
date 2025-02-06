import express from "express";
import { login } from "../controllers/authController.js";
import { getUserInfo } from "../controllers/userController.js";
import { authenticate } from "../middlewares/authenticate.js";

const router = express.Router();

router.post("/sign-in", login);

// Rota para obter informações do usuário autenticado
router.get("/me", authenticate, getUserInfo);

export default router;
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import UserService from "../services/userService.js";
const SECRET_KEY = process.env.JWT_SECRET;

export const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, role: user.role },
    SECRET_KEY,
    { expiresIn: "1h" } // Token válido por 1 hora
  );
};

export const authenticateUser = async (email, password) => {
  const user = await UserService.findUserByEmail(email);

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!user || !isPasswordValid) throw new Error("Credenciais inválidas.");

  return generateToken(user);
};

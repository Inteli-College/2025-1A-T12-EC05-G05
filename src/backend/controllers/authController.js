import { authenticateUser } from "../utils/jwtUtils.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await authenticateUser(email, password);
    res.status(200).json({ token });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
}

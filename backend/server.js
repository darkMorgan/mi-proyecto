const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const usuarios = []; // Aquí se almacenarán temporalmente

// Registro
app.post("/api/auth/register", async (req, res) => {
  const { username, password, role } = req.body;
  const existente = usuarios.find(u => u.username === username);
  if (existente) return res.status(400).json({ message: "Usuario ya existe" });

  const hashed = await bcrypt.hash(password, 10);
  usuarios.push({ username, password: hashed, role });
  res.json({ message: "Usuario registrado con éxito" });
});

// Login
app.post("/api/auth/login", async (req, res) => {
  const { username, password } = req.body;
  const user = usuarios.find(u => u.username === username);
  if (!user) return res.status(400).json({ message: "Usuario no encontrado" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ message: "Contraseña incorrecta" });

  const token = jwt.sign({ username: user.username, role: user.role }, process.env.JWT_SECRET || "secreto", { expiresIn: "1h" });
  res.json({ token, username: user.username, role: user.role });
});

// Middleware de autenticación
function verifyToken(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: "Token requerido" });

  const token = header.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secreto");
    req.user = decoded;
    next();
  } catch {
    return res.status(403).json({ message: "Token inválido" });
  }
}

// Ruta de admin protegida
app.get("/api/admin/dashboard", verifyToken, (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ message: "Solo admins" });
  res.json({ message: "Bienvenido al panel de administración" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));

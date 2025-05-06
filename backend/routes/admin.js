const express = require("express");
const router = express.Router();
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

router.get("/dashboard", verifyToken, isAdmin, (req, res) => {
  res.json({ message: "Bienvenido al panel de administración" });
});

module.exports = router;

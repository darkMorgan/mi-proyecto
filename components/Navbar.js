// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user")); // Obtener los datos del usuario

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        {user && user.role === "admin" && (
          <li>
            <Link to="/admin/dashboard">Admin Dashboard</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

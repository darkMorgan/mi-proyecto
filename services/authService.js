// src/services/authService.js
import axios from "axios";

export const login = async (username, password) => {
  const response = await axios.post("http://localhost:4000/api/auth/login", {
    username,
    password,
  });
  return response.data;
};

export const register = async (username, password, role) => {
  const response = await axios.post("http://localhost:4000/api/auth/register", {
    username,
    password,
    role,
  });
  return response.data;
};

import axios from "axios";

const API_URL = "http://localhost:3000";

export const signup = async ({fullName, email, password}) => {
  const response = await axios.post(`${API_URL}/signup`, {
    fullName,
    email,
    password,
  });
  return response.data;
};

export const login = async ({email, password}) => {
  const response = await axios.post(`${API_URL}/login`, {email, password});
  return response.data;
};

export const logout = async () => {
  const response = await axios.post(`${API_URL}/logout`);
  return response.data;
};

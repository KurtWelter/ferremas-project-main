import axios from "axios";

// Función para obtener los detalles de la transacción desde el backend
export const fetchTransactionDetails = async () => {
  try {
    // Realizar la solicitud para obtener los detalles de la transacción
    const response = await axios.get(
      "http://localhost:3000/api/transbank/details"
    );

    // Devolver los detalles de la transacción
    return response.data;
  } catch (error) {
    // Capturar y manejar errores
    console.error("Error al obtener los detalles de la transacción:", error);
    throw error;
  }
};

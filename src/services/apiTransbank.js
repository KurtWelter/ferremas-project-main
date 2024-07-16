import axios from "axios";
import {useCartStore} from "../store/CartStore"; // Asegúrate de importar el store

export const realizarPago = async (cart, isNewUser, discountApplied) => {
  try {
    const buyOrder = `order-${Date.now()}`;
    const sessionId = `session-${Date.now()}`;

    // Calcula el total y aplica el descuento si corresponde
    let amount = cart.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );

    // Aplica un 5% de descuento si es nuevo usuario y el descuento no se ha aplicado
    if (isNewUser && !discountApplied) {
      amount *= 0.95; // Aplica un 5% de descuento
    }

    const returnUrl = "http://localhost:5173/dashboard";

    const response = await axios.post(
      "http://localhost:3000/api/transbank/init",
      {
        buyOrder,
        sessionId,
        amount,
        returnUrl,
      }
    );

    console.log("Respuesta del servidor:", response.data); // Imprime la respuesta
    const {token, url} = response.data;

    if (!token) {
      throw new Error("Token no recibido");
    }

    const form = document.createElement("form");
    form.method = "POST";
    form.action = url;

    const hiddenField = document.createElement("input");
    hiddenField.type = "hidden";
    hiddenField.name = "token_ws";
    hiddenField.value = token;

    form.appendChild(hiddenField);
    document.body.appendChild(form);
    form.submit();

    return token; // Devolvemos el token
  } catch (error) {
    console.error("Error initiating transaction:", error);
    throw new Error(
      "Error en la solicitud: " +
        (error.response?.data?.message || error.message)
    );
  }
};

export const obtenerEstadoTransaccion = async (token) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/transbank/status",
      {token}
    );

    console.log("Estado de la transacción:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error getting transaction status:", error);
    throw new Error(
      "Error en la solicitud: " +
        (error.response?.data?.message || error.message)
    );
  }
};

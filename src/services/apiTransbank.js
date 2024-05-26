import axios from "axios";

export const realizarPago = async (cart) => {
  try {
    const buyOrder = `order-${Date.now()}`;
    const sessionId = `session-${Date.now()}`;
    const amount = cart.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );

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

    const {token, url} = response.data;
    console.log("Token:", token);
    console.log("URL:", url);

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
  } catch (error) {
    console.error("Error initiating transaction:", error);
    throw new Error(
      "Error en la solicitud: " +
        (error.response?.data?.message || error.message)
    );
  }
};

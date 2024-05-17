// apiTransbank.js
import {
  WebpayPlus,
  Options,
  IntegrationCommerceCodes,
  IntegrationApiKeys,
  Environment,
} from "transbank-sdk";

export const makePayment = async () => {
  const tx = new WebpayPlus.Transaction(
    new Options(
      IntegrationCommerceCodes.WEBPAY_PLUS,
      IntegrationApiKeys.WEBPAY,
      Environment.Integration
    )
  );

  const buyOrder = "my-company-name-328493";
  const sessionId = "Sesion123";
  const amount = 10000;
  const returnUrl = "http://localhost:5173/cart";

  const response = await tx.create(buyOrder, sessionId, amount, returnUrl);

  const token = response.token;
  const url = response.url;

  return {token, url}; // Devuelve el token y la URL de la transacción
};

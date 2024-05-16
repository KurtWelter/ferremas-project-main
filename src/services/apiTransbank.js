// Importa las funciones y clases necesarias del SDK de Transbank
import {WebpayPlus} from "transbank-sdk";
import {
  Options,
  IntegrationApiKeys,
  Environment,
  IntegrationCommerceCodes,
} from "transbank-sdk";

// Configura las opciones de integración
const options = new Options(
  IntegrationCommerceCodes.WEBPAY_PLUS,
  IntegrationApiKeys.WEBPAY,
  Environment.Integration
);

// Crea una nueva transacción de Webpay Plus
const transaction = new WebpayPlus.Transaction(options);

// Llama al método create para iniciar una nueva transacción
const response = await transaction.create(
  buyOrder,
  sessionId,
  amount,
  returnUrl
);

// Obtiene la URL de redirección para completar la transacción
const redirectUrl = response.url;

// Una vez que el usuario complete el pago en la página de Webpay, se redirigirá de vuelta a la URL de retorno especificada.

// Después de que el usuario regrese a la URL de retorno, puedes confirmar la transacción utilizando el token proporcionado
const commitResponse = await transaction.commit(token);

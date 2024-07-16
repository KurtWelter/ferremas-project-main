import {obtenerEstadoTransaccion} from "./apiTransbank";

export const fetchTransactionDetails = async (token) => {
  return await obtenerEstadoTransaccion(token);
};

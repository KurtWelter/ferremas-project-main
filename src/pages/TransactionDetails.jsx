import {useState} from "react";
import {realizarPago} from "../services/apiTransbank";
import {fetchTransactionDetails} from "../services/apiTransactionDetails";

function TransactionDetails() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [transactionDetails, setTransactionDetails] = useState(null);

  const handleRealizarPago = async (cart) => {
    setIsLoading(true);
    try {
      await realizarPago(cart);
      // Si la transacción se realizó con éxito, obtener los detalles de la transacción
      await fetchTransactionDetails();
    } catch (error) {
      console.error("Error al realizar el pago:", error);
      setError("Error al realizar el pago");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFetchTransactionDetails = async () => {
    setIsLoading(true);
    try {
      const details = await fetchTransactionDetails();
      setTransactionDetails(details);
    } catch (error) {
      console.error("Error al obtener los detalles de la transacción:", error);
      setError("Error al obtener los detalles de la transacción");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <h1>Realizar Pago</h1>
      <button onClick={handleRealizarPago}>Realizar Pago</button>
      <h2>Detalles de la Transacción</h2>
      {error && <p>Error: {error}</p>}
      {isLoading ? (
        <p>Cargando...</p>
      ) : (
        transactionDetails && (
          <div>
            <p>VCI: {transactionDetails.vci}</p>
            <p>Amount: {transactionDetails.amount}</p>
            <p>Status: {transactionDetails.status}</p>
            <p>Buy Order: {transactionDetails.buy_order}</p>
            <p>Session ID: {transactionDetails.session_id}</p>
            {/* Agregar más detalles aquí según sea necesario */}
          </div>
        )
      )}
    </div>
  );
}

export default TransactionDetails;

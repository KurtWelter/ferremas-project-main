import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {fetchTransactionDetails} from "../services/apiTransactionDetails";

const TransactionDetails = () => {
  const location = useLocation();
  const token = location.state?.token; // Obtener el token desde el estado
  console.log("Token recibido:", token);
  console.log("Location state:", location.state); // Verifica si el estado es correcto

  const [transaction, setTransaction] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTransactionDetails = async () => {
      if (!token) {
        setError("El token es requerido");
        return;
      }

      try {
        const data = await fetchTransactionDetails(token);
        setTransaction(data);
      } catch (err) {
        setError(err.message);
      }
    };

    getTransactionDetails();
  }, [token]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!transaction) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h1>Detalles de la Transacción</h1>
      <p>Orden de Compra: {transaction.buy_order}</p>
      <p>ID de Sesión: {transaction.session_id}</p>
      <p>Monto: {transaction.amount}</p>
      <p>Estado: {transaction.status}</p>
    </div>
  );
};

export default TransactionDetails;

import {useState} from "react";
import styled from "styled-components";
import {useCartStore} from "../store/CartStore";
import {realizarPago} from "../services/apiTransbank";

// Estilos para los elementos del carro de compras
const CartContainer = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
`;

const ProductRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
  padding: 10px 0;
`;

const ProductInfo = styled.div`
  display: flex;
  align-items: center;
`;

const ProductImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  margin-right: 20px;
`;

const ProductName = styled.p`
  font-weight: bold;
  margin-bottom: 5px;
`;

const ProductPrice = styled.p`
  font-size: 14px;
`;

const TotalPrice = styled.p`
  font-weight: bold;
  font-size: 18px;
  margin-top: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const PayButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const TransferButton = styled.button`
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }
`;

const TransferDetails = styled.div`
  margin-top: 20px;
  font-size: 14px;
`;

function Cart() {
  const {cart, incrementQuantity, decrementQuantity} = useCartStore();
  const [isLoading, setIsLoading] = useState(false); // Estado para manejar la carga
  const [isTransferShown, setIsTransferShown] = useState(false); // Estado para mostrar los detalles de transferencia

  // Función para manejar el clic en el botón "Ir a pagar"
  const handlePayClick = async () => {
    setIsLoading(true); // Activa el indicador de carga
    try {
      await realizarPago(cart); // Llama a la función realizarPago para iniciar la transacción
    } catch (error) {
      console.error("Error al iniciar la transacción:", error);
      // Maneja el error según sea necesario
    } finally {
      setIsLoading(false); // Desactiva el indicador de carga una vez que se complete la transacción o haya ocurrido un error
    }
  };

  // Función para calcular el precio total del carrito
  const totalPrice = cart.reduce((total, product) => total + product.price, 0);

  // Función para mostrar u ocultar los detalles de transferencia
  const handleTransferClick = () => {
    setIsTransferShown(!isTransferShown);
  };

  return (
    <CartContainer>
      <h2>Shopping Cart</h2>
      <div>
        {cart.map((product) => (
          <ProductRow key={product.id}>
            <ProductInfo>
              <ProductImage src={product.image} alt={product.name} />
              <div>
                <ProductName>{product.name}</ProductName>
                <ProductPrice>${product.price}</ProductPrice>
              </div>
            </ProductInfo>
            <div>
              <button onClick={() => incrementQuantity(product.id)}>+</button>
              {product.quantity}
              <button onClick={() => decrementQuantity(product.id)}>-</button>
            </div>
          </ProductRow>
        ))}
      </div>
      <TotalPrice>Total Price: ${totalPrice}</TotalPrice>
      <ButtonContainer>
        <PayButton onClick={handlePayClick} disabled={isLoading}>
          {isLoading ? "Processing payment..." : "Go to checkout"}
        </PayButton>
        <TransferButton onClick={handleTransferClick}>
          Transfer to Third Party
        </TransferButton>
      </ButtonContainer>
      {isTransferShown && (
        <TransferDetails>
          <p>Transferir a la siguiente Cuenta Bancaria:</p>
          <p>Trauki Chile</p>
          <p>76.918.522-4</p>
          <p>Banco Bice</p>
          <p>Cuenta Corriente</p>
          <p>09-01823-9</p>
          <p>contacto@traukochile.cl</p>
        </TransferDetails>
      )}
    </CartContainer>
  );
}

export default Cart;

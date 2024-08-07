import {useState} from "react";
import styled from "styled-components";
import {useCartStore} from "../store/CartStore";
import {useNavigate} from "react-router-dom";
import {realizarPago} from "../services/apiTransbank";

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

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 16px;
  cursor: pointer;
  margin: 0 5px;

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
  const {
    cart,
    isNewUser,
    discountApplied,
    applyDiscount,
    incrementQuantity,
    decrementQuantity,
  } = useCartStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isTransferShown, setIsTransferShown] = useState(false);
  const navigate = useNavigate();

  const calculateTotal = (cart, isNewUser, discountApplied) => {
    let total = cart.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    );
    if (isNewUser && !discountApplied) {
      total *= 0.95; // Aplica un 5% de descuento
    }
    return total;
  };

  const totalPrice = calculateTotal(cart, isNewUser, discountApplied);

  const handlePayment = async () => {
    try {
      setIsLoading(true);
      const token = await realizarPago(cart);
      applyDiscount(); // Marca el descuento como aplicado
      console.log("Token obtenido:", token); // Verificar el token
      navigate("/transactiondetails", {state: {token}}); // Asegúrate que el token no sea undefined
    } catch (error) {
      console.error("Error al iniciar la transacción:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTransferClick = () => {
    setIsTransferShown(!isTransferShown);
  };

  return (
    <CartContainer>
      <h2>Carro de Compras</h2>
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
              <Button onClick={() => incrementQuantity(product.id)}>+</Button>
              {product.quantity}
              <Button onClick={() => decrementQuantity(product.id)}>-</Button>
            </div>
          </ProductRow>
        ))}
      </div>
      <TotalPrice>Total: ${totalPrice}</TotalPrice>
      <ButtonContainer>
        <PayButton onClick={handlePayment} disabled={isLoading}>
          {isLoading ? "Procesando pago..." : "Ir a pagar"}
        </PayButton>
        <TransferButton onClick={handleTransferClick}>
          Transferir a Terceros
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

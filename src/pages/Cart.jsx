import {useState} from "react";
import {useCartStore} from "../store/CartStore";
import {makePayment} from "../services/apiTransbank";

function Cart() {
  const {cart} = useCartStore();
  const [isLoading, setIsLoading] = useState(false);

  const handlePayClick = async () => {
    setIsLoading(true);
    try {
      const {url} = await makePayment();
      window.location.href = url;
    } catch (error) {
      console.log("Error al realizar el pago:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Función para calcular el precio total del carrito
  const totalPrice = cart.reduce((total, product) => total + product.price, 0);

  return (
    <div>
      <h2>Shopping Cart</h2>
      <div>
        {cart.map((product) => (
          <div key={product.id}>
            <p>
              {product.name} - ${product.price}
            </p>
          </div>
        ))}
      </div>
      <p>Total Price: ${totalPrice}</p>
      <button onClick={handlePayClick} disabled={isLoading}>
        {isLoading ? "Procesando pago..." : "Ir a pagar"}
      </button>
    </div>
  );
}

export default Cart;

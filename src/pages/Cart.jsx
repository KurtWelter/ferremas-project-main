import {useState} from "react";
import {useCartStore} from "../store/CartStore";

function Cart() {
  const {cart} = useCartStore();
  // Función para agregar un producto al carrito
  /* const addToCart = (product) => {
    console.log("Adding to cart:", product); // Verifica que se esté llamando la función addToCart
    setCart([...cart, product]);
    console.log("Cart after adding:", cart); // Verifica el estado del carrito después de agregar el producto
  };*/

  // Función para eliminar un producto del carrito
  /*const removeFromCart = (productToRemove) => {
    console.log("Removing from cart:", productToRemove); // Verifica que se esté llamando la función removeFromCart
    setCart(cart.filter((product) => product !== productToRemove));
    console.log("Cart after removing:", cart); // Verifica el estado del carrito después de eliminar el producto
  };*/

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
    </div>
  );
}

export default Cart;

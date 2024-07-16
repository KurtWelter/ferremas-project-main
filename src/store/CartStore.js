import {create} from "zustand";

export const useCartStore = create((set) => ({
  cart: [],
  isNewUser: true,
  discountApplied: false, // Nuevo estado para rastrear si el descuento se aplicó
  addToCart: (product) =>
    set((state) => {
      const existingProduct = state.cart.find((p) => p.id === product.id);
      if (existingProduct) {
        return {
          cart: state.cart.map((p) =>
            p.id === product.id ? {...p, quantity: p.quantity + 1} : p
          ),
        };
      }
      return {
        cart: [...state.cart, {...product, quantity: product.quantity || 1}],
      };
    }),
  applyDiscount: () => set((state) => ({discountApplied: true})),
  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((product) => product.id !== productId),
    })),
  incrementQuantity: (productId) =>
    set((state) => ({
      cart: state.cart.map((product) =>
        product.id === productId
          ? {...product, quantity: product.quantity + 1}
          : product
      ),
    })),
  decrementQuantity: (productId) =>
    set((state) => ({
      cart: state.cart.map((product) =>
        product.id === productId && product.quantity > 1
          ? {...product, quantity: product.quantity - 1}
          : product
      ),
    })),
  calculateTotal: (cart, isNewUser) => {
    let total = cart.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    );
    if (isNewUser) {
      total *= 0.95; // Aplica un 5% de descuento
    }
    return total;
  },
}));

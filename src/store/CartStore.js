import {create} from "zustand";

/*export const useCartStore = create((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({bears: state.bears + 1})),
  removeAllBears: () => set({bears: 0}),
  updateBears: (newBears) => set({bears: newBears}),
}));*/

export const useCartStore = create((set) => ({
  cart: [],
  /*addToCart: (product) => set((state) => ({cart: [...state.cart, product]})),*/
  addToCart: (product) => set((state) => ({cart: [...state.cart, product]})),

  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((product) => product.id !== productId),
    })),
}));

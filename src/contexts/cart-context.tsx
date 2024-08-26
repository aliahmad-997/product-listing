import { createContext, useMemo, useState } from "react";
import { CartProduct } from "../types";

interface CartContextType {
  cart: Map<number, CartProduct>;
  addToCart: (product: CartProduct) => void;
  decrementFromCart: (id: number) => void;
  removeFromCart: (id: number) => void;
  total: number;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<Map<number, CartProduct>>(new Map());

  const addToCart = (product: CartProduct) => {
    setCart((cart) => {
      const { id } = product;

      const newCart = new Map(cart);
      const cartProduct = newCart.get(product.id);

      if (cartProduct) {
        newCart.set(id, { ...cartProduct, quantity: cartProduct.quantity + 1 });
      } else {
        newCart.set(id, { ...product, quantity: 1 });
      }

      return newCart;
    });
  };

  const decrementFromCart = (id: number) => {
    setCart((cart) => {
      const newCart = new Map(cart);
      const cartProduct = newCart.get(id);

      if (cartProduct && cartProduct.quantity && cartProduct.quantity > 1) {
        newCart.set(id, { ...cartProduct, quantity: cartProduct.quantity - 1 });
      } else {
        newCart.delete(id);
      }

      return newCart;
    });
  };

  const removeFromCart = (id: number) => {
    setCart((cart) => {
      const newCart = new Map(cart);
      newCart.delete(id);
      return newCart;
    });
  };

  const total = useMemo(() => {
    return Array.from(cart.values()).reduce((sum, current) => {
      sum = sum + current.price * current.quantity;
      return sum;
    }, 0);
  }, [cart]);

  const values = useMemo(
    () => ({
      cart,
      total,
      addToCart,
      decrementFromCart,
      removeFromCart,
    }),
    [cart, total]
  );

  return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
};

import { useCart } from "../../hooks";
import { Product } from "../../types";
import { ProductItem } from "../product";

export const ProductList = ({ products }: { products: Product[] }) => {
  const { cart, addToCart, decrementFromCart, removeFromCart } = useCart();

  const onAdd = (product: Product) => {
    const newCartProduct = {
      id: product.id,
      price: product.price,
      quantity: 1,
    };
    addToCart(newCartProduct);
  };

  const onDecrement = (id: number) => {
    decrementFromCart(id);
  };

  const onRemove = (id: number) => {
    removeFromCart(id);
  };

  return (
    <div className="max-w-4xl space-y-5">
      {products.map((product) => (
        <ProductItem
          key={product.id}
          name={product.name}
          img={product.img}
          price={product.price}
          onAdd={() => onAdd(product)}
          onDecrement={() => onDecrement(product.id)}
          onRemove={() => onRemove(product.id)}
          quantity={cart.get(product.id)?.quantity ?? 0}
        />
      ))}
    </div>
  );
};

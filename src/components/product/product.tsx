import { ProductProps } from "./product.types";

export const ProductItem = (props: ProductProps) => {
  const { name, price, img, quantity, onAdd, onDecrement, onRemove } = props;

  return (
    <div className="flex justify-between border p-2">
      <div className="flex gap-5">
        <img src={img} alt={name} className="w-36 h-36 object-cover" />
        <div>
          <h3 className="mt-2 text-lg font-semibold">{name}</h3>
          <p className="mt-1 text-gray-700">${price}</p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center gap-5">
          <button onClick={onDecrement} className="text-red-500">
            -
          </button>
          <span className="text-xl font-bold">{quantity}</span>
          <button onClick={onAdd} className="text-green-500">
            +
          </button>
        </div>

        <button onClick={onRemove} className="mt-2 text-red-700">
          Remove
        </button>
      </div>
    </div>
  );
};

export interface ProductProps {
  name: string;
  price: number;
  img: string;
  colour?: string;
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
  onDecrement: () => void;
}

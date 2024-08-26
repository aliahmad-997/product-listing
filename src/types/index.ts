export interface Product {
  id: number;
  colour: string;
  name: string;
  price: number;
  img: string;
}

export interface CartProduct {
  id: number;
  price: number;
  quantity: number;
}

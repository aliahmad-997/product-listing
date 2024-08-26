import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { ProductList } from "../components/product-list";
import { useCart } from "../hooks";

jest.mock("../hooks");

const mockProducts = [
  {
    id: 1,
    name: "Product 1",
    price: 10,
    img: "https://via.placeholder.com/150",
    colour: "black",
  },
  {
    id: 2,
    name: "Product 2",
    price: 20,
    img: "https://via.placeholder.com/150",
    colour: "red",
  },
];

describe("ProductList Component", () => {
  const mockAddToCart = jest.fn();
  const mockDecrementFromCart = jest.fn();
  const mockRemoveFromCart = jest.fn();
  const mockCart = new Map();

  beforeEach(() => {
    jest.clearAllMocks();

    (useCart as jest.Mock).mockReturnValue({
      cart: mockCart,
      addToCart: mockAddToCart,
      decrementFromCart: mockDecrementFromCart,
      removeFromCart: mockRemoveFromCart,
    });
  });

  test("renders all products", () => {
    render(<ProductList products={mockProducts} />);

    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
  });

  test("calls addToCart when + button is clicked", () => {
    render(<ProductList products={mockProducts} />);

    const addButton = screen.getAllByText("+")[0];
    fireEvent.click(addButton);

    expect(mockAddToCart).toHaveBeenCalledTimes(1);
    expect(mockAddToCart).toHaveBeenCalledWith({
      id: 1,
      price: 10,
      quantity: 1,
    });
  });

  test("calls decrementFromCart when - button is clicked", () => {
    render(<ProductList products={mockProducts} />);

    const decrementButton = screen.getAllByText("-")[0];
    fireEvent.click(decrementButton);

    expect(mockDecrementFromCart).toHaveBeenCalledTimes(1);
    expect(mockDecrementFromCart).toHaveBeenCalledWith(1);
  });

  test("calls removeFromCart when Remove button is clicked", () => {
    render(<ProductList products={mockProducts} />);

    const removeButton = screen.getAllByText("Remove")[0];
    fireEvent.click(removeButton);

    expect(mockRemoveFromCart).toHaveBeenCalledTimes(1);
    expect(mockRemoveFromCart).toHaveBeenCalledWith(1);
  });
});

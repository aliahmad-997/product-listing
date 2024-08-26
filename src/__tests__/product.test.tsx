import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { ProductItem } from "../components/product/product";
import { ProductProps } from "../components/product/product.types";

const mockProduct: ProductProps = {
  name: "Test Product",
  price: 10,
  img: "https://via.placeholder.com/150",
  quantity: 1,
  onAdd: jest.fn(),
  onDecrement: jest.fn(),
  onRemove: jest.fn(),
};

describe("Product Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders product details", () => {
    render(<ProductItem {...mockProduct} />);

    expect(screen.getByAltText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("$10")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  test("calls onAdd when + button is clicked", () => {
    render(<ProductItem {...mockProduct} />);

    const addButton = screen.getByText("+");
    fireEvent.click(addButton);

    expect(mockProduct.onAdd).toHaveBeenCalledTimes(1);
  });

  test("calls onDecrement when - button is clicked", () => {
    render(<ProductItem {...mockProduct} />);

    const decrementButton = screen.getByText("-");
    fireEvent.click(decrementButton);

    expect(mockProduct.onDecrement).toHaveBeenCalledTimes(1);
  });

  test("calls onRemove when Remove button is clicked", () => {
    render(<ProductItem {...mockProduct} />);

    const removeButton = screen.getByText("Remove");
    fireEvent.click(removeButton);

    expect(mockProduct.onRemove).toHaveBeenCalledTimes(1);
  });
});

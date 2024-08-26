import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../App";
import { useFetchProducts } from "../api/use-fetch-products";
import { useCart } from "../hooks";

jest.mock("../api/use-fetch-products");
jest.mock("../hooks");

describe("App Component", () => {
  const mockProducts = [
    {
      id: 1,
      name: "Black Dress",
      price: 10,
      img: "https://via.placeholder.com/150",
      colour: "Black",
    },
    {
      id: 2,
      name: "Red Dress",
      price: 20,
      img: "https://via.placeholder.com/150",
      colour: "Red",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("displays loading state", () => {
    (useFetchProducts as jest.Mock).mockReturnValue({
      data: [],
      isLoading: true,
      error: null,
    });

    (useCart as jest.Mock).mockReturnValue({ total: 0 });

    render(<App />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("displays error state", () => {
    (useFetchProducts as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      error: "Error loading products",
    });

    (useCart as jest.Mock).mockReturnValue({ total: 0 });

    render(<App />);

    expect(screen.getByText("Error loading products")).toBeInTheDocument();
  });

  test("renders product list and filters products", async () => {
    (useFetchProducts as jest.Mock).mockReturnValue({
      data: mockProducts,
      isLoading: false,
      error: null,
    });

    (useCart as jest.Mock).mockReturnValue({ total: 30, cart: new Map() });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText("Black Dress")).toBeInTheDocument();
      expect(screen.getByText("Red Dress")).toBeInTheDocument();
    });

    expect(screen.getByText("Total: $30.00")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Show Black Items"));

    await waitFor(() => {
      expect(screen.queryByText("Black Dress")).toBeInTheDocument();
      expect(screen.queryByText("Red Dress")).not.toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Show All Items"));

    await waitFor(() => {
      expect(screen.getByText("Black Dress")).toBeInTheDocument();
      expect(screen.getByText("Red Dress")).toBeInTheDocument();
    });
  });
});

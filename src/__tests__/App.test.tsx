import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "../App";
import { useFetchProducts } from "../api/use-fetch-products";
import { CartProvider } from "../contexts/cart-context";

jest.mock("../api/use-fetch-products");

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

const queryClient = new QueryClient();

describe("App Component", () => {
  const setup = () =>
    render(
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <App />
        </CartProvider>
      </QueryClientProvider>
    );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("displays loading state", () => {
    (useFetchProducts as jest.Mock).mockReturnValue({
      data: [],
      isLoading: true,
      error: null,
    });

    setup();

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("displays error state", () => {
    (useFetchProducts as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      error: "Error loading products",
    });

    setup();

    expect(screen.getByText("Error loading products")).toBeInTheDocument();
  });

  test("renders product list and filters products", async () => {
    (useFetchProducts as jest.Mock).mockReturnValue({
      data: mockProducts,
      isLoading: false,
      error: null,
    });

    setup();

    expect(screen.getByText("Black Dress")).toBeInTheDocument();
    expect(screen.getByText("Red Dress")).toBeInTheDocument();

    expect(screen.getByText("Total: $0.00")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Show Black Items"));

    expect(screen.queryByText("Black Dress")).toBeInTheDocument();
    expect(screen.queryByText("Red Dress")).not.toBeInTheDocument();

    fireEvent.click(screen.getByText("Show All Items"));

    expect(screen.getByText("Black Dress")).toBeInTheDocument();
    expect(screen.getByText("Red Dress")).toBeInTheDocument();
  });

  test("should render and interact with add and decrement buttons", async () => {
    (useFetchProducts as jest.Mock).mockReturnValue({
      data: mockProducts,
      isLoading: false,
      error: null,
    });

    setup();

    expect(screen.getByText("Product Listings")).toBeInTheDocument();

    const addButton = screen.getAllByText("+")[0];
    fireEvent.click(addButton);
    fireEvent.click(addButton);

    expect(screen.getByText("Total: $20.00")).toBeInTheDocument();

    const decrementButton = screen.getAllByText("-")[0];
    fireEvent.click(decrementButton);

    expect(screen.getByText("Total: $10.00")).toBeInTheDocument();

    fireEvent.click(decrementButton);
    expect(screen.getByText("Total: $0.00")).toBeInTheDocument();
  });

  test("should render and remove the product from cart with remove button", async () => {
    (useFetchProducts as jest.Mock).mockReturnValue({
      data: mockProducts,
      isLoading: false,
      error: null,
    });

    setup();

    expect(screen.getByText("Product Listings")).toBeInTheDocument();

    const addButton = screen.getAllByText("+")[0];
    fireEvent.click(addButton);

    expect(screen.getByText("Total: $10.00")).toBeInTheDocument();

    const removeButton = screen.getAllByText("Remove")[0];
    fireEvent.click(removeButton);

    expect(screen.getByText("Total: $0.00")).toBeInTheDocument();
  });
});

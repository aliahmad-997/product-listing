import { useState } from "react";
import { useFetchProducts } from "./api/use-fetch-products";
import { ProductList } from "./components";
import { useCart } from "./hooks";

function App() {
  const [filter, setFilter] = useState<string | null>(null);

  const { data: products = [], isLoading, error } = useFetchProducts();
  const { total } = useCart();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products</div>;

  const filteredProducts = filter
    ? products.filter((p) => p.colour === filter)
    : products;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-4">Product Listings</h1>
        <div className="mt-4">
          <h2 className="text-xl font-bold">Total: ${total.toFixed(2)}</h2>
        </div>
      </div>
      <div className="mb-4">
        <button
          onClick={() => setFilter("Black")}
          className="mr-2 p-2 bg-slate-100 rounded-md"
        >
          Show Black Items
        </button>
        <button
          className="p-2 bg-slate-100 rounded-md"
          onClick={() => setFilter(null)}
        >
          Show All Items
        </button>
      </div>
      <ProductList products={filteredProducts} />
    </div>
  );
}

export default App;

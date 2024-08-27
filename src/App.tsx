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

  const colors = products.map((p) => p.colour);

  const filteredProducts =
    filter && filter !== "None"
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
        <label htmlFor="color-filter">Color Filter:</label>

        <select
          onChange={(e) => setFilter(e.currentTarget.value)}
          name="color-filter"
          id="color-filter"
        >
          {colors.map((colour) => (
            <option value={colour}>{colour}</option>
          ))}
          <option value="None">None</option>
        </select>
      </div>
      <ProductList products={filteredProducts} />
    </div>
  );
}

export default App;

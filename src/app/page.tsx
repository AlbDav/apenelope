import { client } from "@/sanity/client";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types";

const PRODUCTS_QUERY = `*[_type == 'product']{
  _id,
  title,
  tipoProdotto,
  taglie,
  colors[]{
    nome,
    hexColorCode,
    images[]{ asset->{url} }
  }
}`;

const options = { next: { revalidate: 60 } };

export default async function HomePage() {
  const products: Product[] = await client.fetch(PRODUCTS_QUERY, {}, options);

  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Prodotti disponibili</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </main>
  );
}
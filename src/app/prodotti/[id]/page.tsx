import { client } from "@/sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { Product } from "@/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Image from "next/image";

const PRODUCT_QUERY = `*[_type == 'product' && _id == $id][0]{
    _id,
    title,
    description,
    tipoProdotto,
    sizes,
    colors[]{
      name,
      hexColorCode,
      images[]{ asset->{url} }
    }
}`;

const options = { next: { revalidate: 60 } };

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product: Product = await client.fetch(PRODUCT_QUERY, { id: params.id }, options);

  return (
    <main className="container mx-auto max-w-3xl py-10 px-4">
      <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
      <p className="text-sm text-gray-500 mb-2">Tipo: {product.tipoProdotto}</p>

      <div className="mb-6">
        <label className="text-sm font-medium">Colore:</label>
        <Select>
          <SelectTrigger className="w-full mt-1">
            <SelectValue placeholder="Scegli un colore" />
          </SelectTrigger>
          <SelectContent>
            {product.colors.map((color) => (
              <SelectItem key={color.name} value={color.name}>
                {color.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="mb-6">
        <label className="text-sm font-medium">Taglia:</label>
        <Select>
          <SelectTrigger className="w-full mt-1">
            <SelectValue placeholder="Scegli una taglia" />
          </SelectTrigger>
          <SelectContent>
            {product.sizes.map((taglia) => (
              <SelectItem key={taglia} value={taglia}>
                {taglia}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Mostra le immagini del primo colore di default */}
      <div className="grid grid-cols-2 gap-4">
        {product.colors[0]?.images?.length > 0 &&
            product.colors[0].images.map((img, i) => (
            <Image
                key={i}
                src={img.asset.url}
                alt={`Immagine ${i + 1} - ${product.colors[0].name}`}
                width={400}
                height={400}
                className="rounded-xl object-cover"
            />
        ))}
      </div>
    </main>
  );
}
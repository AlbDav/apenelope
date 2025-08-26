import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@/types";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";

export default function ProductCard({ product }: { product: Product }) {
  const defaultImage = product.colors[0]?.images? product.colors[0]?.images[0]?.asset?.url : undefined;
  const defaultColor = product.colors[0]?.name;

  return (
    <Card>
      <Link href={`/prodotti/${product._id}`}>
        <CardContent className="p-4">
          {defaultImage && (
            <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-xl flex items-center justify-center">
              <Image
                src={defaultImage}
                alt={product.title}
                width={400}
                height={400}
                className="object-cover"
              />
            </AspectRatio>
          )}
          <div className="mt-4">
            <h3 className="text-lg font-semibold">{product.title}</h3>
            <p className="text-sm text-gray-500">{product.tipoProdotto}</p>
            <p className="text-sm">Colore: {defaultColor}</p>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
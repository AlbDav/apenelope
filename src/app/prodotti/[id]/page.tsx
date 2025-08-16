import ProductView from '@/components/ProductView';
import { client } from '@/sanity/client';
import { Product } from '@/types';

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
  const { id } = await params;
  const product: Product = await client.fetch(PRODUCT_QUERY, { id }, options);
  return <ProductView product={product} />;
}
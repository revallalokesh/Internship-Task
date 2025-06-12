// app/product/[id]/page.tsx
import ProductDetailClient from './ProductDetailClient';

export default function ProductPage({ params }: { params: { id: string } }) {
  return <ProductDetailClient id={params.id} />;
}

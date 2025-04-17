import ProductCard from '@components/ProductCard/ProductCard';
import type { IProduct } from 'src/@types';

export default function ProductsPage({ filteredProducts }: ProductsPageProps) {
  return (
    <div>
      <h1>Produits :</h1>
      <ul>
        {filteredProducts.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </ul>
    </div>
  );
}

interface ProductsPageProps {
  filteredProducts: IProduct[];
}

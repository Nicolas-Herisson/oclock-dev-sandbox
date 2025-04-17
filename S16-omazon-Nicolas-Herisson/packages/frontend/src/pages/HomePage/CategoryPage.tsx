import type { ICategory, IProduct } from 'src/@types';
import { useEffect, useState } from 'react';
import ProductCard from '@components/ProductCard/ProductCard';
import { useParams } from 'react-router';

import { useErrorsContext } from '@contexts/requestsAndServerError';
import { useFetchParams } from '@services/CustomFetches';

export default function CategoryPage() {
  const [productsByCategory, setProductsByCategory] = useState<IProduct[]>([]);
  const { slug } = useParams<{ slug: string }>();
  const { isLoading, isRequestError, isServerError } = useErrorsContext();
  let category: ICategory | null = null;
  if (slug)
    category = useFetchParams<ICategory>('/category', [slug], { slug }).data;

  useEffect(() => {
    // biome-ignore lint/complexity/useOptionalChain: <explanation>
    if (category && category.products) setProductsByCategory(category.products);
  }, [category]);

  return (
    <ul className="products">
      {isLoading && !isRequestError && !isServerError ? (
        <div>Chargement...</div>
      ) : isRequestError ? (
        <div>Erreur de requête</div>
      ) : isServerError ? (
        <div>Erreur du serveur</div>
      ) : productsByCategory.length > 0 ? (
        productsByCategory.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      ) : (
        <div>Aucun produit disponible</div>
      )}
    </ul>
  );
}

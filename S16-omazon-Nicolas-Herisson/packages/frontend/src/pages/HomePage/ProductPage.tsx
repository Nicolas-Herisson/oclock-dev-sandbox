import Button from '@components/Button/Button';
import { useParams } from 'react-router';
import type { IProduct } from 'src/@types';
import { useErrorsContext } from '@contexts/requestsAndServerError';
import { useFetch } from '@services/CustomFetches';

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const { isLoading, isRequestError, isServerError } = useErrorsContext();
  let product: IProduct | null = null;
  if (slug) product = useFetch<IProduct>(`/products/${slug}`, [slug]).data;

  return (
    <article className="product">
      {isLoading && !isRequestError && !isServerError ? (
        <div>Chargement...</div>
      ) : isRequestError ? (
        <div>Erreur de requête</div>
      ) : isServerError ? (
        <div>Erreur du serveur</div>
      ) : product ? (
        <>
          <div className="container">
            <img src={product.image} alt={product.title} />
          </div>
          <div className="details">
            <h3 className="title">{product.title}</h3>
            <div className="price">{product.price} €</div>
            <Button text="Ajouter au panier" />
          </div>
        </>
      ) : (
        <div>Aucun produit trouvé</div>
      )}
    </article>
  );
}

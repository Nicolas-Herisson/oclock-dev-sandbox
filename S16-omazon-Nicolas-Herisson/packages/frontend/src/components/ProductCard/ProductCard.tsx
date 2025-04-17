import Button from '@components/Button/Button';
import { NavLink } from 'react-router';
import type { IProduct } from 'src/@types';

export default function ProductCard({ product }: { product: IProduct }) {
  return (
    <li key={product.id}>
      <NavLink to={`/products/${product.slug}`}>
        {/* TODO : extraire cet <article> et le CSS associé dans un composant ProductCard.tsx */}
        <article className="product">
          <div className="container">
            <img src={product.image} alt={product.title} />
          </div>
          <div className="details">
            <h3 className="title">{product.title}</h3>
            <div className="price">{product.price} €</div>
            <Button text="Ajouter au panier" />
          </div>
        </article>
      </NavLink>
    </li>
  );
}

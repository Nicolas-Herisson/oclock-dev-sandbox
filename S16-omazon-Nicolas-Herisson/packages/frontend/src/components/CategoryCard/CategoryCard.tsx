import { Link, useParams } from 'react-router';
import type { ICategory } from 'src/@types';

export default function CategoryCard({ category }: { category: ICategory }) {
  const { slug } = useParams();

  return (
    <li key={category.id}>
      {/* TODO : extraire ce lien <a> et le CSS associé dans un composant CategoryCard.tsx */}
      <Link to={`/category/${category.slug}`} className="category">
        <div className="container">
          <img src={category.image} alt={category.title} />
          <div>{slug}</div>
        </div>
        <h3>{category.title}</h3>
      </Link>
    </li>
  );
}

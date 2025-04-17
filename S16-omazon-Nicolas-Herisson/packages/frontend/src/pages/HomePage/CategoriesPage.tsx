import { Link } from 'react-router';
import { useCategoriesContext } from '@contexts/ProductsAndCategories/ProductsAndCategoriesContexts';

export default function CategoriesPage() {
  const { categories } = useCategoriesContext();
  return (
    <div className="categories-page">
      <h1>Catégories</h1>

      <ul className="categories">
        {categories.map((category) => (
          <li key={category.id}>
            <Link to={`/category/${category.slug}`}>{category.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

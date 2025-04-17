import './HomePage.scss';
import CategoryCard from '../../components/CategoryCard/CategoryCard';
import ProductCard from '../../components/ProductCard/ProductCard';
import {
  useCategoriesContext,
  useProductsContext,
} from '@contexts/ProductsAndCategories/ProductsAndCategoriesContexts';

export default function HomePage() {
  const { categories } = useCategoriesContext();
  const { products } = useProductsContext();
  return (
    <div className="home">
      <section>
        <h2>Catégories à l'honneur</h2>

        <ul className="categories">
          {categories.slice(0, 5).map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </ul>
      </section>

      <section>
        <h2>Tous nos produits</h2>

        <ul className="products">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ul>
      </section>
    </div>
  );
}

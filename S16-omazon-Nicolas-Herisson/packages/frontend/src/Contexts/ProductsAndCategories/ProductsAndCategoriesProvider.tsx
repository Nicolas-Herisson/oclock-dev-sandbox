import type { ICategory, IProduct } from 'src/@types';
import {
  ProductsContext,
  CategoriesContext,
} from './ProductsAndCategoriesContexts';

export default function ProductsAndCategoriesProvider({
  children,
  products,
  categories,
}: {
  children: React.ReactNode;
  products: IProduct[] | null;
  categories: ICategory[] | null;
}) {
  return (
    <ProductsContext value={{ products }}>
      <CategoriesContext value={{ categories }}>{children}</CategoriesContext>
    </ProductsContext>
  );
}

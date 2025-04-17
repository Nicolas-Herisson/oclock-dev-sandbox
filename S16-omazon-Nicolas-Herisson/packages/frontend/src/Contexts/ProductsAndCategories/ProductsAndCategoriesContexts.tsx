import { createContext, useContext } from 'react';
import type { ICategory, IProduct } from 'src/@types';

interface IProductsContext {
  products: IProduct[] | null;
}

export const ProductsContext = createContext<IProductsContext>({
  products: null,
});

export const useProductsContext = () => {
  const { products } = useContext(ProductsContext);

  if (!products) {
    throw new Error('ProductsContext is not defined');
  }
  return { products };
};

interface ICategoriesContext {
  categories: ICategory[] | null;
}

export const CategoriesContext = createContext<ICategoriesContext>({
  categories: null,
});

export const useCategoriesContext = () => {
  const { categories } = useContext(CategoriesContext);
  if (!categories) {
    throw new Error('CategoriesContext is not defined');
  }
  return { categories };
};

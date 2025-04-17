import './App.scss';

import Footer from '@components/Footer/Footer';
import Header from '@components/Header/Header';
import HomePage from '@pages/HomePage/HomePage';
import { Routes, Route } from 'react-router';
import CategoriesPage from '@pages/HomePage/CategoriesPage';
import ProductPage from '@pages/HomePage/ProductPage';
import CategoryPage from '@pages/HomePage/CategoryPage';
import NotFound from '@components/404/404';
import SignupPage from '@pages/LogsPages/SignupPage';
import LoginPage from '@pages/LogsPages/LoginPage';
import ProductsPage from '@pages/HomePage/ProductsPage';
import ProductsAndCategoriesProvider from '@contexts/ProductsAndCategories/ProductsAndCategoriesProvider';
import UserAuth from '@contexts/UserContext';
import { useFetch } from '@services/CustomFetches';
import type { ICategory, IProduct } from './@types';
import { useEffect, useState } from 'react';

export default function App() {
  const { data: categories } = useFetch<ICategory[]>('/categories', []);
  const { data: products } = useFetch<IProduct[]>('/products', []);

  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  // const { categories } = api.categories;
  // const { products } = api.products;
  useEffect(() => {
    if (products) {
      setFilteredProducts(products);
    }
  }, [products]);

  return (
    <div className="app">
      <UserAuth>
        <ProductsAndCategoriesProvider
          products={products}
          categories={categories}
        >
          <Header setFilteredProducts={setFilteredProducts} />

          <main className="main">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/category/:slug" element={<CategoryPage />} />
              <Route path="/products/:slug" element={<ProductPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/products"
                element={<ProductsPage filteredProducts={filteredProducts} />}
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          <Footer />
        </ProductsAndCategoriesProvider>
      </UserAuth>
    </div>
  );
}

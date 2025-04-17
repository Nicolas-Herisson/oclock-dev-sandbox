import MagnifyingGlassIcon from '@assets/icons/magnifying-glass.svg?react';
import type { IProduct } from 'src/@types';
import './SearchBar.scss';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import {
  useCategoriesContext,
  useProductsContext,
} from '@contexts/ProductsAndCategories/ProductsAndCategoriesContexts';

export default function SearchBar({ setFilteredProducts }: SearchBarProps) {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const [searchedProducts, setSearchedProducts] = useState<IProduct[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const { categories } = useCategoriesContext();
  const { products } = useProductsContext();

  function handleSubmit(formData: FormData) {
    const search = formData.get('search') as string;

    if (search === '') {
      setFilteredProducts(products);
      setInputValue('');
      navigate('/products');
    } else {
      setInputValue('');
      setFilteredProducts(searchedProducts);

      navigate('/products');
    }
  }

  const handleSearchList = () => {
    setSearchedProducts(
      products
        .filter((product) => {
          if (
            product.category &&
            product.category.id === Number(selectedCategory)
          )
            return selectedCategory;
          if (!selectedCategory) return true;
        })
        .filter(
          (product) =>
            product.title
              .toLowerCase()
              .includes(inputValue.toLowerCase().trim()) ||
            product.description
              .toLowerCase()
              .includes(inputValue.toLowerCase().trim()),
        ),
    );
  };

  return (
    <form className="search-bar" action={handleSubmit}>
      <select
        value={selectedCategory}
        onChange={(e) => {
          setSelectedCategory(e.target.value);
          handleSearchList();
        }}
      >
        <option value="">Toutes nos catégories</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.title}
          </option>
        ))}
      </select>

      <div className="container">
        <input
          type="text"
          placeholder="Rechercher sur Omazon"
          name="search"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            handleSearchList();
          }}
        />

        {/* TODO : retirer la classe 'hidden' pour voir apparaitre les résultats, puis faire fonctionner la barre de recherche */}
        <ul className={`results ${inputValue ? '' : 'hidden'}`}>
          {searchedProducts.map((product) => (
            <li className="result" key={product.id}>
              <MagnifyingGlassIcon className="magnifying-glass-icon small" />
              <span>
                <Link
                  to={`/products/${product.slug}`}
                  onClick={() => {
                    setInputValue('');
                  }}
                >
                  {product.title}
                </Link>
              </span>
            </li>
          ))}
        </ul>
      </div>

      <button type="submit">
        <MagnifyingGlassIcon className="magnifying-glass-icon" />
        <span className="sr-only">Rechercher</span>
      </button>
    </form>
  );
}

interface SearchBarProps {
  setFilteredProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
}

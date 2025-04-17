import omazonLogoLight from '@assets/images/omazon-light.svg';
import CartIcon from '@assets/icons/cart.svg?react';
import MenuIcon from '@assets/icons/menu.svg?react';
import './Header.scss';
import type { IProduct } from 'src/@types';
import SearchBar from '@components/SearchBar/SearchBar';
import { NavLink } from 'react-router';
import { useCategoriesContext } from '@contexts/ProductsAndCategories/ProductsAndCategoriesContexts';
import { useContext } from 'react';
import { userContext } from '@contexts/UserContext';

export default function Header({ setFilteredProducts }: HeaderProps) {
  const { categories } = useCategoriesContext();
  const { user } = useContext(userContext);

  return (
    <header className="header">
      <a href="/" className="logo">
        <img src={omazonLogoLight} alt="Logo Omazon" />
      </a>

      <div className="search">
        <SearchBar setFilteredProducts={setFilteredProducts} />
      </div>

      <nav className="d-contents">
        <ul className="d-contents">
          <NavLink to="/login" className="connect">
            <div>Bonjour, {user ? user.firstname : 'identifiez-vous'}</div>
            <span className="bold">Compte et listes</span>
          </NavLink>

          <li className="cart">
            <a href="#" className="cart-link">
              <span className="cart-count">0</span>
              <CartIcon className="cart-icon" />
              <span className="cart-text bold">Panier</span>
            </a>
          </li>
        </ul>
      </nav>

      <ul className="categories">
        <li>
          <NavLink to="/categories" className="all-categories">
            <MenuIcon className="menu-icon" />
            <span>Toutes les catégories</span>
          </NavLink>
        </li>

        {categories.map((category) => (
          <li key={category.id}>
            <NavLink to={`/category/${category.slug}`}>
              {category.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </header>
  );
}

interface HeaderProps {
  setFilteredProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
}

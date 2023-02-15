import { useContext } from 'react';
import { Outlet } from 'react-router-dom';

import { ReactComponent as CrownLogo } from '../../assets/logo.svg';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import CartIcon from '../../components/cart-icon/cart-icon.component';

import { signOutUser } from '../../utils/firebase/firebase.utils';

import { CartContext } from '../../context/cart.context';
import { UserContext } from '../../context/user.context';

import {
  Logo,
  NavigationContainer,
  NavLink,
  NavLinks,
} from './navigation.styles.jsx';

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen, cartProducts } = useContext(CartContext);

  const handleSignOutUser = async () => {
    await signOutUser();
  };

  return (
    <>
      <NavigationContainer>
        <Logo to="/">
          <CrownLogo className="logo" />
        </Logo>
        <NavLinks>
          <NavLink to="/shop">SHOP</NavLink>
          {currentUser ? (
            <NavLink as="span" onClick={handleSignOutUser}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to="/auth">SIGN IN</NavLink>
          )}
          <CartIcon products={cartProducts} />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </>
  );
};

export default Navigation;

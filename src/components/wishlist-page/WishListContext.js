import React from 'react';
import HttpHelper from '../../utils/HttpHelper';

const WishListContext = React.createContext();

const wishListReducer = (wishState, action) => {
  const user = JSON.parse(sessionStorage.getItem('user'));

  switch (action.type) {
    case 'init': {
      const newProducts = action.products;
      sessionStorage.setItem('wishlist', JSON.stringify(newProducts));
      return {
        ...wishState,
        products: newProducts
      };
    }
    case 'delete': {
      console.log('delete inside context');
      console.log(action);
      console.log(wishState);
      const newProducts = wishState.products.filter(
        (product) => product.id !== action.product.id
      );
      sessionStorage.setItem('wishlist', JSON.stringify(newProducts));
      if (user !== null) {
        const route = `/users/customers/${user.id}`;
        const payload = { ...user, wishlist: newProducts };
        HttpHelper(route, 'PUT', payload)
          .then((response) => (response.json()))
          .then((data) => (console.log(data)))
          .catch((error) => (console.log(error)));
      }
      return {
        ...wishState,
        products: newProducts
      };
    }
    case 'add': {
      const newProducts = [...wishState.products, action.product];
      sessionStorage.setItem('wishlist', JSON.stringify(newProducts));
      if (user !== null) {
        const route = `/users/customers/${user.id}`;
        const payload = { ...user, wishlist: newProducts };
        HttpHelper(route, 'PUT', payload)
          .then((response) => (response.json()))
          .then((data) => (console.log(data)))
          .catch((error) => (console.log(error)));
      }
      return {
        ...wishState,
        products: newProducts
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

const WishListProvider = ({ children }) => {
  const storedWishList = JSON.parse(sessionStorage.getItem('wishlist'));
  console.log(storedWishList);
  let initialProducts = {};
  if (storedWishList === null) {
    initialProducts = {
      products: [],
      setProducts: () => { }
    };
  } else {
    initialProducts = {
      products: storedWishList,
      setProducts: () => { }
    };
  }

  const [wishState, wishDispatch] = React.useReducer(wishListReducer, initialProducts);

  const value = { wishState, wishDispatch };

  return (
    <WishListContext.Provider value={value}>
      {children}
    </WishListContext.Provider>
  );
};

const useWishList = () => {
  const context = React.useContext(WishListContext);
  if (context === undefined) {
    throw new Error('useWishListDispatch must be used within a WishListProvider');
  }
  return context;
};

export { WishListProvider, useWishList, WishListContext };

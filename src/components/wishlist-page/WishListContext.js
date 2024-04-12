import React from 'react';
import HttpHelper from '../../utils/HttpHelper';

const WishListContext = React.createContext();

const persistWishlistToDatabase = (products) => {
  if (products?.length > 0) {
    sessionStorage.setItem('wishlist', JSON.stringify(products));

    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user) {
      const route = `/users/customers/${user.id}`;
      const payload = { ...user, wishlist: products };

      HttpHelper(route, 'PUT', payload)
        .then((response) => {
          if (response.ok) {
            user.wishlist = products;
            sessionStorage.setItem('user', JSON.stringify(user));
          } else {
            console.error('Failed to update wishlist data:', response.statusText);
          }
        })
        .catch((error) => {
          console.error('Error updating wishlist data:', error.message);
        });
    } else {
      console.warn('User is not logged in. Wishlist data will not be persisted.');
    }
  }
};

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
      const newProducts = wishState.products.filter(
        (product) => product.id !== action.product.id
      );

      // deletes the last item in the wishlist
      if (newProducts?.length === 0) {
        sessionStorage.removeItem('wishlist');

        user.wishlist = [newProducts];
        sessionStorage.setItem('user', JSON.stringify(user));

        const route = `/users/customers/${user.id}`;
        const payload = { ...user };

        HttpHelper(route, 'PUT', payload)
          .then((response) => {
            if (response.ok) {
              (response.json());
            } else {
              console.error('Failed to update user data:', response.statusText);
            }
          })
          .catch((error) => {
            console.error('Error updating user data:', error.message);
          });

        return {
          ...wishState,
          products: newProducts
        };
      }

      persistWishlistToDatabase(newProducts);
      return {
        ...wishState,
        products: newProducts
      };
    }
    case 'add': {
      const newProducts = [...wishState.products, action.product];
      persistWishlistToDatabase(newProducts);
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

export {
  WishListProvider, useWishList, WishListContext, persistWishlistToDatabase
};

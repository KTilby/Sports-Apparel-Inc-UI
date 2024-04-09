import React from 'react';
import HttpHelper from '../../utils/HttpHelper';
// import constants from '../../utils/constants';

const CartContext = React.createContext();

const cartReducer = (state, action) => {
  const user = JSON.parse(sessionStorage.getItem('user'));
  switch (action.type) {
    case 'init': {
      const newProducts = action.products;
      const newItemCount = action.itemCount;
      const storedProds = JSON.parse(sessionStorage.getItem('cart'));
      const storedCount = sessionStorage.getItem('itemCount');
      if (storedProds !== null) {
        const combinedProducts = newProducts.concat(storedProds);
        const combinedCount = Number(newItemCount) + Number(storedCount);
        sessionStorage.setItem('cart', JSON.stringify(combinedProducts));
        sessionStorage.setItem('itemCount', combinedCount);
        return {
          ...state,
          products: combinedProducts,
          itemCount: combinedCount
        };
      }
      sessionStorage.setItem('cart', JSON.stringify(newProducts));
      sessionStorage.setItem('itemCount', newItemCount);
      return {
        ...state,
        products: newProducts,
        itemCount: newItemCount
      };
    }
    case 'delete': {
      const newProducts = state.products.filter(
        (product) => product.id !== action.product.id
      );
      const newItemCount = newProducts.reduce((total, product) => total + product.quantity, 0);
      sessionStorage.setItem('cart', JSON.stringify(newProducts));
      sessionStorage.setItem('itemCount', newItemCount);
      if (user !== null) {
        const route = `/users/customers/${user.id}`;
        const payload = { ...user, savedCart: [newProducts, newItemCount] };
        HttpHelper(route, 'PUT', payload)
          .then((response) => (response.json()))
          .then((data) => (console.log(data)))
          .catch((error) => (console.log(error)));
      }
      return {
        ...state,
        products: newProducts,
        itemCount: newItemCount
      };
    }
    case 'add': {
      const newProducts = [...state.products, action.product];
      const newItemCount = newProducts.reduce((total, product) => total + product.quantity, 0);
      sessionStorage.setItem('cart', JSON.stringify(newProducts));
      sessionStorage.setItem('itemCount', newItemCount);
      if (user !== null) {
        const route = `/users/customers/${user.id}`;
        const payload = { ...user, savedCart: [newProducts, newItemCount] };
        HttpHelper(route, 'PUT', payload)
          .then((response) => (response.json()))
          .then((data) => (console.log(data)))
          .catch((error) => (console.log(error)));
      }
      return {
        ...state,
        products: newProducts,
        itemCount: newItemCount
      };
    }
    case 'update': {
      const { id, quantity } = action;
      const updateProducts = state.products.map((product) => {
        if (product.id === id) {
          return { ...product, quantity };
        }
        return product;
      });
      const newItemCount = updateProducts.reduce((total, product) => total + product.quantity, 0);
      sessionStorage.setItem('cart', JSON.stringify(updateProducts));
      sessionStorage.setItem('itemCount', newItemCount);
      if (user !== null) {
        const route = `/users/customers/${user.id}`;
        const payload = { ...user, savedCart: [updateProducts, newItemCount] };
        console.log(payload);
        HttpHelper(route, 'PUT', payload)
          .then((response) => (response.json()))
          .then((data) => (console.log(data)))
          .catch((error) => (console.log(error)));
      }
      return {
        ...state,
        products: updateProducts,
        itemCount: newItemCount
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

const CartProvider = ({ children }) => {
  const userCart = JSON.parse(sessionStorage.getItem('cart'));
  const userItemCount = JSON.parse(sessionStorage.getItem('itemCount'));
  let initialProducts = {};
  if (userCart === null) {
    initialProducts = {
      products: [],
      itemCount: 0,
      setProducts: () => { }
    };
  } else {
    initialProducts = {
      products: userCart,
      itemCount: userItemCount,
      setProducts: () => { }
    };
  }

  // Item Count
  const itemCount = initialProducts.products.reduce(
    (total, product) => total + product.quantity, 0
  );

  const [state, dispatch] = React.useReducer(cartReducer, initialProducts);

  const value = { state, dispatch, itemCount };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = React.useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCartDispatch must be used within a CartProvider');
  }
  return context;
};

export { CartProvider, useCart, CartContext };

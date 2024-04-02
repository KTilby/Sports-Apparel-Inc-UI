import React from 'react';

const CartContext = React.createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'delete': {
      const newProducts = state.products.filter(
        (product) => product.id !== action.product.id
      );
      const newItemCount = newProducts.reduce((total, product) => total + product.quantity, 0);
      return {
        ...state,
        products: newProducts,
        itemCount: newItemCount
      };
    }
    case 'add': {
      const newProducts = [...state.products, action.product];
      const newItemCount = newProducts.reduce((total, product) => total + product.quantity, 0);
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
  const initialProducts = {
    products: [],
    itemCount: 0,
    setProducts: () => { }
  };

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

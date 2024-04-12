import React from 'react';
import HttpHelper from '../../utils/HttpHelper';

const CartContext = React.createContext();

const persistCartToDatabase = (products, itemCount) => {
  if (products?.length > 0 && itemCount > 0) {
    sessionStorage.setItem('cart', JSON.stringify(products));
    sessionStorage.setItem('itemCount', itemCount);

    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user) {
      const route = `/users/customers/${user.id}`;
      const payload = { ...user, savedCart: [products, itemCount] };

      HttpHelper(route, 'PUT', payload)
        .then((response) => {
          if (response.ok) {
            user.savedCart = [products, itemCount];
            sessionStorage.setItem('user', JSON.stringify(user));
          } else {
            console.error('Failed to update cart data:', response.statusText);
          }
        })
        .catch((error) => {
          console.error('Error updating cart data:', error.message);
        });
    } else {
      console.warn('User is not logged in. Cart data will not be persisted.');
    }
  } else {
    console.warn('No data to save. Cart data will not be persisted.');
  }
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'init': {
      const storedProducts = action.products; // products from database
      const storedItemCount = action.itemCount;
      // products currently in cart before login
      const newProducts = JSON.parse(sessionStorage.getItem('cart'));
      console.log(newProducts);
      console.log(storedProducts, storedItemCount);

      // if products on DB but none in the cart, nothing needs to be saved to DB
      if ((newProducts?.length === 0 || newProducts === null) && storedItemCount > 0) {
        sessionStorage.setItem('cart', JSON.stringify(storedProducts));
        sessionStorage.setItem('itemCount', storedItemCount);
        return {
          ...state,
          products: storedProducts,
          itemCount: storedItemCount
        };
      }

      if (newProducts?.length > 0 && storedItemCount > 0) {
        const combinedProducts = [...storedProducts];

        // Add products from cart to products from DB
        newProducts.forEach((newProduct) => {
          const existingProductIndex = combinedProducts.findIndex(
            (product) => product.id === newProduct.id
          );
          if (existingProductIndex !== -1) {
            // Product exists in the cart, update its quantity
            combinedProducts[existingProductIndex].quantity += newProduct.quantity;
          } else {
            // Product doesn't exist in the cart, add it
            combinedProducts.push(newProduct);
          }
        });
        const combinedItemCount = combinedProducts.reduce(
          (total, product) => total + product.quantity, 0
        );
        persistCartToDatabase(combinedProducts, combinedItemCount);
        return {
          ...state,
          products: combinedProducts,
          itemCount: combinedItemCount
        };
      }
      // No products in the cart b4 login and no products in database
      return state;
    }
    case 'delete': {
      const newProducts = state.products.filter(
        (product) => product.id !== action.product.id
      );

      // deletes the last item in the cart
      if (newProducts?.length === 0) {
        sessionStorage.removeItem('cart');
        sessionStorage.removeItem('itemCount');

        const user = JSON.parse(sessionStorage.getItem('user'));
        if (user) {
          user.savedCart = [newProducts, 0];
          sessionStorage.setItem('user', JSON.stringify(user));
        }
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
          ...state,
          products: newProducts,
          itemCount: 0
        };
      }

      const newItemCount = newProducts.reduce((total, product) => total + product.quantity, 0);
      persistCartToDatabase(newProducts, newItemCount);
      return {
        ...state,
        products: newProducts,
        itemCount: newItemCount
      };
    }
    case 'add': {
      const newProducts = [...state.products, action.product];
      const newItemCount = newProducts.reduce((total, product) => total + product.quantity, 0);
      persistCartToDatabase(newProducts, newItemCount);
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
      persistCartToDatabase(updateProducts, newItemCount);
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

export {
  CartProvider, useCart, CartContext, persistCartToDatabase
};

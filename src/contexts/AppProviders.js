import React from 'react';
import { ProductProvider } from './ProductContext';
import { CartProvider } from '../components/checkout-page/CartContext';
import { LoaderProvider } from './LoaderContext';
import { WishListProvider } from '../components/wishlist-page/WishListContext';

const AppProviders = ({ children }) => (
  <LoaderProvider>
    <ProductProvider>
      <CartProvider>
        <WishListProvider>
          {children}
        </WishListProvider>
      </CartProvider>
    </ProductProvider>
  </LoaderProvider>
);

export default AppProviders;

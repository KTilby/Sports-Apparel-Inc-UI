import React, { createContext, useState, useEffect } from 'react';
import { fetchProducts } from '../product-page/ProductPageService';

export const SideNavContext = createContext();

export const SideNavProvider = ({ children }) => {
  const [types, setTypes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts(setProducts, setApiError);
  }, []);

  useEffect(() => {
    const fetchTypesAndCategories = async () => {
      try {
        const uniqueTypes = [...new Set(products.map((product) => product.type))];
        const uniqueCategories = [...new Set(products.map((product) => product.category))];
        setTypes(uniqueTypes);
        setCategories(uniqueCategories);
      } catch (error) {
        setApiError(true);
      }
    };

    fetchTypesAndCategories();
  }, [products]);

  return (
    <SideNavContext.Provider value={{
      types, setTypes, categories, setCategories, apiError
    }}
    >
      {children}
    </SideNavContext.Provider>
  );
};

export default SideNavProvider;

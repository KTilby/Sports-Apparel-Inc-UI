import React, { createContext, useState, useEffect } from 'react';
import { fetchProducts, setDemographic } from '../components/product-page/ProductPageService';
import { useLoader } from './LoaderContext';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [types, setTypes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [demographics, setDemographics] = useState([]);
  const [petBrands, setPetBrands] = useState([]);
  const [petCategories, setPetCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [apiError, setApiError] = useState(false);
  const { loading, startLoading, stopLoading } = useLoader();

  useEffect(() => {
    let isMounted = true;
    startLoading();
    setDemographic('');
    fetchProducts(setProducts, setApiError)
      .then(() => {
        if (isMounted) {
          stopLoading();
        }
      })
      .catch(() => {
        if (isMounted) {
          setApiError(true);
          stopLoading();
        }
      });
    return () => {
      isMounted = false;
    };
  }, [startLoading, stopLoading]);

  useEffect(() => {
    const fetchCategoriesAndPetData = async () => {
      const nonePetProducts = products.filter((product) => product.demographic !== 'Pets');
      const petProducts = products.filter((product) => product.demographic === 'Pets');

      const uniqueCategories = [...new Set(nonePetProducts.map((product) => product.category))];
      setCategories(uniqueCategories);

      const uniquePetBrands = [...new Set(petProducts.map((petProduct) => petProduct.name))];
      const uniquePetCategories = [...new Set(petProducts.map(
        (petProduct) => petProduct.category
      ))];
      setPetBrands(uniquePetBrands);
      setPetCategories(uniquePetCategories);
    };

    fetchCategoriesAndPetData();
  }, [products]);

  useEffect(() => {
    const fetchTypesAndDemographics = async () => {
      const uniqueTypes = [...new Set(products.map((product) => product.type))];
      const uniqueDemographics = [...new Set(products.map((product) => product.demographic))];
      setTypes(uniqueTypes);
      setDemographics(uniqueDemographics);
    };
    fetchTypesAndDemographics();
  }, [products]);

  // create list of newest and popular products for use on the page
  products.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
  const newestProducts = products.slice(0, 5);
  const popularProducts = products.slice(6, 10);

  return (
    <ProductContext.Provider value={{
      types,
      setTypes,
      categories,
      setCategories,
      demographics,
      newestProducts,
      popularProducts,
      products,
      setProducts,
      apiError,
      setApiError,
      petBrands,
      setPetBrands,
      petCategories,
      setPetCategories,
      loading
    }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;

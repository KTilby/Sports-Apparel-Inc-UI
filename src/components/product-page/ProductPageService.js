import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';

let group = '';

/**
 *
 * @name fetchProducts
 * @description Utilizes HttpHelper to make a get request to an API
 * @param {*} demographic optional param of demographic to query
 * @param {*} setProducts sets state for products
 * @param {*} setApiError sets error if response other than 200 is returned
 * @returns sets state for products if 200 response, else sets state for apiError
 */
export const fetchProducts = async (setProducts, setApiError) => {
  let endpoint = '/products';

  // If group is present, will append the endpoint
  if (group) {
    endpoint += `?demographic=${group}`;
  }

  await HttpHelper(endpoint, 'GET')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(Constants.API_ERROR);
    })
    .then(setProducts)
    .catch(() => {
      setApiError(true);
    });
};

/**
 * @name fetchProductById
 * @description Utilizes HttpHelper to make a GET request to fetch a product by its ID
 * @param {*} productId the ID of the product to fetch
 * @param {*} setProduct sets state for product
 * @param {*} setApiError sets error if response other than 200 is returned
 * @returns a promise resolving to the product data
 * @returns sets state for products if 200 response, else sets state for apiError
 */
export const fetchProductById = async (productId, setProduct, setApiError) => {
  const endpoint = `/products/${productId}`;

  return HttpHelper(endpoint, 'GET')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(Constants.API_ERROR);
    })
    .then(setProduct)
    .catch((error) => {
      console.error('Error fetching product by ID:', error);
      setApiError(true);
    });
};

// Function to set group
export function setDemographic(demographic) {
  group = demographic;
}

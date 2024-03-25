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
export default async function fetchProducts(setProducts, setApiError) {
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
}

// Function to set group
export function setDemographic(demographic) {
  group = demographic;
}

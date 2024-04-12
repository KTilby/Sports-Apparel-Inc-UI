/**
 * converts a price to a formatted string
 * @param {number} price
 * @returns {string} formatted price
 */
export const toPrice = (price) => `$${price.toFixed(2)}`;

/**
 * Gets the subtotal of an order
 * @param {Object []} products
 * @returns Number
 */
export const getSubtotal = (products) => {
  if (products.length > 0) {
    return (products.reduce(
      (acc, item) => acc + (item.quantity * item.price), 0
    ));
  }
  return (0);
};

export const calculateTaxes = (subtotal, taxRate) => (subtotal * taxRate);

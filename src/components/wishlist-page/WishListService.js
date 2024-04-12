const wishListService = {
  addToWishList: (product, wishDispatch, wishState) => {
    // use Array.findIndex() to see if the product already exists in the cart
    const existingProductIndex = wishState.products?.findIndex((item) => item.id === product.id);
    if (existingProductIndex !== -1) {
      window.alert('This item is already saved to your wishlist.');
    } else {
      wishDispatch({
        type: 'add',
        product
      });
    }
  },
  deleteFromWishList: (product, wishDispatch) => {
    wishDispatch({
      type: 'delete',
      product: {
        id: product.id
      }
    });
  },
  initializeWishList: (products, wishDispatch) => {
    wishDispatch({
      type: 'init',
      products
    });
  }
};
export default wishListService;

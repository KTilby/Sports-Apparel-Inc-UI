// import getImage from '../../utils/productImageControl';

const wishListService = {
  addToWishList: (product, wishDispatch, wishState) => {
    // use Array.findIndex() to see if the product already exists in the cart
    const existingProductIndex = wishState.products?.findIndex((item) => item.id === product.id);
    if (existingProductIndex !== -1) {
      window.alert('item already exists');
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

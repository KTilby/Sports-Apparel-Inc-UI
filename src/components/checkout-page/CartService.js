import getImage from '../../utils/productImageControl';

const cartService = {
  addToCart: (product, dispatch, state) => {
    // use Array.findIndex() to see if the product already exists in the cart
    const existingProductIndex = state.products?.findIndex((item) => item.id === product.id);

    // if existingProductIndex is -1 = Product doesn't exist in cart
    if (existingProductIndex === -1) {
      dispatch({
        type: 'add',
        product: {
          id: product.id,
          name: product.name,
          price: product.price,
          category: product.category,
          description: product.description,
          demographic: product.demographic,
          type: product.type,
          quantity: 1,
          pets: product.pets,
          image: getImage(product.category, product.pets)
        }
      });
    } else {
      dispatch({
        type: 'update',
        id: product.id,
        quantity: state.products[existingProductIndex].quantity + 1
      });
    }
  },
  deleteFromCart: (product, dispatch) => {
    dispatch({
      type: 'delete',
      product: {
        id: product.id
      }
    });
  },
  initializeCart: (products, itemCount, dispatch) => {
    dispatch({
      type: 'init',
      products,
      itemCount
    });
  }
};

export default cartService;

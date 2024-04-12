import CartService from './CartService';
import Baseball from '../../assets/images/product-images/Baseball.jpg';

// Defines a mock product
const product = {
  id: 1,
    name: 'Product 1',
    description: 'Description 1',
    longDescription: 'Description 2',
    demographic: 'Men',
    category: 'Baseball',
    type: 'Type 1',
    releaseDate: '04-20-1942',
    primaryColorCodeWithName: '#6CABDD|sky blue',
    secondaryColorCodeWithName: '#E0B0FF|mauve',
    styleNumber: 'sc68234',
    globalProductCode: 'po-3869517',
    active: true,
    pets: false,
    price: 10.99,
    image: Baseball,
    quantity: 1
};
  
describe('CartService', () => {
  test('addToCart function adds product to cart', () => {
    const dispatch = jest.fn();
    const state = {
      products: []
    };

    // Call addToCart function
    CartService.addToCart(product, dispatch, state);

    expect(dispatch).toHaveBeenCalledWith({
      type: 'add',
      product: {
        id: 1,
        name: 'Product 1',
        description: 'Description 1',
        demographic: 'Men',
        category: 'Baseball',
        type: 'Type 1',
        pets: false,
        price: 10.99,
        image: Baseball,
        quantity: 1
      }
    });
  });

  test('addToCart function updates quantity when product exists in cart', () => {
    const dispatch = jest.fn();
    const state = {
      products: [{
        id: 1,
        name: 'Product 1',
        description: 'Description 1',
        demographic: 'Men',
        category: 'Baseball',
        type: 'Type 1',
        pets: false,
        price: 10.99,
        image: Baseball,
        quantity: 1
      }]
    };

    CartService.addToCart(product, dispatch, state);

    expect(dispatch).toHaveBeenCalledWith({
      type: 'update',
      id: 1,
      quantity: 2
    });
  });

  test('deleteFromCart function deletes product from cart', () => {
    const dispatch = jest.fn();

    // Call deleteFromCart function
    CartService.deleteFromCart(product, dispatch);

    // Expect dispatch to have been called with correct arguments
    expect(dispatch).toHaveBeenCalledWith({
      type: 'delete',
      product: {
        id: 1
      }
    });
  });

  test('initializeCart function initializes cart with existing products and item count', () => {
    const dispatch = jest.fn();
    const products = [{
      id: 1,
      name: 'Product 1',
      description: 'Description 1',
      demographic: 'Men',
      category: 'Baseball',
      type: 'Type 1',
      pets: false,
      price: 10.99,
      image: Baseball,
      quantity: 1
    }];
    const itemCount = 1;

    CartService.initializeCart(products, itemCount, dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: 'init',
      products: products,
      itemCount: itemCount
    });
  });

});

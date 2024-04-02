import CartService from './CartService';
import getImage from '../../utils/productImageControl';

// Mock the getImage function
jest.mock('../../utils/productImageControl', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue('Baseball.jpg')
}));

describe('CartService', () => {
  test('addToCart function adds product to cart', () => {
    const dispatch = jest.fn();
    const state = {
      products: []
    };

    // Defines a mock product
    const product = {
      id: 1,
      name: 'Product 1',
      price: 10,
      category: 'Baseball',
      description: 'Description 1',
      demographic: 'Demographic 1',
      type: 'Type 1',
      quantity: 1
    };

    // Call addToCart function
    CartService.addToCart(product, dispatch, state);

    // Expect dispatch to have been called with correct arguments
    expect(dispatch).toHaveBeenCalledWith({
      type: 'add',
      product: {
        id: 1,
        title: 'Product 1',
        price: 10,
        category: 'Baseball',
        description: 'Description 1',
        demographic: 'Demographic 1',
        type: 'Type 1',
        quantity: 1,
        image: getImage(product.category)
      }
    });
  });

  test('deleteFromCart function deletes product from cart', () => {
    const dispatch = jest.fn();

    const product = {
      id: 1,
      name: 'Product 1',
      price: 10,
      description: 'Description 1',
      quantity: 1
    };

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
});

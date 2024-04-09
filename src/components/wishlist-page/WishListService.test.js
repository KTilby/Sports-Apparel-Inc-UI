import WishListService from './WishListService';
import getImage from '../../utils/productImageControl';

// Mock the getImage function
jest.mock('../../utils/productImageControl', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue('Baseball.jpg')
}));

describe('WishListService', () => {
  test('addToWishList function adds product to WishList', () => {
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
      pets: false,
      quantity: 1
    };

    // Call addToWishList function
    WishListService.addToWishList(product, dispatch, state);

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

  test('deleteFromWishList function deletes product from WishList', () => {
    const dispatch = jest.fn();

    const product = {
      id: 1,
      name: 'Product 1',
      price: 10,
      description: 'Description 1',
      quantity: 1
    };

    // Call deleteFromWishList function
    WishListService.deleteFromWishList(product, dispatch);

    // Expect dispatch to have been called with correct arguments
    expect(dispatch).toHaveBeenCalledWith({
      type: 'delete',
      product: {
        id: 1
      }
    });
  });
});

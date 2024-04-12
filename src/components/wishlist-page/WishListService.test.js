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
      description: 'Description 1',
      longDescription: 'Description 2',
      demographic: 'Demographic 1',
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
      image: getImage('Baseball'),
      quantity: 1
    };

    // Call addToWishList function
    WishListService.addToWishList(product, dispatch, state);

    // Expect dispatch to have been called with correct arguments
    expect(dispatch).toHaveBeenCalledWith({
      type: 'add',
      product: {
        id: 1,
        name: 'Product 1',
        description: 'Description 1',
        longDescription: 'Description 2',
        demographic: 'Demographic 1',
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
        image: getImage('Baseball'),
        quantity: 1
      }
    });
  });

  test('deleteFromWishList function deletes product from WishList', () => {
    const dispatch = jest.fn();

    const product = {
      id: 1,
      name: 'Product 1',
      description: 'Description 1',
      longDescription: 'Description 2',
      demographic: 'Demographic 1',
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
      image: getImage('Baseball'),
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

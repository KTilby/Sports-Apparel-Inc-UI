import Baseball from '../assets/images/product-images/Baseball.jpg';
import Basketball from '../assets/images/product-images/Basketball.jpg';
import Boxing from '../assets/images/product-images/Boxing.jpg';
import Football from '../assets/images/product-images/Football.jpg';
import Golf from '../assets/images/product-images/Golf.jpg';
import Hockey from '../assets/images/product-images/Hockey.jpg';
import Running from '../assets/images/product-images/Running.jpg';
import Skateboarding from '../assets/images/product-images/Skateboarding.jpg';
import Soccer from '../assets/images/product-images/Soccer.jpg';
import Weightlifting from '../assets/images/product-images/Weightlifting.jpg';

const productImageControl = (category) => {
  const images = [
    Baseball,
    Basketball,
    Boxing,
    Football,
    Golf,
    Hockey,
    Running,
    Skateboarding,
    Soccer,
    Weightlifting];

  switch (category) {
    case 'Baseball':
      return images[0];
    case 'Basketball':
      return images[1];
    case 'Boxing':
      return images[2];
    case 'Football':
      return images[3];
    case 'Golf':
      return images[4];
    case 'Hockey':
      return images[5];
    case 'Running':
      return images[6];
    case 'Skateboarding':
      return images[7];
    case 'Soccer':
      return images[8];
    case 'Weightlifting':
      return images[9];
    default:
      return null;
  }
};

export default productImageControl;

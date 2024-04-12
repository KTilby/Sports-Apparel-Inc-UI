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
// Pets Images
import Swimming from '../assets/images/product-images/pets/Swimming.png';
import Outdoors from '../assets/images/product-images/pets/OutdoorAdventure.jpg';
import SpringPole from '../assets/images/product-images/pets/SpringPole.jpg';
import PlayGyms from '../assets/images/product-images/pets/PlayGyms.png';
import CarRides from '../assets/images/product-images/pets/CarRides.png';
import { PLACEHOLDER_IMAGE } from './constants';

const productImageControl = (category, isPets) => {
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

  if (isPets) {
    switch (category) {
      case 'Spring Pole':
        return SpringPole;
      case 'Car Rides':
        return CarRides;
      case 'Play Gyms':
        return PlayGyms;
      case 'Swimming':
        return Swimming;
      case 'Outdoors':
        return Outdoors;
      default:
        return PLACEHOLDER_IMAGE;
    }
  } else {
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
        return PLACEHOLDER_IMAGE;
    }
  }
};

export default productImageControl;

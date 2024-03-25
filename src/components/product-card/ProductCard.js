import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import styles from './productCard.module.css';
import Constants from '../../utils/constants';
import { useCart } from '../checkout-page/CartContext';
import Button from '../button/Button';

/**
 * @name ProductCard
 * @description displays single product card component
 * @param {*} props product
 * @return component
 */
const ProductCard = ({ product, setOpen, setCurrentProd }) => {
  const { dispatch } = useCart();

  const onAdd = () => {
    dispatch({
      type: 'add',
      product: {
        id: product.id,
        title: product.name,
        price: product.price,
        description: product.description,
        quantity: 1
      }
    });
  };

  function openModal() {
    setOpen();
    setCurrentProd(product);
  }

  return (
    <Card className={styles.root}>
      <CardHeader
        classes={{
          root: styles.header,
          title: styles.title,
          subheader: styles.subheader,
          action: styles.action
        }}
        avatar={(
          <Avatar aria-label="demographics" className={styles.avatar}>
            {product.demographic.charAt(0)}
          </Avatar>
        )}
        action={(
          <IconButton className={styles.settingsButton} aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        )}
        title={product.name}
        subheader={`${product.demographic} ${product.category}${'\n'} ${product.type}`}
        titleTypographyProps={{ variant: 'h6' }}

      />
      <CardMedia
        className={styles.media}
        image={Constants.PLACEHOLDER_IMAGE}
        title="placeholder"
      />
      <CardContent>
        <Typography className={styles.typography} component="p">
          {product.description}
        </Typography>
        <br />
        <Typography className={styles.typography} component="p">
          Price: $
          {product.price}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton aria-label="add to shopping cart" onClick={onAdd}>
          <AddShoppingCartIcon />
        </IconButton>
        <Button className="viewButton" onClick={openModal} aria-label="view product details">
          View
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;

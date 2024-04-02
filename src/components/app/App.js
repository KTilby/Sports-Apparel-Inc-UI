import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { StylesProvider } from '@material-ui/core/styles';
import styles from './App.module.css';
import HomePage from '../home-page/HomePage';
import CheckoutPage from '../checkout-page/NewCheckoutPage';
import ConfirmationPage from '../confirmation-page/ConfirmationPage';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import SearchResults from '../search/SearchResults';
import DemographicPage from '../demographic-page/DemographicPage';
import ProductDetailPage from '../product-page/ProductDetailPage';

/**
 * @name App
 * @returns component
 */
const App = () => (
  <StylesProvider injectFirst>
    <BrowserRouter>
      <div className={styles.App}>
        <Header />
        <Switch>
          <Route exact path="/" render={() => <HomePage />} />
          <Route exact path="/checkout" render={() => <CheckoutPage />} />
          <Route exact path="/confirmation" render={() => <ConfirmationPage />} />
          <Route exact path="/men" render={() => <DemographicPage demographic="Men" />} />
          <Route exact path="/women" render={() => <DemographicPage demographic="Women" />} />
          <Route exact path="/kids" render={() => <DemographicPage demographic="Kids" />} />
          <Route exact path="/search-results" render={() => <SearchResults />} />
          <Route path="/products/:productId" render={() => <ProductDetailPage />} />
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  </StylesProvider>
);

export default App;

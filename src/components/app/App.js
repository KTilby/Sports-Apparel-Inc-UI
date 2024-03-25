import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { StylesProvider } from '@material-ui/core/styles';
import HomePage from '../home-page/HomePage';
import CheckoutPage from '../checkout-page/CheckoutPage';
import ConfirmationPage from '../confirmation-page/ConfirmationPage';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import SearchResults from '../search/SearchResults';
import DemographicPage from '../demographic-page/DemographicPage';

/**
 * @name App
 * @returns component
 */
const App = () => (
  <StylesProvider injectFirst>
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" render={() => <HomePage />} />
        <Route exact path="/checkout" render={() => <CheckoutPage />} />
        <Route exact path="/confirmation" render={() => <ConfirmationPage />} />
        <Route exact path="/men" render={() => <DemographicPage demographic="Men" />} />
        <Route exact path="/women" render={() => <DemographicPage demographic="Women" />} />
        <Route exact path="/kids" render={() => <DemographicPage demographic="Kids" />} />
        <Route exact path="/search-results" render={() => <SearchResults />} />
      </Switch>
      <Footer />
    </BrowserRouter>
  </StylesProvider>
);

export default App;

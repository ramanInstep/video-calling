/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, BrowserRouter, Route } from 'react-router-dom';

import HomePage from '../HomePage';
// import FeaturePage from 'containers/FeaturePage/Loadable';
// import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

import GlobalStyle from '../../global-styles';

import "../../assets/css/styles.css";
import "../../assets/css/bootstrap.min.css";
const AppWrapper = styled.div`
  margin: 0 auto; 
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

export default function App() {
  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - Meraki Products"
        defaultTitle="Meraki Products"
      >
        <meta name="description" content="A Meraki Products application" />
      </Helmet>
      <Header />
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />
          {/* <Route path="/features" component={FeaturePage} />
        <Route path="" component={NotFoundPage} /> */}
        </Switch>
      </BrowserRouter>
      <Footer />
      <GlobalStyle />
    </AppWrapper>
  );
}

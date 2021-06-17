import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
const key = 'home';

export function HomePage({}) {
  return (
    <article>
      <Helmet>
        <title>Home Page</title>
        <meta
          name="description"
          content="A React.js Boilerplate application homepage"
        />
      </Helmet>
      <div className="">
        {/* <QuoteHeader /> */}

        <div className="container-fluid p-0">
          <div className="quote-product-main">
            <div className="col-12 text-center pt-5 pb-3 quote-product-main-hdg">
              {/* <h2>Home</h2> */}
            </div>
          </div>
          <div className="container">

            <div className="col-12 product-mdl-main">
              <div className="row mt-5 pb-5">

                Home Page                 

              </div>
            </div>
          </div>
        </div>

      </div>
    </article>
  );
}

HomePage.propTypes = {
  
};

const mapStateToProps = createStructuredSelector({
  
});

export function mapDispatchToProps(dispatch) {
  return {
    
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomePage);

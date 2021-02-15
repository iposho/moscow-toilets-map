import React from 'react';
import PropTypes from 'prop-types';

import Header from './Header';
import ApiInfo from './ApiInfo';

const Layout = ({ children, info }) => (
  <main>
    <Header />
    {children}
    <ApiInfo info={info} />
  </main>
);

Layout.defaultProps = {
  children: null,
  info: null,
};

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  info: PropTypes.object,
};

export default Layout;

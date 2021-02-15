import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { filterClosedToilets } from '../../../store/actions';

import './index.scss';

const Header = (props) => {
  const handleChange = () => {
    props.filterClosedToilets();
  };

  return (
    <header className="header">
      <span className="header-title">
        {process.env.REACT_APP_WEBSITE_NAME}
      </span>
      <label htmlFor="filter">
        <input
          type="checkbox"
          defaultChecked={props.isFiltered}
          onChange={handleChange}
          id="filter"
        />
        Только работающие
      </label>
    </header>
  );
};

const mapStateToProps = (state) => ({
  ...state.app,
});

const mapDispatchToProps = () => (dispatch) => ({
  filterClosedToilets: () => dispatch(filterClosedToilets()),
});

Header.defaultProps = {
  isFiltered: false,
  filterClosedToilets: () => {},
};

Header.propTypes = {
  isFiltered: PropTypes.bool,
  filterClosedToilets: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);

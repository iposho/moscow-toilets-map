import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { filterClosedToilets } from '../../../store/actions';

import './index.scss';

const Header = (props) => {
  const [showInfo, toggleInfo] = useState(false);

  const toggleInfoCard = () => {
    toggleInfo(!showInfo);
  };

  const handleChange = () => {
    props.filterClosedToilets();
  };

  return (
    <>
      <header className="header">
        <div>
          <button type="button" className="header-title" onClick={toggleInfoCard}>
            {process.env.REACT_APP_WEBSITE_NAME}
          </button>
          <label htmlFor="filter">
            <input
              type="checkbox"
              defaultChecked={props.isFiltered}
              onChange={handleChange}
              id="filter"
            />
            Только работающие
          </label>
        </div>
        {
          showInfo
          && (
            <div className="infoCard">
              <p>{props.apiInfo.Description}</p>
              <p>{`Всего ${props.apiInfo.ItemsCount} шт.`}</p>
              <p>{`Идентификатор набора данных ${props.apiInfo.IdentificationNumber}`}</p>
              <p>{`Дата обновления набора данных ${props.apiInfo.VersionDate}`}</p>
              <p>{`Версия набора данных ${props.apiInfo.VersionNumber}`}</p>
            </div>
          )
        }
      </header>
    </>
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
  apiInfo: null,
};

Header.propTypes = {
  isFiltered: PropTypes.bool,
  filterClosedToilets: PropTypes.func,
  apiInfo: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);

import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';

const ApiInfo = ({ info }) => (
  <div className="apiInfo">
    {`Последнее обновление набора данных: ${info.VersionDate}`}
  </div>
);

ApiInfo.defaultProps = {
  info: null,
};

ApiInfo.propTypes = {
  info: PropTypes.object,
};

export default ApiInfo;

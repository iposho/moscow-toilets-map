import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import Layout from './components/layout';
import Map from './components/map/Map';
import Preloader from './components/layout/Preloader';

import { initMap, getApiInfo, getToiletsInfo } from './store/actions';

import './assets/styles/global.scss';

class App extends React.Component {
  async componentDidMount() {
    this.props.initMap();
    this.props.getApiInfo();
    this.props.getToiletsInfo();
  }

  render() {
    const { toilets, apiInfo, error } = this.props;

    const showMap = !error && (toilets && apiInfo);

    return (
      showMap
        ? (
          <Layout info={apiInfo}>
            <Map toilets={toilets} />
          </Layout>
        )
        : <Preloader error={error} />
    );
  }
}

App.defaultProps = {
  getToiletsInfo: () => {},
  getApiInfo: () => {},
  initMap: () => {},
  toilets: null,
  apiInfo: null,
  error: null,
};

App.propTypes = {
  getApiInfo: PropTypes.func,
  initMap: PropTypes.func,
  getToiletsInfo: PropTypes.func,
  toilets: PropTypes.array,
  apiInfo: PropTypes.object,
  error: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  ...state.app,
});

const mapDispatchToProps = () => (dispatch) => ({
  getApiInfo: () => dispatch(getApiInfo()),
  getToiletsInfo: () => dispatch(getToiletsInfo()),
  initMap: () => dispatch(initMap()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

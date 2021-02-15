import React from 'react';
import PropTypes from 'prop-types';

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LayersControl,
  ZoomControl,
} from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { Icon } from 'leaflet';

import { v4 as uuidv4 } from 'uuid';

import { isMobileOnly } from '../../../utils/isMobile';

import icon from '../../../assets/icons/wc-off.png';
import iconLive from '../../../assets/icons/wc.png';

import './index.scss';

class Map extends React.Component {
  state = {
    lat: 55.75222,
    lng: 37.61556,
    zoom: 11,
  }

  render() {
    const initialCoords = [this.state.lat, this.state.lng];
    const { zoom } = this.state;
    const { toilets } = this.props;
    const zoomControlPosition = isMobileOnly() ? 'topleft' : 'bottomright';

    return (
      toilets.length > 0
      && (
        <MapContainer
          center={initialCoords}
          zoom={zoom}
          scrollWheelZoom
          style={{ width: '100%', minHeight: '100vh' }}
          zoomControl={false}
        >
          <ZoomControl position={zoomControlPosition} />
          <LayersControl position="topright">
            <LayersControl.BaseLayer checked name="CartoDB: Positron">
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="//{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
              />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="CartoDB: DarkMmatter">
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="//{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png"
              />
            </LayersControl.BaseLayer>
          </LayersControl>
          <MarkerClusterGroup>
            {
              toilets.map((toilet) => {
                const point = [toilet.geometry.coordinates[1],
                  toilet.geometry.coordinates[0]];
                const attr = toilet.properties.Attributes;
                const isClosed = attr.CloseFlag === 'закрыт';

                return (
                  <Marker
                    position={point}
                    key={uuidv4()}
                    icon={new Icon({
                      iconUrl: isClosed ? icon : iconLive,
                      iconSize: [16, 32],
                      iconAnchor: [16, 32],
                    })}
                  >
                    <Popup>
                      <h2>
                        {attr.Name}
                        {isClosed ? ' (закрыт)' : ''}
                      </h2>
                      {
                        attr.CloseReason
                        && <p>{`Причина закрытия: ${attr.CloseReason}`}</p>
                      }
                      <p>
                        {attr.Location}
                        {' — '}
                        {attr.District}
                        {', '}
                        {attr.AdmArea}
                      </p>
                      {
                        attr.LocationClarification
                          && <p>{attr.LocationClarification}</p>
                      }
                      {
                        (attr.WorkingHours && !isClosed)
                          && (
                            <table>
                              <thead>
                                <tr>
                                  <td><b>Часы работы:</b></td>
                                </tr>
                              </thead>
                              <tbody>
                                {
                                  attr.WorkingHours.map((item) => (
                                    <tr key={uuidv4()}>
                                      <td>{item.DayOfWeek}</td>
                                      <td>{item.Hours}</td>
                                    </tr>
                                  ))
                                }
                              </tbody>
                            </table>
                          )
                      }
                    </Popup>
                  </Marker>
                );
              })
            }
          </MarkerClusterGroup>
        </MapContainer>
      )
    );
  }
}

Map.defaultProps = {
  toilets: [],
};

Map.propTypes = {
  toilets: PropTypes.array,
};

export default Map;

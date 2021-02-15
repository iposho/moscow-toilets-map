import React from 'react';
import PropTypes from 'prop-types';
import {
  MapContainer, TileLayer, Marker, Popup,
} from 'react-leaflet';
import { Icon } from 'leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

export default class Map extends React.Component {
  state = {
    lat: 55.75222,
    lng: 37.61556,
    zoom: 13,
  }

  render() {
    const initialCoords = [this.state.lat, this.state.lng];
    const { zoom } = this.state;
    const { incidents } = this.props;

    return (
      incidents.length > 0
        ? (
          <MapContainer
            center={initialCoords}
            zoom={zoom}
            scrollWheelZoom={false}
            style={{ width: '100%', minHeight: '100vh' }}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
            />
            {
              incidents.map((incident) => {
                const point = [incident.point.coordinates[1],
                  incident.point.coordinates[0]];

                return (
                  <Marker
                    position={point}
                    key={incident.incident_number}
                    icon={new Icon({
                      iconUrl: icon,
                      iconSize: [25, 41],
                      iconAnchor: [12, 41],
                      shadowUrl: iconShadow,
                    })}
                  >
                    <Popup>
                      <span>
                        ADDRESS:
                        {incident.address}
                        ,
                        {incident.city}
                        {' '}
                        -
                        {incident.zip_code}
                      </span>
                      <br />
                      <span>
                        BATTALION:
                        {incident.battalion}
                      </span>
                      <br />
                    </Popup>
                  </Marker>
                );
              })
            }
          </MapContainer>
        )
        : 'Loading map...'
    );
  }
}

Map.defaultProps = {
  incidents: [],
};

Map.propTypes = {
  incidents: PropTypes.array,
};

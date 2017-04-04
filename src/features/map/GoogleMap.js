import React from 'react';

import { GoogleMapLoader, GoogleMap, Marker } from 'react-google-maps';

const noop = () => {};

// Wrap all `react-google-maps` components with `withGoogleMap` HOC
// and name it GettingStartedGoogleMap
const Map = ({ lat, lng, onMapLoad, marker, onMapClick = noop, containerElementProps }) => (
  <div style={{ height: '100%' }}>
    <GoogleMapLoader
      containerElement={
        <div
          {...containerElementProps}
          style={{
            height: '100%',
          }}
        />
      }
      googleMapElement={
        <GoogleMap
          ref={onMapLoad}
          defaultZoom={9}
          defaultCenter={{ lat, lng }}
          onClick={onMapClick}
        >
          <Marker
            position={{ lat, lng }}
          />
        </GoogleMap>
      }
    />
  </div>
);

Map.propTypes = {};

export default Map;

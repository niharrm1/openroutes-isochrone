import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { isochrone } from '../hooks/useIsochrone';
const MapWithIsochrone = ({
  googleMapsApiKey,
  openRouteServiceApiKey,
  centerLat,
  centerLng,
  mapHeight,
  mapWidth,
  isochroneLat,
  isochroneLng,
  mode,
  range
}) => {
  const mapRef = useRef(null);
  const isochrone = useIsochrone({
    lat: isochroneLat,
    lng: isochroneLng,
    mode,
    range,
    apiKey: openRouteServiceApiKey
  });
  useEffect(() => {
    const loadGoogleMaps = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&callback=initMap`;
      script.async = true;
      script.defer = true;
      window.document.body.appendChild(script);
      script.onload = () => {
        const map = new window.google.maps.Map(mapRef.current, {
          center: {
            lat: centerLat,
            lng: centerLng
          },
          zoom: 12
        });
        if (isochrone) {
          const isochronePolygon = new window.google.maps.Polygon({
            paths: isochrone.features[0].geometry.coordinates[0].map(coord => ({
              lat: coord[1],
              lng: coord[0]
            })),
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35
          });
          isochronePolygon.setMap(map);
        }
      };
    };
    if (!window.google) {
      loadGoogleMaps();
    } else {
      const map = new window.google.maps.Map(mapRef.current, {
        center: {
          lat: centerLat,
          lng: centerLng
        },
        zoom: 12
      });
    }
  }, [googleMapsApiKey, isochrone, centerLat, centerLng]);

  // return <div ref={mapRef} style={{ height: mapHeight, width: mapWidth }} />;
};
MapWithIsochrone.propTypes = {
  googleMapsApiKey: PropTypes.string.isRequired,
  openRouteServiceApiKey: PropTypes.string.isRequired,
  centerLat: PropTypes.number.isRequired,
  centerLng: PropTypes.number.isRequired,
  mapHeight: PropTypes.string.isRequired,
  mapWidth: PropTypes.string.isRequired,
  isochroneLat: PropTypes.number.isRequired,
  isochroneLng: PropTypes.number.isRequired,
  mode: PropTypes.string.isRequired,
  range: PropTypes.number.isRequired
};
export default MapWithIsochrone;
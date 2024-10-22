
# Isochrone Map Example with `react-openroutes-isochrone`

[![npm version](https://img.shields.io/npm/v/react-openroutes-isochrone)](https://www.npmjs.com/package/react-openroutes-isochrone)
[![npm downloads](https://img.shields.io/npm/dt/react-openroutes-isochrone)](https://www.npmjs.com/package/react-openroutes-isochrone)

This project demonstrates how to generate and display isochrones on maps using the **react-openroutes-isochrone** package with **Google Maps** and **Leaflet (OpenStreetMap)**.

Isochrones represent the reachable area from a specific point in a given time frame, using a specific mode of transport (e.g., driving, cycling).

## Features

- Fetch isochrone data using the **OpenRouteService** API.
- Display the isochrones on:
  - **Google Maps**
  - **OpenStreetMap** (via **Leaflet**)

## Prerequisites

Before getting started, make sure you have the following:

- Node.js (v12 or higher)
- npm (v6 or higher)
- **OpenRouteService API Key** (Get one from [here](https://openrouteservice.org/sign-up/))
- **Google Maps API Key** (Get one from [Google Cloud Console](https://console.cloud.google.com/))

###  Set Up API Keys

You will need to set the API keys for both OpenRouteService and Google Maps.

In the respective components (`IsochroneLeaflet.js` and `IsochroneGoogleMap.js`), replace the API keys with your own:

```javascript
// OpenRouteService API Key
const openRouteApiKey = '5b3ce3597851110001cf624853ae53cac19643158f53f6d90743a59b';  // For testing purpose 

// Google Maps API Key
const googleMapsApiKey = 'YOUR_GOOGLE_MAPS_API_KEY';
```



## Code Structure

### Leaflet (OpenStreetMap) Implementation

The Leaflet implementation uses the `react-leaflet` library to display isochrones fetched from the OpenRouteService API.

Component: `IsochroneLeaflet.js`

**Libraries**:
- `react-leaflet` for rendering the map
- `react-openroutes-isochrone` for fetching isochrone data

```javascript
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polygon, Marker, Popup } from 'react-leaflet';
import { isochroneData } from 'react-openroutes-isochrone';
import 'leaflet/dist/leaflet.css';

const IsochroneLeaflet = () => {
  const [isochrone, setIsochrone] = useState(null);
  const [error, setError] = useState(null);
  
  const center = [25.0343, -77.3963]; // Nassau, Bahamas
  const openRouteApiKey = 'YOUR_OPENROUTESERVICE_API_KEY'; // Set your OpenRouteService API key

  useEffect(() => {
    const fetchIsochrone = async () => {
      try {
        const data = await isochroneData({
          lat: center[0],
          lng: center[1],
          mode: 'driving-car',
          range: 10, // Time range in minutes
          apiKey: openRouteApiKey,
        });
        setIsochrone(data);
      } catch (err) {
        setError(err);
      }
    };

    fetchIsochrone();
  }, []);

  const getIsochronePolygons = (isochrone) => {
    return isochrone.features.map((feature) => feature.geometry.coordinates[0]);
  };

  return (
    <div>
      {error && <p>Error: {error.message}</p>}
      {!isochrone && !error && <p>Loading...</p>}
      {isochrone && (
        <MapContainer center={center} zoom={14} style={{ height: '500px', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap contributors'
          />
          {getIsochronePolygons(isochrone).map((coords, index) => (
            <Polygon key={index} positions={coords.map(coord => [coord[1], coord[0]])} color="blue" fillOpacity={0.4}>
              <Popup>Isochrone Area</Popup>
            </Polygon>
          ))}
          <Marker position={center}>
            <Popup>You are here</Popup>
          </Marker>
        </MapContainer>
      )}
    </div>
  );
};

export default IsochroneLeaflet;
```

### Google Maps Implementation

The Google Maps implementation uses the `@react-google-maps/api` library to render the isochrones.

Component: `IsochroneGoogleMap.js`

**Libraries**:
- `@react-google-maps/api` for rendering the map
- `react-openroutes-isochrone` for fetching isochrone data

```javascript
import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Polygon, Marker } from '@react-google-maps/api';
import { isochroneData } from 'react-openroutes-isochrone';

const IsochroneGoogleMap = () => {
  const [isochrone, setIsochrone] = useState(null);
  const [error, setError] = useState(null);

  const center = { lat: 25.0343, lng: -77.3963 }; // Nassau, Bahamas
  const openRouteApiKey = 'YOUR_OPENROUTESERVICE_API_KEY'; // Set your OpenRouteService API key
  const googleMapsApiKey = 'YOUR_GOOGLE_MAPS_API_KEY'; // Set your Google Maps API key

  useEffect(() => {
    const fetchIsochrone = async () => {
      try {
        const data = await isochroneData({
          lat: center.lat,
          lng: center.lng,
          mode: 'driving-car',
          range: 10, // Time range in minutes
          apiKey: openRouteApiKey,
        });
        setIsochrone(data);
      } catch (err) {
        setError(err);
      }
    };

    fetchIsochrone();
  }, []);

  const getIsochronePolygons = (isochrone) => {
    return isochrone.features.map((feature) => feature.geometry.coordinates[0]);
  };

  return (
    <LoadScript googleMapsApiKey={googleMapsApiKey}>
      {error && <p>Error: {error.message}</p>}
      {!isochrone && !error && <p>Loading...</p>}
      {isochrone && (
        <GoogleMap
          mapContainerStyle={{ height: '500px', width: '100%' }}
          center={center}
          zoom={14}
        >
          {getIsochronePolygons(isochrone).map((coords, index) => (
            <Polygon
              key={index}
              paths={coords.map(coord => ({ lat: coord[1], lng: coord[0] }))}
              options={{ fillColor: 'blue', fillOpacity: 0.4, strokeColor: 'blue' }}
            />
          ))}
          <Marker position={center} />
        </GoogleMap>
      )}
    </LoadScript>
  );
};

export default IsochroneGoogleMap;

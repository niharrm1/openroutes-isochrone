import { useState, useEffect } from 'react';
export const useIsochrone = ({
  lat,
  lng,
  mode,
  range,
  apiKey
}) => {
  const [isochrone, setIsochrone] = useState(null);
  useEffect(() => {
    const fetchIsochrone = async () => {
      try {
        const response = await fetch(`https://api.openrouteservice.org/v2/isochrones/${mode}?api_key=${apiKey}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            locations: [[lng, lat]],
            range: [range]
          })
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setIsochrone(data);
      } catch (error) {
        console.error('Failed to fetch isochrone:', error);
      }
    };
    if (lat && lng && apiKey) {
      fetchIsochrone();
    }
  }, [lat, lng, mode, range, apiKey]);
  return isochrone;
};
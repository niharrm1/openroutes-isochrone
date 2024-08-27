import { useState, useEffect } from 'react';
import { getIsochrone } from '../utils/getIsochrone';

export const useIsochrone = ({ lat, lng, mode, range, apiKey }) => {
  const [isochrone, setIsochrone] = useState(null);

  useEffect(() => {
    const fetchIsochrone = async () => {
      const data = await getIsochrone({ lat, lng, mode, range, apiKey });
      if (data) setIsochrone(data);
    };
    fetchIsochrone();
  }, [lat, lng, mode, range, apiKey]);

  return isochrone;
};

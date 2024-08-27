import axios from 'axios';

export const getIsochrone = async ({ lat, lng, mode, range, apiKey }) => {
  try {
    const response = await axios.post(
      `https://api.openrouteservice.org/v2/isochrones/${mode}`,
      {
        locations: [[lng, lat]],
        range: [range],
      },
      {
        headers: {
          Authorization: apiKey,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching isochrone:', error);
    return null;
  }
};

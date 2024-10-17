const isochroneData = async ({
  lat,
  lng,
  mode,
  range,
  apiKey
}) => {
  try {
    const response = await fetch(`https://api.openrouteservice.org/v2/isochrones/${mode}?api_key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        locations: [[lng, lat]],
        // Note: lng, lat order
        range: [range]
      })
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data = await response.json();
    return data; // Return the data instead of saving it in state
  } catch (error) {
    console.error('Failed to fetch isochrone:', error);
    throw error; // Throw the error for the caller to handle
  }
};
export default isochroneData;
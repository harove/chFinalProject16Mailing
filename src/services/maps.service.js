import { Client } from "@googlemaps/google-maps-services-js";

const client = new Client({
  key: process.env.GOOGLE_MAPS_API_KEY,
});

class MapsService {
  async geocodeAddress(address) {
    try {
      const response = await client.geocode({
        params: {
          address: address,
          key: process.env.GOOGLE_MAPS_API_KEY,
        },
      });

      if (response.data.status === "OK") {
        const result = response.data.results[0];
        const formattedAddress = result.formatted_address;
        const geometry = result.geometry.location;

        return {
          formattedAddress,
          latitude: geometry.lat,
          longitude: geometry.lng,
        };
      } else {
        throw new Error(`Geocoding failed: ${response.data.status}`);
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}

export const mapsService = new MapsService();

import {WebServiceClient}   from '@maxmind/geoip2-node';

const client = new WebServiceClient('988530', process.env.MAXMIND_KEY, {host: 'geolite.info'});

class MaxmindService {
  async getCityFromIp(address) {
    try {
      const response = await client.city(address);
      console.log(JSON.stringify(response,null,2))
      if (response.city) {
        return response
      } else {
        throw new Error(`Geocoding failed`);
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}

export const maxmindService = new MaxmindService();

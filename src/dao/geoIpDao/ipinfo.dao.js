import { IPinfoWrapper } from "node-ipinfo";

const ipinfoWrapper = new IPinfoWrapper(process.env.IP_INFO_TOKEN);

export class IpinfoDao {
  async getCityFromIp(address) {
    try {
      const response = await ipinfoWrapper.lookupIp(address);
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
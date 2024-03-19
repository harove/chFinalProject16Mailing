import { IPinfoWrapper } from "node-ipinfo";

const ipinfoWrapper = new IPinfoWrapper(process.env.IP_INFO_TOKEN);

class IpinfoService {
  async getCityFromIp(address) {
    try {
      const response = await ipinfoWrapper.lookupIp(address);
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

export const ipinfoService = new IpinfoService();

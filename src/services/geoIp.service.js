import { getDaoGeoIp } from "../dao/geoIpDao/geoIp.dao.js";

const geoIpDao = await getDaoGeoIp()

class GeoIpService {
  async getCityFromIp(address) {
    try {
      const response = await geoIpDao.getCityFromIp(address);
      return(response)
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}

export const geoIpService  = new GeoIpService();
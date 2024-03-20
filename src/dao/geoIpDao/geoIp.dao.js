import { IPINFO, IP_LOCATION_PROIVIDER, MAXMIND } from "../../config/config.js"
import { logger } from "../../utils/logger2.js"
import { IpinfoDao } from "./ipinfo.dao.js"
import { MaxmindDao } from "./maxmind.dao.js"

let daoGeoIp

if (IP_LOCATION_PROIVIDER === IPINFO) {
  if(!daoGeoIp){
    daoGeoIp = new IpinfoDao()
    logger.info('using ipinfo dao')
  }
}else if (IP_LOCATION_PROIVIDER === MAXMIND){
  if(!daoGeoIp){
    daoGeoIp = new MaxmindDao()
    logger.info('using maxmind dao')
  }
}

export async function getDaoGeoIp() {
  return daoGeoIp
}
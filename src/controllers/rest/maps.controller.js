import { geoIpService } from "../../services/geoIp.service.js"
import { mapsService } from "../../services/maps.service.js"


export async function geocodeController(req, res) {
    const address = req.params.address
    try {
        const pojo = await mapsService.geocodeAddress(address)
        res.status(201).json(pojo)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

export async function getCityFromIp(req, res) {
    const address = req.params.ipAddress
    try {
        const pojo = await geoIpService.getCityFromIp(address)
        res.status(201).json(pojo)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}





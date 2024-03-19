import { ipinfoService } from "../../services/ipinfo.service.js"
import { mapsService } from "../../services/maps.service.js"
import { maxmindService } from "../../services/maxmind.service.js"


export async function geocodeController(req, res) {
    console.log({req: req.params.address})
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
        const pojo = await maxmindService.getCityFromIp(address)
        res.status(201).json(pojo)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}





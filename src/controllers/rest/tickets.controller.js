import { ticketsService } from "../../services/tickets.service.js"


export async function makePurchaseController(req, res) {
    const body = req.body
    try {
        const pojo = await ticketsService.add(body)
        res['newProduct']()
        res.status(201).json(pojo)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}
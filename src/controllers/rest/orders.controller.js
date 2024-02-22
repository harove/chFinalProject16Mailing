import { ordersService } from "../../services/orders.service.js"


export async function makePurchaseTicketController(req, res) {
    const cid = req.params.cid
    const userEmail = req.user.email
    try {
        const pojo = await ordersService.add(cid, userEmail)
        res.status(201).json(pojo)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}
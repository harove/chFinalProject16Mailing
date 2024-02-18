import { cartsService } from "../../services/carts.service.js";

export async function getByIdController(req, res) {
    const {id} = req.params
    try {
        const pojo = await cartsService.findById(id)
        res.render('cart.handlebars', {
            payload:pojo.products,
            titulo: 'Cart',
        });
    } catch (error) {
        res.send(error.message)
    }
}



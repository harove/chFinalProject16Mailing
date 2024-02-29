// import { cartsManager as manager } from "../dao/cartsManager.js"
import mongoose from 'mongoose';
import { cartsService } from "../../services/carts.service.js";
import { ordersService } from '../../services/orders.service.js';
import { ERROR_TYPE, newError } from '../../errors/errors.js';

//creating cart
export async function postController(req, res, next) {
    try {
        const pojo = await cartsService.create()
        // const pojos = await manager.findAll()
        // const pojos = await cartsService.find()
        // pojos.push(pojo)
        res.json(pojo)
    } catch (error) {
        next(error)
    }
}
//listing products in cart x
export async function getByIdController(req, res, next) {
    const id = req.params.id
    try {
        // const pojo = await manager.listProductsInCart(id)
        const pojo = await cartsService.findById(id)
        if (pojo === null)
            throw newError({...ERROR_TYPE.NOT_FOUND });
        else
            res.json(pojo)
    } catch (error) {
        next(error)
    }
}

//add product to cart
export async function addProductToCartController(req, res, next) {
    const cid = req.params.cid
    const pid = req.params.pid
    try {
        const cart = await cartsService.addProductToCart(cid,pid)
        res.json(cart)
    } catch (error) {
        next(error)
    }
}

//uptade the quantity of a product in the cart
export async function updateQuantityOfProductFromCartController(req, res, next) {
    const cid = req.params.cid
    const pid = req.params.pid
    const {quantity} = req.body
    try {
        const cart = await cartsService.updateQuantityOfProductsInCart(cid,pid,quantity)
        res.json(cart)
    } catch (error) {
        next(error)
    }
}

//delete all the products in the cart
export async function deleteAllProductsFromCartController(req, res, next) {
    const cid = req.params.cid
    try {
        const cart = await cartsService.deleteAllProductsFromCart(cid)
        res.json(cart)
    } catch (error) {
        next(error)
    }
}



//delete product from cart
export async function deleteProductFromCartController(req, res, next) {
    const cid = req.params.cid
    const pid = req.params.pid
    try {
        const cart = await cartsService.deleteProductFromCart(cid,pid)
        res.json(cart)
    } catch (error) {
        next(error)
    }
}


//additional to the challenge. 

//listing carts

export async function getController(req, res, next) {
    const {limit} = req.query
    // const pojos = await manager.findAll({limit})
    const pojos = await cartsService.find().limit(limit)
    res.json(pojos)
}

export async function updateController(req, res, next) {
    const id = req.params.id
    const fields = req.body
    try {
        const pojos = await cartsService.updatePojo(id,fields)
        res.json(pojos)
    } catch (error) {
        next(error)
    }
}

export async function deleteController(req, res, next) {
    const id = req.params.id
    try {
        // const pojos = await manager.delete(id)
        const pojo = await cartsService.findByIdAndDelete(id)
        res.json(pojo)
    } catch (error) {
        next(error)
    }
}
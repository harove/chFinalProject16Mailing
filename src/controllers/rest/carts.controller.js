// import { cartsManager as manager } from "../dao/cartsManager.js"
import mongoose from 'mongoose';
import { cartsService } from "../../services/carts.service.js";
import { ticketsService } from '../../services/tickets.service.js';

//creating cart
export async function postController(req, res) {
    const pojo = req.body
    try {
        const document = await cartsService.create(pojo)
        // const pojos = await manager.findAll()
        const pojos = await cartsService.find()
        pojos.push(pojo)
        res.json(document)
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

//listing products in cart x
export async function getByIdController(req, res) {
    const id = req.params.id
    try {
        // const pojo = await manager.listProductsInCart(id)
        const pojo = await cartsService.find({_id: id})
        // res.json(pojo)
        res.json(pojo)
    } catch (error) {
        res.status(404).json({
            mensaje: error.message
        })
    }
}

//add product to cart
export async function addProductToCartController(req, res) {
    const cid = req.params.cid
    const pid = req.params.pid
    try {
        const cart = await cartsService.addProductToCart(cid,pid)
        res.json(cart)
    } catch (error) {
        res.status(400).json({
            mensaje: error.message
        })
    }
}

//uptade the quantity of a product in the cart
export async function updateQuantityOfProductFromCartController(req, res) {
    const cid = req.params.cid
    const pid = req.params.pid
    const {quantity} = req.body
    try {
        const cart = await cartsService.updateQuantityOfProductsInCart(cid,pid,quantity)
        res.json(cart)
    } catch (error) {
        res.status(404).json({
            mensaje: error.message
        })
    }
}

//delete all the products in the cart
export async function deleteAllProductsFromCartController(req, res) {
    const cid = req.params.cid
    try {
        const cart = await cartsService.deleteAllProductsFromCart(cid)
        res.json(cart)
    } catch (error) {
        res.status(404).json({
            mensaje: error.message
        })
    }
}



//delete product from cart
export async function deleteProductFromCartController(req, res) {
    const cid = req.params.cid
    const pid = req.params.pid
    try {
        const cart = await cartsService.deleteProductFromCart(cid,pid)
        res.json(cart)
    } catch (error) {
        res.status(404).json({
            mensaje: error.message
        })
    }
}


export async function makePurchaseTicketController(req, res) {
    const cid = req.params.cid
    const userEmail = req.user.email
    try {
        const pojo = await ticketsService.add(cid, userEmail)
        res.status(201).json(pojo)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}




//additional to the challenge. 

//listing carts

export async function getController(req, res) {
    const {limit} = req.query
    // const pojos = await manager.findAll({limit})
    const pojos = await cartsService.find().limit(limit)
    res.json(pojos)
}

export async function updateController(req, res) {
    const id = req.params.id
    const fields = req.body
    try {
        const pojos = await cartsService.updatePojo(id,fields)
        res.json(pojos)
    } catch (error) {
        res.status(404).json({
            mensaje: error.message
        })
    }
}

export async function deleteController(req, res) {
    const id = req.params.id
    try {
        // const pojos = await manager.delete(id)
        const pojo = await cartsService.findByIdAndDelete(id)
        res.json(pojo)
    } catch (error) {
        res.status(404).json({
            mensaje: error.message
        })
    }
}
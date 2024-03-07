import { cartsService } from "../../../services/carts.service.js";
import { productsService } from "../../../services/products.service.js";
import { randomUUID } from 'crypto'
import { logger } from "../../../utils/logger.js";

export class OrdersDaoMongoose {
  constructor(ordersModel) {
    this.ordersModel = ordersModel;
  }

  async add(id, email) {
    let cart = null
    try{
      cart = await cartsService.findById(id);
    }catch(error){
      logger.error(error.message)
    }

    let amount = 0

    for (const product of cart.products) {
      if (product._id.stock - product.quantity > 0) {
        try {
          const updatedProduct = await productsService.findByIdAndUpdate(
            product._id.id,
            { $set: { stock: product._id.stock - product.quantity } },
            { new: true }
          );
            amount = amount + product._id.price*product.quantity
        } catch (error) {
          console.error(
            `Error updating product with _id ${product._id.title}: ${error.message}`
          );
        }
        try{
          await cartsService.deleteProductFromCart(id, product._id._id.toString())
        }catch(error){
          logger.fatal('error deleting product from cart',error.message)
        }
      }
    }

    try {
      const document = await this.ordersModel.create({
        purchaseDatetime: new Date(),
        amount,
        purchaser: email,
        code: randomUUID()
      });
      return document.toObject();
    } catch (error) {
      logger.fatal(error.message);
    }
  }

  async find(query) {
    return await this.ordersModel.find(query).lean();
  }

  async findById(query) {
    return await this.ordersModel.findById(query).lean();
  }

  async findByIdAndUpdate(id, query, options) {
    return await this.ordersModel.findByIdAndUpdate(id, query, options);
  }

  async findByIdAndDelete(id) {
    return await this.ordersModel.findByIdAndDelete(id);
  }

  async updateOne(query, data) {
    throw new Error("NOT IMPLEMENTED");
  }

  async updateMany(query, data) {
    throw new Error("NOT IMPLEMENTED");
  }

  async deleteOne(query) {
    throw new Error("NOT IMPLEMENTED");
  }

  async deleteMany(query) {
    throw new Error("NOT IMPLEMENTED");
  }
}

import { cartsService } from "../../../services/carts.service.js";
import { productsService } from "../../../services/products.service.js";

export class TicketsDaoMongoose {
  constructor(ticketsModel) {
    this.ticketsModel = ticketsModel;
  }

  async add(cid, email) {
    const cart = await cartsService.findById(cid);

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
          await cartsService.deleteProductFromCart(cid, product._id._id.toString())
        }catch(error){
          console.log('error deleting product from cart',error.message)
        }
      }
    }

    try {
      const document = await this.ticketsModel.create({
        purchaseDatetime: new Date(),
        amount,
        purchaser: email,
      });
      console.log(JSON.stringify(document.toObject(), null, 2));
      return document.toObject();
    } catch (error) {
      console.log(error.message);
    }
  }

  async find(query) {
    return await this.ticketsModel.find(query).lean();
  }

  async findById(query) {
    return await this.ticketsModel.findById(query).lean();
  }

  async findByIdAndUpdate(id, query, options) {
    return await this.ticketsModel.findByIdAndUpdate(id, query, options);
  }

  async findByIdAndDelete(id) {
    return await this.ticketsModel.findByIdAndDelete(id);
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

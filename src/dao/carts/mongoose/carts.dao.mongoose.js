import mongoose from "mongoose";
import { ERROR_TYPE, newError } from "../../../errors/errors.js";


export class CartsDaoMongoose {
  constructor(cartsModel) {
    this.cartsModel = cartsModel;
  }

  async create() {
    try{
      const document = await this.cartsModel.create({});
      return document.toObject();
    }catch(error){
      throw newError({...ERROR_TYPE.INTERNAL_ERROR, message: error.message });
    }
  }

  async paginate(query, options) {
    return await this.cartsModel.paginate(query, options);
  }

  async find(query) {
    try{
      return await this.cartsModel.find(query).lean();
    }catch(error){
      throw newError({...ERROR_TYPE.NOT_FOUND, message: error.message });
    }
  }

  async addProductToCart(cid, pid) {
    try {
      const cart = await this.cartsModel.findById(cid)
      const pidIndex = cart.products.findIndex(product=> new mongoose.Types.ObjectId(product._id).equals(pid))
      if (pidIndex === -1){
          cart.products.push({_id:pid, quantity:1})
      }else{
          cart.products[pidIndex].quantity += 1;
      }
      await cart.save()
      return cart
    } catch (error) {
      throw newError({...ERROR_TYPE.INTERNAL_ERROR, message: error.message });
    }
  }

  async updateQuantityOfProductsInCart(cid, pid, quantity) {
    try {
      const cart = await this.cartsModel.findById(cid);
      const pidIndex = cart.products.findIndex((product) => {
        return product._id._id.toString() === pid;
      });
      if (pidIndex === -1) {
        throw newError({...ERROR_TYPE.NOT_FOUND});
      } else {
        cart.products[pidIndex].quantity = quantity;
      }
      await cart.save();
      return cart;
    } catch (error) {
      throw newError({...ERROR_TYPE.INVALID_DATA, message:error.message });
    }
  }

  async deleteProductFromCart(cid, pid) {
    try {
      const cart = await this.cartsModel.findById(cid)
      const pidIndex = cart.products.findIndex((product) => {
        return product._id._id.toString() === pid;
      });
      if(pidIndex !== -1){
          cart.products.splice(pidIndex, 1);
      }else{
          throw new Error('Producto no encontrado')
      }        
      await cart.save()
      return cart
    } catch (error) {
      throw newError({...ERROR_TYPE.INTERNAL_ERROR, message:error.message });
    }
  }

  async deleteAllProductsFromCart(cid) {
    try {
      const cart = await this.cartsModel.findById(cid)
      if (cart === null){
          throw new Error('Cart not found')
      }else{
          cart.products = []
          await cart.save()
      }
      return cart
    } catch (error) {
      throw newError({...ERROR_TYPE.INVALID_DATA, message:error.message });
    }
  }
  

  async findById(id) {
    return await this.cartsModel.findById(id).populate("products._id");
  }

  async findByIdAndUpdate(id, query, options) {
    return await this.cartsModel.findByIdAndUpdate(id, query, options);
  }

  async findByIdAndDelete(id) {
    return await this.cartsModel.findByIdAndDelete(id);
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

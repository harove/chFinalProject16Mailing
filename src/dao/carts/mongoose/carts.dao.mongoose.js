import mongoose from "mongoose"

export class CartsDaoMongoose {
  constructor(cartsModel){
    this.cartsModel = cartsModel
  }

    async create(pojo) {
      const document = await this.cartsModel.create(pojo)
      return document.toObject()
    }

    async paginate(query, options) {
        return await this.cartsModel.paginate(query, options)
    }

    async find(query) {
      return await this.cartsModel.find(query).lean()
    }

    async updateQuantityOfProductsInCart(cid,pid,quantity) {
      try {
          const cart = await this.cartsModel.findById(cid)          
          const pidIndex = cart.products.findIndex(product=>{
              return product._id._id.toString() === pid
          })
          if (pidIndex === -1){
            const typedError = new Error('Product not found')
            typedError['name'] = 'NOT_FOUND_ERROR'
            throw typedError
          }else{
              cart.products[pidIndex].quantity = quantity;
          }
          await cart.save()
          return cart
      } catch (error) {
        const typedError = new Error(error.message)
        typedError['name'] = 'INTERNAL_ERROR'
        throw typedError
      }
  }



    async findById(query) {
        return await this.cartsModel.findById(query).populate('products._id')
    }

    async findByIdAndUpdate(id,query,options) {
        return await this.cartsModel.findByIdAndUpdate(id,query,options)
    }

    async findByIdAndDelete(id) {
        return await this.cartsModel.findByIdAndDelete(id)
    }

    async updateOne(query, data) {
      throw new Error('NOT IMPLEMENTED')
    }
  
    async updateMany(query, data) {
      throw new Error('NOT IMPLEMENTED')
    }
  
    async deleteOne(query) {
      throw new Error('NOT IMPLEMENTED')
    }
  
    async deleteMany(query) {
      throw new Error('NOT IMPLEMENTED')
    }
  }
import { Schema, connect, model } from 'mongoose'
import { MONGODB_CNX_STR } from '../config.js'


const cartsSchema = new Schema({
    products: [{
        _id: {
            type: Schema.Types.ObjectId,
            ref: 'products', // Reference to the 'products' collection
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            default: 1,
        },
    }],
}, 
{
    strict: 'throw',
    versionKey: false,
})

cartsSchema.pre('find', function (next) {
    this.populate('products._id')
    next()
})

export const manager = model('carts', cartsSchema)



class CartsDaoMongoose {
    async create(pojo) {
      const document = await manager.create(pojo)
      return document.toObject()
    }

    async paginate(query, options) {
        return await manager.paginate(query, options)
    }

    async find(query) {
      return await manager.find(query).lean()
    }

    async findById(query) {
        return await manager.findById(query).lean()
    }

    async findByIdAndUpdate(id,query,options) {
        return await manager.findByIdAndUpdate(id,query,options)
    }

    async findByIdAndDelete(id) {
        return await manager.findByIdAndDelete(id)
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
  
  let cartsDaoMongoose
  console.log('usando persistencia en mongodb')
  
  export async function getDaoMongoose() {
    if (!cartsDaoMongoose) {
      await connect(MONGODB_CNX_STR)
      console.log('conectado a mongodb')
      cartsDaoMongoose = new CartsDaoMongoose()
    }
    return cartsDaoMongoose
  }
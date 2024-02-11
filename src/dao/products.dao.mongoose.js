import { Schema, connect, model } from 'mongoose'
import {randomUUID} from 'node:crypto'
import mongoosePaginate from 'mongoose-paginate-v2'
import { MONGODB_CNX_STR } from '../config.js'


const productsSchema = new Schema({
    // _id: {type: String, default: randomUUID()},
    title: {type: String, required: true},
    description: {type: String, required: true},
    code: {type: String, required: true, unique:true},
    price: {type: Number, required: true},
    status: { type: Boolean, default: true },
    stock: {type: Number, required: true},
    category: {type: String, default: false},
    thumbnails: { type: [String], default: [] },
}, 
{
    strict: 'throw',
    versionKey: false,
})


productsSchema.plugin(mongoosePaginate)

export const manager = model('products', productsSchema)


class ProductsDaoMongoose {
    async create(pojo) {
      const document = await manager.create(pojo)
      return document.toObject()
    }

    async paginate(query, options) {
        return await manager.paginate(query, options)
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
  
  let productsDaoMongoose
  console.log('usando persistencia en mongodb')
  
  export async function getDaoMongoose() {
    if (!productsDaoMongoose) {
      await connect(MONGODB_CNX_STR)
      console.log('conectado a mongodb')
      productsDaoMongoose = new ProductsDaoMongoose()
    }
    return productsDaoMongoose
  }
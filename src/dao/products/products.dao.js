import { connect, model } from "mongoose"
import { MODO_EJECUCION, MONGODB_CNX_STR } from "../../config.js"
import { ProductsDaoMongoose } from "./mongoose/products.dao.mongoose.js"
import productsSchema from "./mongoose/products.schema.mongoose.js"

let daoProducts

if (MODO_EJECUCION === 'online') {
    if (!daoProducts) {
      await connect(MONGODB_CNX_STR)
      const productsModel = model('products', productsSchema )
      daoProducts = new ProductsDaoMongoose(productsModel)
      console.log('persistiendo products en: mongodb')
    }
}

export async function getDaoProducts() {
  return daoProducts
}

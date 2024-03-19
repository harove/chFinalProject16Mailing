import { connect, model } from "mongoose"
import { MODO_EJECUCION, MONGODB_CNX_STR } from "../../config/config.js"
import { ProductsDaoMongoose } from "./mongoose/products.dao.mongoose.js"
import productsSchema from "./mongoose/products.schema.mongoose.js"
import { logger } from "../../utils/logger2.js"

let daoProducts

if (MODO_EJECUCION === 'online') {
    if (!daoProducts) {
      await connect(MONGODB_CNX_STR)
      const productsModel = model('products', productsSchema )
      daoProducts = new ProductsDaoMongoose(productsModel)
      logger.info('persistiendo products en: mongodb')
    }
}

export async function getDaoProducts() {
  return daoProducts
}

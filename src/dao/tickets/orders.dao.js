import { connect, model } from "mongoose"
import { MODO_EJECUCION, MONGODB_CNX_STR } from "../../config/config.js"
import ordersSchema from "./mongoose/orders.schema.mongoose.js"
import { OrdersDaoMongoose } from "./mongoose/orders.dao.mongoose.js"
import { logger } from "../../utils/logger2.js"

let daoOrders

if (MODO_EJECUCION === 'online' || 'development') {
    if (!daoOrders) {
      await connect(MONGODB_CNX_STR)
      const ordersModel = model('tickets', ordersSchema )
      daoOrders = new OrdersDaoMongoose(ordersModel)
      logger.info('persistiendo tickets en: mongodb')
    }
}

export async function getDaoOrders() {
  return daoOrders
}

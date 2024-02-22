import { connect, model } from "mongoose"
import { MODO_EJECUCION, MONGODB_CNX_STR } from "../../config.js"
import ordersSchema from "./mongoose/orders.schema.mongoose.js"
import { OrdersDaoMongoose } from "./mongoose/orders.dao.mongoose.js"

let daoOrders

if (MODO_EJECUCION === 'online') {
    if (!daoOrders) {
      await connect(MONGODB_CNX_STR)
      const ordersModel = model('tickets', ordersSchema )
      daoOrders = new OrdersDaoMongoose(ordersModel)
      console.log('persistiendo tickets en: mongodb')
    }
}

export async function getDaoOrders() {
  return daoOrders
}

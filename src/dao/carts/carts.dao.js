import { connect, model } from 'mongoose'
import { MODO_EJECUCION, MONGODB_CNX_STR } from '../../config/config.js'
import cartsSchema from './mongoose/cartsSchema.js'
import { CartsDaoMongoose } from './mongoose/carts.dao.mongoose.js'

let daoCarts

if (MODO_EJECUCION === 'online') {
  if (!daoCarts){
    await connect(MONGODB_CNX_STR)
    const cartsModel = model('carts', cartsSchema )
    daoCarts = new CartsDaoMongoose(cartsModel)
    console.log('persistiendo carts en: mongodb')
  }
}

export async function getDaoCarts() {
  return daoCarts
}
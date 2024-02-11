import { MODO_EJECUCION } from '../config.js'

let getDaoProducts

if (MODO_EJECUCION === 'online') {
  const { getDaoMongoose } = await import('./products.dao.mongoose.js')
  getDaoProducts = getDaoMongoose
}

export {
  getDaoProducts
}
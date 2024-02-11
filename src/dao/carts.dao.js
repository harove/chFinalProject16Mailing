import { MODO_EJECUCION } from '../config.js'

let getDaoCarts

if (MODO_EJECUCION === 'online') {
  const { getDaoMongoose } = await import('./carts.dao.mongoose.js')
  getDaoCarts = getDaoMongoose
}

export {
  getDaoCarts
}
import { connect, model } from 'mongoose'
import { MODO_EJECUCION, MONGODB_CNX_STR } from '../../config/config.js'
import { UsuariosDaoMongoose } from './mongoose/usuarios.dao.mongoose.js'
import { usuariosSchema } from './mongoose/usuarios.schema.mongoose.js'
import { logger } from '../../utils/logger2.js'

let daoUsuarios

if (MODO_EJECUCION === 'online' || 'development' ) {
  if(!daoUsuarios){
    await connect(MONGODB_CNX_STR)
    const usuariosModel = model('usuarios', usuariosSchema)
    daoUsuarios = new UsuariosDaoMongoose(usuariosModel)
    logger.info('usuando dao usuarios mongoose')
  }
}

export async function getDaoUsuarios() {
  return daoUsuarios
}
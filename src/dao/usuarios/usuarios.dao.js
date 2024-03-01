import { connect, model } from 'mongoose'
import { MODO_EJECUCION, MONGODB_CNX_STR } from '../../config/config.js'
import { UsuariosDaoMongoose } from './mongoose/usuarios.dao.mongoose.js'
import { usuariosSchema } from './mongoose/usuarios.schema.mongoose.js'

let daoUsuarios

if (MODO_EJECUCION === 'online') {
  if(!daoUsuarios){
    await connect(MONGODB_CNX_STR)
    const usuariosModel = model('usuarios', usuariosSchema)
    daoUsuarios = new UsuariosDaoMongoose(usuariosModel)
    console.log('usuando dao usuarios mongoose')
  }
}

export async function getDaoUsuarios() {
  return daoUsuarios
}
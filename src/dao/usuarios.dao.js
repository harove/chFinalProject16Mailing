import { MODO_EJECUCION } from '../config.js'

let getDaoUsuarios

if (MODO_EJECUCION === 'online') {
  const { manager: getDaoMongoose } = await import('./usuarios.js')
  getDaoUsuarios = getDaoMongoose
}

export {
  getDaoUsuarios
}
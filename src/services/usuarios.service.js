import { getDaoUsuarios } from "../dao/usuarios/usuarios.dao.js"
import { Usuario } from "../models/usuario.models.js"

const usuariosDao = await getDaoUsuarios()

class UsuariosService{
    constructor(){}
    async find(query){
        return await usuariosDao.find(query)
    }

    async registrar(userData){
        const user = new Usuario(userData)
        return await usuariosDao.registrar(user.toPojo())
    }

    async autenticar(email, password){
        return await usuariosDao.autenticar(email, password)
    }

    async saveResetPassToken(email, token, expirationTime) {
        return await usuariosDao.saveResetPassToken(email, token, expirationTime);
    }

    async getOne(query) {
        return await usuariosDao.getOne(query);
    }
    
    async getOneAndUpdate(query, newParams) {
        const user = await usuariosDao.getOneAndUpdate(query, newParams);
        console.log({user})
        return user
    }

}

export const usuariosService = new UsuariosService()

import { getDaoUsuarios } from "../dao/usuarios/usuarios.dao.js"

const usuariosDao = await getDaoUsuarios()

class UsuariosService{
    async find(query){
        return await usuariosDao.find(query)
    }

    async registrar(userData){
        return await usuariosDao.registrar(userData)
    }

    async autenticar(email, password){
        return await usuariosDao.autenticar(email, password)
    }
}

export const usuariosService = new UsuariosService()

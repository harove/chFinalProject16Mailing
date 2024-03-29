import mongoose, {Schema, Types} from "mongoose"
import { randomUUID } from "node:crypto"
import { hasheadasSonIguales, hashear } from '../../../utils/criptografia.js'
import { ADMIN_EMAIL, DEFAULT_USER_AVATAR_PATH } from "../../../config/config.js"
import { cartsService } from "../../../services/carts.service.js"


export const usuariosSchema = new Schema({
    // _id: {type: String, default: randomUUID},
    // _id: {
    //     type: Schema.Types.ObjectId,
    //     default: Types.ObjectId
    // },
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email: { type: String, required: true},
    age: { type: Number, required: true},
    password: {type: String, required: true},
    cart: {
        type: Schema.Types.ObjectId,
        ref: 'carts',
        required: false
    },
    // foto: { type: String, default: DEFAULT_USER_AVATAR_PATH},
    rol: {type: String, enum:['admin', 'user'], default: 'user'}
}, {
    versionKey: false,
    strict: 'throw',
    statics: {
        registrar: async function (userData) {
            try {
                if(userData.password){
                    userData.password = hashear(userData.password)
                }
                asignar_rol(userData)
                const cart = await cartsService.create()
                userData.cart = cart._id
                const user = await this.create(userData)
                return user.toObject()
            } catch(error){
                const typedError = new Error(error.message)
                typedError['type'] = 'INVALID_ARGUMENT'
                throw typedError
            }  
        },

        autenticar: async function (email, password){
            const user = await this.findOne({email})
            if (!user){
                const typedError = new Error('error de authenticación')
                typedError['type'] = 'FAILED AUTHENTICATION'
                throw typedError
            }
            if(!hasheadasSonIguales(password, user.password)){
                const typedError = new Error('error de authenticación')
                typedError['type'] = 'FAILED AUTHENTICATION'
                throw typedError
            }
            return user.toObject()
        }
    }
})


function asignar_rol(obj) {
    if (obj.email === ADMIN_EMAIL) {
      obj.rol = 'admin'
    } else {
      obj.rol = 'user'
    }
  }
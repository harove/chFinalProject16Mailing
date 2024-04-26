import mongoose, { Schema, Types } from "mongoose";
import { randomUUID } from "node:crypto";
import { hasheadasSonIguales, hashear } from "../../../utils/criptografia.js";
import {
  ADMIN_EMAIL,
  DEFAULT_USER_AVATAR_PATH,
} from "../../../config/config.js";
import { cartsService } from "../../../services/carts.service.js";

export const usuariosSchema = new Schema(
  {
    // _id: {type: String, default: randomUUID},
    // _id: {
    //     type: Schema.Types.ObjectId,
    //     default: Types.ObjectId
    // },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    age: { type: Number, required: true },
    password: { type: String, required: true },
    resetPassToken: { type: String, required: false },
    resetPassTokenExpires: { type: Date, required: false },
    cart: {
      type: Schema.Types.ObjectId,
      ref: "carts",
      required: false,
    },
    // foto: { type: String, default: DEFAULT_USER_AVATAR_PATH},
    rol: { type: String, enum: ["admin", "user"], default: "user" },
  },
  {
    versionKey: false,
    strict: "throw",
    statics: {
      registrar: async function (userPojo) {
        console.log(userPojo.password)
        try {
          if (userPojo.password) {
            userPojo.password = hashear(userPojo.password);
            console.log(userPojo.password)
          }
          asignar_rol(userPojo);
          const cart = await cartsService.create();
          userPojo.cart = cart._id;
          const user = await this.create(userPojo);
          return user.toObject();
        } catch (error) {
          const typedError = new Error(error.message);
          typedError["type"] = "INVALID_ARGUMENT";
          throw typedError;
        }
      },

      autenticar: async function (email, password) {
        const user = await this.findOne({ email });
        if (!user) {
          const typedError = new Error("error de authenticación");
          typedError["type"] = "FAILED AUTHENTICATION";
          throw typedError;
        }
        if (!hasheadasSonIguales(password, user.password)) {
          const typedError = new Error("error de authenticación");
          typedError["type"] = "FAILED AUTHENTICATION";
          throw typedError;
        }
        return user.toObject();
      },

      saveResetPassToken: async function (email, token, expirationTime) {
        const user = await this.findOneAndUpdate(
          { email },
          {
            $set: {
              resetPassToken: token,
              resetPassTokenExpires: new Date(Date.now() + expirationTime),
            },
          },
          { new: true }
        );
        if (!user) {
          const typedError = new Error("error de authenticación");
          typedError["type"] = "FAILED AUTHENTICATION";
          throw typedError;
        }

        return user.toObject();
      },
    },
  }
);

function asignar_rol(obj) {
  if (obj.email === ADMIN_EMAIL) {
    obj.rol = "admin";
  } else {
    obj.rol = "user";
  }
}

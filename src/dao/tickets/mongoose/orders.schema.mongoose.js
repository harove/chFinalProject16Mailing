import { Schema } from "mongoose";

const ordersSchema = new Schema({
    // _id: {type: String, default: randomUUID()},
    code: {type: String, unique:true},
    purchaseDatetime: {type: Date, required: true},
    amount: {type: Number},
    purchaser: {type: String, required: true},
}, 
{
    strict: 'throw',
    versionKey: false,
})

export default ordersSchema
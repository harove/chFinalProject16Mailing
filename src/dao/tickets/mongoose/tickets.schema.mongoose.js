import { Schema } from "mongoose";
import { randomUUID } from 'crypto'


const ticketsSchema = new Schema({
    // _id: {type: String, default: randomUUID()},
    title: {type: String, required: true},
    code: {type: String, unique:true, default: randomUUID()},
    purchaseDatetime: {type: Date, required: true},
    amount: {type: Number},
    purchaser: {type: String, required: true},
}, 
{
    strict: 'throw',
    versionKey: false,
})

export default ticketsSchema
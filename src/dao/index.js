import mongoose from "mongoose";
import { MONGODB_CNX_STR } from "../config/config.js";


try {
    await mongoose.connect(MONGODB_CNX_STR)
    console.log('Connected to MongoDB!');
} catch (error) {
    console.error('error connecting to mongo', error.message)
}


export {managerMessage as messagesManager} from './message.js'
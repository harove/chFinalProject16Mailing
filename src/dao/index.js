import mongoose from "mongoose";
import { MONGODB_CNX_STR } from "../config/config.js";
import { logger } from "../utils/logger.js";


try {
    await mongoose.connect(MONGODB_CNX_STR)
    logger.info('Connected to MongoDB!');
} catch (error) {
    console.error('error connecting to mongo', error.message)
}


export {managerMessage as messagesManager} from './message.js'
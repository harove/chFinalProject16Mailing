import { logger } from "../utils/logger2.js"

export const consoleLog = (req,res,next) => {
    logger.info('pasando por acá')
    next()
}
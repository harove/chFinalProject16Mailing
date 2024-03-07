import { logger } from "../utils/logger.js"

export const consoleLog = (req,res,next) => {
    logger.info('pasando por acá')
    next()
}
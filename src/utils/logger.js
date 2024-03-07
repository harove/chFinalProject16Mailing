import winston from 'winston'
import { logLevels, loggerFile, loggerLevel } from '../config/config.js'

export const logger = winston.createLogger({
  levels: logLevels,
  transports: [
    new winston.transports.Console({ level: loggerLevel.CONSOLE }),
    new winston.transports.File({ level: loggerLevel.FILE, filename: loggerFile })
  ]
})
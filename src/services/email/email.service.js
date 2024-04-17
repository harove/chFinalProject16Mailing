import { MODO_EJECUCION, NODEMAILER_GMAIL_OPTIONS } from "../../config/config.js"
import { logger } from "../../utils/logger2.js"

import { EmailServiceConsola } from "./email.service.consola.js"
import { EmailServiceNodemailer } from "./email.service.nodemailer.js"

let emailService

if (MODO_EJECUCION === 'online') {
  if(!emailService){
    emailService = new EmailServiceNodemailer(NODEMAILER_GMAIL_OPTIONS)
    logger.info('usuando email service nodemailer')
  }
}else{
    emailService = new EmailServiceConsola()
    logger.info('usuando email service consola')
}

export function getEmailService(){
    return emailService
}
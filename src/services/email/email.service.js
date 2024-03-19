import { MODO_EJECUCION, NODEMAILER_GMAIL_OPTIONS } from "../../config/config"
import { logger } from "../../utils/logger"
import { EmailServiceConsola } from "./email.service.consola"
import { EmailServiceNodemailer } from "./email.service.nodemailer"

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
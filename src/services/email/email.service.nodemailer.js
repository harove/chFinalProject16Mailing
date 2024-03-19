import nodemailer from 'nodemailer'

export class EmailServiceNodemailer {
    constructor(options){
        this.transporter = nodemailer.createTransport(options)
    }
    async enviar({to, subject, html}){
        await this.transporter.sendMail({
            from: options.auth.user,
            to,
            subject,
            html
        })
    }
}


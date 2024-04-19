import nodemailer from 'nodemailer'

export class EmailServiceNodemailer {
    constructor(options){
        this.transporter = nodemailer.createTransport(options)
        this.options = options
    }
    async enviar({to, subject, html}){
        await this.transporter.sendMail({
            from: this.options.auth.user,
            to,
            subject,
            html
        })
    }
}


export class EmailServiceConsola {
    constructor(){

    }
    enviar({to, subject, html}){
        console.log(`to: ${to} subject: ${subject} html: ${html}`)
    }
}


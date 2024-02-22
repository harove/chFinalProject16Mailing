export class Usuario {
    #first_name
    #last_name
    #email
    #age
    #password
    #cart
    #rol
    constructor({first_name, last_name, email, age, password, cart, rol}){
        this.#first_name = first_name
        this.#last_name = last_name
        this.#email = email
        this.#age = age
        this.#password = password
        this.#cart = cart
        this.#rol = rol
    }

    get first_name() {
        return this.#first_name
    }

    get last_name() {
        return this.#last_name
    }

    get email() {
        return this.#email
    }

    get age() {
        return this.#age
    }

    get password() {
        return this.#password
    }

    get cart() {
        return this.#cart
    }

    get rol() {
        return this.#rol
    }
    

    set first_name(first_name) {
        if (!first_name) throw new Error('El primer nombre es obligatorio')
        this.#first_name = first_name
    }

    get last_name() {
        return this.#last_name
    }

    get email() {
        return this.#email
    }

    get age() {
        return this.#age
    }

    get password() {
        return this.#password
    }

    get cart() {
        return this.#cart
    }

    get rol() {
        return this.#rol
    }
}
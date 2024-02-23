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

    set last_name(last_name) {
        if (!last_name) throw new Error('El apellido es obligatorio')
        return this.#last_name = last_name
    }

    set email(email) {
        if (!email) throw new Error('El email es obligatorio')
        return this.#email = email
    }

    set age(age) {
        if (!age) throw new Error('La edad es obligatoria')
        return this.#age = age
    }

    set password(password) {
        if (!password) throw new Error('El password es requerido')
        return this.#password = password
    }

    set cart(cart) {
        return this.#cart = cart
    }

    set rol(rol) {
        return this.#rol = rol
    }

    toPojo(){
        return {
            first_name: this.#first_name,
            last_name: this.#last_name,
            email: this.#email,
            age: this.#age,
            password: this.#password,
            cart: this.#cart,
            rol: this.#rol
        }
    }
}
import { faker } from "@faker-js/faker";

function createUsuarioMock() {
  return {
    _id: faker.string.uuid(),
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    email: faker.internet.email(),
    age: 37,
    password: faker.internet.password(),
    cart: faker.string.uuid(),
    rol: 'user',
  };
}

export class UsuariosDaoMock {
  constructor() {
    this.usuarios = [];
  }

  async create(pojo) {
    throw new Error("NOT IMPLEMENTED");
  }

  async readOne() {
    throw new Error("NOT IMPLEMENTED");
  }

  async readMany() {
    const usuarios = []
    for (let index = 0; index < 10; index++) {
        usuarios.push(createUsuarioMock())
    }
    return usuarios;
  }
}

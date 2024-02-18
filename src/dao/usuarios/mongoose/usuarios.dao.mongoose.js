export class UsuariosDaoMongoose {
  constructor(usuariosModel) {
    this.usuariosModel = usuariosModel;
  }

  async find(query) {
    return await this.usuariosModel.find(query).lean();
  }

  async registrar(userData) {
    return await this.usuariosModel.registrar(userData);
  }

  async autenticar(email, password) {
    return await this.usuariosModel.autenticar(email, password);
  }
}

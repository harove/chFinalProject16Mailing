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

  async saveResetPassToken(email, token, expirationTime) {
    return await this.usuariosModel.saveResetPassToken(
      email,
      token,
      expirationTime
    );
  }

  async getOne(query) {
    const user = await this.usuariosModel.findOne(query).lean();
    return user;
  }

  async getOneAndUpdate(findBy, newParams) {
    const user = await this.usuariosModel.findOneAndUpdate(
      findBy,
      {
        $set: newParams,
      },
      { new: true }
    );
    return user;
  }
}

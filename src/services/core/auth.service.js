// const prisma = require('../../data/datasources/prisma');
const JWT = require('jsonwebtoken');
const jwtconfig = require('../../utils/jwtconfig');
const { CredentialService } = require('./credentials.service');
const { UserService } = require('./user.service');
// const uuid = require('uuid');
// const moment = require('moment');
const AuthService = {
  async register(user) {
    // create user
    const u = await UserService.create({
      full_name: user.full_name,
      phone: user.phone,
    });

    await CredentialService.createCredential(u, user.password);   
    const token = JWT.sign(await this.getUserIdentity(u), jwtconfig.key);
    return token;
  },
  async login(credentials) {
    const user = await CredentialService.checkCredential(
      credentials.username,
      credentials.password
    );
    const token = JWT.sign(await this.getUserIdentity(user), jwtconfig.key);
    return token;
  },
  async renewtoken(token) {
    console.log(token);
  },
  async getUserIdentity(user) {
    const identity = await UserService.findUser(user);
    return identity;
  },
};
module.exports = AuthService;

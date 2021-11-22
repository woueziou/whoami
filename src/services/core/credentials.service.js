const prisma = require('../../data/datasources/prisma');
const _ = require('lodash');
const moment = require('moment');
const PasswordUtils = require('../../utils/pwd-utils');
const { UserService } = require('./user.service');
const CredentialService = {
  async createCredential(user, password) {
    const splitted_name = _.split(user.full_name.toLowerCase(), ' ');
    const hashed = await PasswordUtils.hashPassword(password);
    const credential = {
      username: `${splitted_name[0][0]}${splitted_name[1]}`,
      password: hashed,
    };
    const result = await prisma.credentials.create({
      data: {
        username: credential.username,
        password: credential.password,
        user_id: user.id,
        created_at: moment().unix(),
        status: true,
      },
    });
    return result;
  },
  async findCredential(username) {
    const credential = await prisma.credentials.findFirst({
      where: { AND: { username: username, status: true } },
      // include: {

      // },
      rejectOnNotFound: true,
    });
    return credential;
  },

  async checkCredential(username, password) {
    // get credential from username
    const cred = await this.findCredential(username);
    // check if the password is correct
    const isPasswordRight = await PasswordUtils.checkPassword(
      password,
      cred.password
    );
    if (isPasswordRight === true) {
      const user = await UserService.findUser({ id: cred.user_id });
      return user;
    }
    throw 'Authentication error';
  },
};

module.exports = {
  CredentialService,
};

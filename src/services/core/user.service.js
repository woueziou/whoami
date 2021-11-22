const prisma = require('../../data/datasources/prisma');
const moment = require('moment');
const uuid = require('uuid');
const UserService = {
  /**
   *
   * @param {*} id
   * @returns {Prisma.Prisma__userClient<user>} user
   */
  async findUser(conditions) {
    const user = await prisma.user.findFirst({
      where: conditions,    
    });
    // const response = _.merge(
    //   _.omit(user, ['userjobposition']),
    //   _.pick(user.userjobposition[0], 'jobposition')
    // );

    return user;
    // return {
    //   user: _.omit(user, ["userjobposition"]),
    //   jobposition: _.pick(user.userjobposition[0], "jobposition"),
    // };
  },

  async listUSers(params) {
    const allUsers = await prisma.user.findMany({
      where: params,     
    });
    return allUsers;
  },
  /**
   *
   * @param {prisma.user} user
   *
   */
  async create(user) {
    const isUserExist = await prisma.user.findFirst({
      where: { full_name: user.full_name, tel: user.tel },
    });
    if (isUserExist !== null) {
      throw 'user exist already';
    }

    user.created_at = moment().unix();
    user.id = uuid.v4();
    const result = await prisma.user.create({
      data: user,
    });
    return result;
  },
  async update(user) {
    const result = await prisma.user.update({
      where: { id: user.id },
      data: user,
    });
    return result;
  },
};

module.exports = {
  UserService,
};

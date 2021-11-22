const key = '31d6cfe0d16ae931b73c59d7e0c089c0';
const JWT = require('jsonwebtoken');
const { UserService } = require('../services/core/user.service');

// eslint-disable-next-line no-unused-vars
const validate = async function (request, token, h) {
  try {
    const decoded = JWT.verify(token, key);
    const user = await UserService.findUser({ id: decoded.id, status: true });
    if (user) {
      return {
        isValid: true,
        credentials: user,
        artifacts: user,
      };
    }
    return {
      isValid: false,
      credentials: {},
      artifacts: {},
    };
  } catch (error) {
    return {
      isValid: false,
      credentials: {},
      artifacts: {},
    };
  }
};
const renew = async function (token) {
  // verify token

  // decode token

  //check the user exists
  try {
    const decoded = JWT.verify(token, key);
    const user = await UserService.findUser({
      id: decoded.id,
      status: true,
    });
    if (user) {
      const credentials = user;
      const newtoken = JWT.sign(credentials, key);
      // console.log('###new token###');
      // console.log(newtoken);
      return newtoken;
    }
    throw 'Erreur d\'authentification';
  } catch (error) {
    throw 'Erreur d\'authentification';
  }
};

module.exports = {
  validate,
  key,
  renew,
};

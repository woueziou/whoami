process.env.NODE_ENV === 'production' ? null : require('dotenv').config();
const HapiServer = require('./src/hapi/main');
const startServices = async () => {
    // start Hapi server
    HapiServer.start();
};
startServices();
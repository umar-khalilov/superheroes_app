'use strict';
const { configuration } = require('../../configs/configuration');

const basicInfo = {
    openapi: '3.0.3',
    info: {
        version: '1.0.0',
        title: 'Superheroes REST API',
        description: 'This documentation API about superheroes',
        termsOfService: '',
        contact: {
            name: 'Umar Khalilov',
            email: 'ERMASTER100@gmail.com',
            url: '',
        },
        basePath: '/',
        host:
            configuration.deployHost ||
            `http://localhost:${configuration.serverPort}/api`,
        schemes: ['http', 'https'],
    },
};

module.exports = { basicInfo };

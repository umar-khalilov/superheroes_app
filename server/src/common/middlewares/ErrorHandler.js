'use strict';
const { ApplicationException } = require('../exceptions');
const { Logger } = require('../utils/Logger');
const { HttpStatus } = require('../utils/httpStatus');

class ErrorHandler {
    static #logger = new Logger(ErrorHandler.name);

    static errorHandler = async (err, req, res, next) => {
        ErrorHandler.#logger.error(`CAUGHT:===> ${err}`);
        if (err instanceof ApplicationException) {
            return res.status(err.status).send({
                name: err.name,
                message: err.message,
                status: err.status,
            });
        } else {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
                name: err.name,
                message: err.message,
                status: err.status,
            });
        }
    };

    static initializeUnhandledException = () => {
        process.on('unhandledRejection', (reason, promise) => {
            ErrorHandler.#logger.error({
                name: reason.name,
                message: reason.message,
            });
            ErrorHandler.#logger.error(
                'UNHANDLED REJECTION! 💥 Shutting down...',
            );
            throw reason;
        });

        process.on('uncaughtException', err => {
            ErrorHandler.#logger.error({
                name: err.name,
                message: err.message,
            });
            ErrorHandler.#logger.error(
                'UNCAUGHT EXCEPTION! 💥 Shutting down...',
            );
            process.exit(1);
        });
    };
}

module.exports = { ErrorHandler };

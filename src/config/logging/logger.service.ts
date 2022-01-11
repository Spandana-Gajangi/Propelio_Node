import { createLogger, format, transports, Logger as WinstonLogger, } from 'winston'
import goodWinston from 'hapi-good-winston';

class LogService {
    logger: WinstonLogger

    init() {
        const { json, timestamp, prettyPrint, combine } = format;

        const ignorePrivate = format((info, opts) => {
            if (info.private) { return false; }
            return info;
        });
        this.logger = createLogger({
            format: combine(
                ignorePrivate(),
                json(),
                timestamp(),
                prettyPrint(),
            ),
            transports: [
                new transports.Console(),
                new transports.File({ filename: './error.log', level: 'error' }),
                new transports.File({ filename: './combined.log' })
            ]
        });
    }

    getLoggerOptions() {
        // Only the 'response' and 'error' event levels will be overwritten
        const goodWinstonOptions = {
            levels: {
                response: 'debug',
                error: 'info',
            },
        };
        const options = {
            ops: {
                interval: 1000,
            },
            reporters: {
                // This example simply illustrates auto loading and instantiation made by good
                winston2: [
                    {
                        module: 'hapi-good-winston',
                        name: 'goodWinston',
                        args: [this.logger, goodWinstonOptions],
                    },
                ],
            },
        };
        return options;
    }

    log(level: string, callerMethodName: string, callerType: string, message: string, data?) {
        this.logger.log(level, message, { data, callerMethodName, callerType });
    }

    info(message: string, callerMethodName: string, callerType: string, data?) {
        this.log('info', callerMethodName, callerType, message, data);
    }

    debug(message: string, callerMethodName: string, callerType: string, data?) {
        this.log('debug', callerMethodName, callerType, message, data);
    }

    error(message: string, callerMethodName: string, callerType: string, data?) {
        this.log('error', callerMethodName, callerType, message, data);
    }

    warn(message: string, callerMethodName: string, callerType: string, data?) {
        this.log('warn', callerMethodName, callerType, message, data);
    }

    verbose(message: string, callerMethodName: string, callerType: string, data?) {
        this.log('verbose', callerMethodName, callerType, message, data);
    }

    http(message: string, callerMethodName: string, callerType: string, data?) {
        this.log('http', callerMethodName, callerType, message, data);
    }
}

export const logService = new LogService();
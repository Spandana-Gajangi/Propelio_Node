import { Server, ServerOptions } from '@hapi/hapi'
import config from './config'
import routes from './routes'
import { proxy } from './config/db';
import { logService } from './config/logging/logger.service';
import { dataSetup } from './internals/dataSetup';


class App {
    server;
    constructor() {
        const options: ServerOptions = {
            port: config.port
        }

        this.server = new Server(options)
        this.bootstrap();
    }

    async initializeDependencies() {
        logService.init();
        await proxy.initDb();
        await dataSetup.insertData();
        await this.server.route(routes)
        await this.server.register([{
            plugin: require('good'),
            options: logService.getLoggerOptions()
        }])
        await this.server.initialize()

    }

    async bootstrap() {
        try {
            await this.initializeDependencies()
            await this.server.start()
            logService.info(`Server running at: ${this.server.info.uri}`, 'bootstrap', __filename, {});
        } catch (err) {
            logService.error('Could not start server', 'bootstrap', __filename, { err });
        }
    }
}

new App();
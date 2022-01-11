import 'reflect-metadata';
import { Connection, createConnection, QueryRunner } from 'typeorm';
import { CountySuggestion } from '../entities';
import { envVariables } from '../../vars';

class Proxy {
  queryRunner: QueryRunner;

  entitiesInstance = { CountySuggestion }
  entities = { CountySuggestion: 'CountySuggestion' }

  async initDb() {
    const entities = [CountySuggestion];
    const connection: Connection = await createConnection({
      type: 'postgres',
      logger: 'advanced-console',
      host: envVariables.dbHost,
      port: Number(envVariables.dbPort),
      username: envVariables.dbUserName,
      password: envVariables.dbPassword,
      database: envVariables.dbName,
      logging: 'all',
      entities
    });
    await connection.synchronize();
    this.queryRunner = connection.createQueryRunner()
  };

  _getEntityInstance(entityName: string) {
    return this.entitiesInstance[entityName]
  }

  find(entityName: string, condition?: object) {
    return this.queryRunner.manager.find(this._getEntityInstance(entityName), { where: condition });
  }

  bulkInsert(entityName: string, data: Array<object>) {
    const dataToBeInserted = data.map((e) => Object.assign(new this.entitiesInstance[entityName](), e));
    return this.queryRunner.manager.save(this._getEntityInstance(entityName), dataToBeInserted);
  }
}

export const proxy = new Proxy()
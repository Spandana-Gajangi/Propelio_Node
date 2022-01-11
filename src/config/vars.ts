const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

export const envVariables = {
    dbHost: process.env.DB_HOST,
    dbUserName: process.env.DB_USERNAME,
    dbPassword: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME,
    dbPort: Number(process.env.DB_PORT),
    env: process.env.NODE_ENV
}
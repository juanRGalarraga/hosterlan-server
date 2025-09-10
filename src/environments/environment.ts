import * as dotenv from 'dotenv';

import { IEnvironment } from './i.environment';

const ENV = dotenv.config().parsed as unknown as NodeJS.ProcessEnv;

export const environment: IEnvironment = {
    production: false,
    assetsPath: 'dist/assets',
    jwtSecret: ENV.JWT_SECRET ?? 'default_jwt_secret',
    jwtExpiresIn: ENV.JWT_EXPIRES_IN ?? '3600s',
    dbHost: ENV.DB_HOST ?? 'localhost',
    dbName: ENV.DB_NAME,
    dbPass: ENV.DB_PASSWORD,
    dbPort: ENV.DB_PORT,
    dbUser: ENV.DB_USER,
};
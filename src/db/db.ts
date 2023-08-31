import pg from 'pg';
const { Pool } = pg;

import { dataBaseProperties } from '../../configuration';

export const pool = new Pool({
    user: dataBaseProperties.USER,
    password: dataBaseProperties.PASSWORD,
    host: dataBaseProperties.HOST,
    port: dataBaseProperties.PORT,
    database: dataBaseProperties.DATABASE
});

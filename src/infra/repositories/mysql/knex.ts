import knex from 'knex';

const knexfile = require('../../../../knexfile.js');
export const dbConnection = knex(knexfile);

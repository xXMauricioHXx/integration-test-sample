/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex('users').del();
  await knex('users').insert([
    { id: 1, name: 'Mauricio Henrique' },
    { id: 2, name: 'Marcos Vinicius' },
    { id: 3, name: 'Adiana dos Santos' },
  ]);
};

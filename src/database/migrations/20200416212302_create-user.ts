import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
  return await knex.schema.createTable('users', (table) => {
    table.increments();
    table.string('nome', 60).notNullable();
    table.integer('idade').notNullable();
    table.string('email').unique().notNullable();
    table.string('cpf', 11).unique().notNullable();
  });
}

export async function down(knex: Knex): Promise<any> {
  return await knex.schema.dropTable('users');
}


import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('companys', (table) => {
    table.increments('id');
    table.string('nome').notNullable();
    table.string('cnpj').unique().notNullable();
    table.integer('user_id').unsigned().references('id').inTable('users');
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('companys');
}


import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('categorias', (table) => {
    table.increments('id').primary();
    table.string('nombre').notNullable();
    table.integer('torneoId').unsigned().references('id').inTable('torneos').onDelete('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('categorias');
}

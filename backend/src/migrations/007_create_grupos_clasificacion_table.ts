import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('grupos_clasificacion', (table) => {
    table.increments('id').primary();
    table.string('nombre').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('grupos_clasificacion') ;
}

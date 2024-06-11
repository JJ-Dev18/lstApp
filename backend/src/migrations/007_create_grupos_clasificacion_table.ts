import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('grupos_clasificacion', (table) => {
    table.increments('id').primary();
    table.string('nombre').notNullable();
    table.integer('categoriaId').references('id').inTable('categorias').notNullable().onDelete('CASCADE');

  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('grupos_clasificacion');
}

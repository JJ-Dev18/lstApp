import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('likes', (table) => {
    table.increments('id').primary();
    table.datetime('createdAt')
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('likes') ;
}

import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('usuarios', (table) => {
    table.increments('id').primary();
    table.string('nombre').notNullable();
    table.string('email').notNullable().unique();
    table.string('password').notNullable();
    table.string('rol').notNullable();
    table.string('googleId').nullable().unique();
    table.timestamps(true, true);  // created_at and updated_at timestamps
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('usuarios');
}

import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('torneos', function(table) {
        table.increments('id').primary();
        table.string('nombre').notNullable();
        table.integer('usuarioId').unsigned().references('id').inTable('usuarios').onDelete('CASCADE');
        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.timestamp('updatedAt').defaultTo(knex.fn.now());
      });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('torneos');
}


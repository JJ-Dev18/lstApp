import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('equipos_grupos', (table) => {
    table.integer('equipoId').references('id').inTable('equipos').notNullable().onDelete('CASCADE');
    table.integer('grupoId').references('id').inTable('grupos_clasificacion').notNullable().onDelete('CASCADE');
    table.primary(['equipoId', 'grupoId']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('equipos_grupos');
}

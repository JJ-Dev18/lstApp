import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('partidos', (table) => {
    table.increments('id').primary();
    table.integer('equipo1Id').references('id').inTable('equipos').notNullable().onDelete('CASCADE');
    table.integer('equipo2Id').references('id').inTable('equipos').notNullable().onDelete('CASCADE');
    table.integer('categoriaId').references('id').inTable('categorias').notNullable().onDelete('CASCADE'); 
    table.timestamp('fecha').notNullable();
    table.integer('marcadorEquipo1').notNullable().defaultTo(0);
    table.integer('marcadorEquipo2').notNullable().defaultTo(0);
    table.integer('duracion').notNullable();
    table.string('estado').notNullable()
     table.integer('planilleroId').unsigned();
     table.foreign('planilleroId').references('id').inTable('planilleros');
    table.integer('torneoId').unsigned().references('id').inTable('torneos').onDelete('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('partidos') ;
}

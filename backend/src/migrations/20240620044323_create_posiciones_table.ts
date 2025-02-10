import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {

    return knex.schema.createTable('posiciones', function(table) {
        table.increments('id').primary();
        table.integer('equipoId').unsigned().notNullable().references('id').inTable('equipos').onDelete('CASCADE');
        table.integer('torneoId').unsigned().notNullable().references('id').inTable('torneos').onDelete('CASCADE');
        table.integer('categoriaId').unsigned().notNullable().references('id').inTable('categorias').onDelete('CASCADE'); 
        table.integer('grupoId').unsigned().nullable()
        table.integer('partidosJugados').defaultTo(0);
        table.integer('partidosGanados').defaultTo(0);
        table.integer('partidosEmpatados').defaultTo(0);
        table.integer('partidosPerdidos').defaultTo(0);
        table.integer('golesAFavor').defaultTo(0);
        table.integer('golesEnContra').defaultTo(0);
        table.integer('puntos').defaultTo(0);
        table.timestamps(true, true); // Esto agrega created_at y updated_at
        table.unique(['equipoId', 'torneoId', 'categoriaId','grupoId']);
      });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('posiciones');
}


'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MemberSchema extends Schema {
  up () {
    this.create('members', (table) => {
      table.increments()
      table.integer('proyecto_id').unsigned().references('id').inTable('proyectos')
      table.string('nombre', 255).notNullable()
      table.string('puesto', 255).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('members')
  }
}

module.exports = MemberSchema

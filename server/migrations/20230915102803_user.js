export async function up(knex) {
  await knex.schema.createTable('users', (table) => {
    table.increments('id')
    table.string('email').unique()
    table.string('password')
    table.string('googleId')
  })

  await knex.schema.createTable('job', (table) => {
    table.increments('id')
    table.string('description')
    table.boolean('done')
    table.string('date')
    table.string('time')
  })
}

export async function down(knex) {
  await knex.schema.dropTable('users')
  await knex.schema.dropTable('job')
}

const Sequelize = require('sequelize')
const villainsModel = require('./villains')

//                               dbName     username     password
const connection = new Sequelize('villains', 'villains_users', 'supervillain', {
  host: 'localhost',
  dialect: 'mysql'
})

const villains = villainsModel(connection, Sequelize)

module.exports = { villains }
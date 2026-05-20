const { Sequelize } = require('sequelize');

const sequelize = new Sequelize("expense", "root", "", { dialect:"mysql" })

module.exports = {sequelize};
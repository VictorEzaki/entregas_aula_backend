const { DataTypes, where } = require('sequelize'); 
const sequelize = require('./../database.js');

const db = sequelize.define('expenses', {
    id: {
        type: DataTypes.INTEGER, 
        primaryKey: true,
        autoIncrement: true 
    },
    title: {
        type: DataTypes.STRING, 
        allowNull: false
    },
    amount: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: true
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
}, {
    updatedAt: false
});

class Expense {
    constructor() {}

    async getAll() {
        return db.findAll();
    }

    async getById(id) {
        return db.findOne({ where: id });
    }

    async create(title, amount, category, date, description) {
        return db.create({title, amount, category, date, description})
    }

    async update(title, amount, category, date, description, id) {
        return db.update({title, amount, category, date, description}, { where: id })
    }
}

module.exports = new Expense();

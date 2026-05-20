const { sequelize } = require('./../database.js');
const { DataTypes } = require('sequelize'); 
const categoryModel = require('./category.js');

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
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'categories',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
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

class ExpenseModel {
    constructor() {}
    
    async getAll() {
        return db.findAll();
    }
    
    async getById(id) {
        return db.findOne({
            where: { id }
        });
    }
    
    async create(title, amount, category, date, description) {
        return db.create({title, amount, category, date, description})
    }
    
    async update(title, amount, category, date, description, id) {
        return db.update(
            { title, amount, category, date, description },
            { where: { id } }
        );
    }
    
    async delete(id) {
        return db.destroy({
            where: { id }
        });
    }
}

const expenseModel = new ExpenseModel();
expenseModel.Expense = Expense;

module.exports = expenseModel;
